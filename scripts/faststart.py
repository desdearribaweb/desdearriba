"""Mueve el atomo moov al principio (equivalente a ffmpeg -movflags +faststart).

No recomprime nada: solo reordena el contenedor y corrige los offsets de chunk,
que son absolutos dentro del archivo.
"""
import struct
import sys


def top_level_atoms(buf):
    out, i = [], 0
    while i + 8 <= len(buf):
        size = struct.unpack('>I', buf[i:i + 8][:4])[0]
        typ = buf[i + 4:i + 8]
        header = 8
        if size == 1:
            size = struct.unpack('>Q', buf[i + 8:i + 16])[0]
            header = 16
        elif size == 0:
            size = len(buf) - i
        if size < header:
            raise ValueError(f'atomo invalido en {i}')
        out.append((typ, i, size))
        i += size
    return out


def patch_chunk_offsets(moov: bytearray, delta: int) -> int:
    """Suma delta a cada entrada de stco/co64 dentro del moov."""
    patched = 0
    i = 0
    while i + 8 <= len(moov):
        typ = bytes(moov[i + 4:i + 8])

        if typ == b'stco':
            size = struct.unpack('>I', bytes(moov[i:i + 4]))[0]
            count = struct.unpack('>I', bytes(moov[i + 12:i + 16]))[0]
            for n in range(count):
                p = i + 16 + n * 4
                val = struct.unpack('>I', bytes(moov[p:p + 4]))[0]
                moov[p:p + 4] = struct.pack('>I', val + delta)
            patched += count
            i += size
            continue

        if typ == b'co64':
            size = struct.unpack('>I', bytes(moov[i:i + 4]))[0]
            count = struct.unpack('>I', bytes(moov[i + 12:i + 16]))[0]
            for n in range(count):
                p = i + 16 + n * 8
                val = struct.unpack('>Q', bytes(moov[p:p + 8]))[0]
                moov[p:p + 8] = struct.pack('>Q', val + delta)
            patched += count
            i += size
            continue

        i += 1  # recorrido byte a byte: los stbl estan anidados

    return patched


def faststart(src: str, dst: str) -> bool:
    data = open(src, 'rb').read()
    atoms = top_level_atoms(data)
    order = [t.decode('latin1') for t, _, _ in atoms]

    types = {t: (o, s) for t, o, s in atoms}
    if b'moov' not in types or b'mdat' not in types:
        raise ValueError('faltan moov o mdat')

    moov_off, moov_size = types[b'moov']
    mdat_off, _ = types[b'mdat']

    if moov_off < mdat_off:
        print(f'ya esta al principio ({" -> ".join(order)}), no hay nada que hacer')
        return False

    moov = bytearray(data[moov_off:moov_off + moov_size])
    patched = patch_chunk_offsets(moov, moov_size)

    out = bytearray()
    for typ, off, size in atoms:
        if typ == b'ftyp':
            out += data[off:off + size]
    out += moov
    for typ, off, size in atoms:
        if typ not in (b'ftyp', b'moov'):
            out += data[off:off + size]

    open(dst, 'wb').write(out)
    print(f'orden previo:  {" -> ".join(order)}')
    print(f'offsets corregidos: {patched}')
    print(f'orden nuevo:   {" -> ".join(t.decode("latin1") for t, _, _ in top_level_atoms(open(dst,"rb").read()))}')
    print(f'tamaño: {len(data)} -> {len(out)} bytes')
    return True


if __name__ == '__main__':
    faststart(sys.argv[1], sys.argv[2])
