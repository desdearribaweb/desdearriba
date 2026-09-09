"""Prepara un video para usarlo de fondo del hero.

No cambia la geometria si ya viene con pixeles cuadrados: solo recomprime para
la web, descarta el audio (el hero va en silencio) y conserva el timing.
"""
import av, sys
from fractions import Fraction

SRC, DST, CRF = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else '28'

src = av.open(SRC)
vs = src.streams.video[0]
vs.thread_type = 'AUTO'

out = av.open(DST, 'w')
st = out.add_stream('libx264', rate=Fraction(vs.average_rate))
st.width, st.height = vs.codec_context.width, vs.codec_context.height
st.pix_fmt = 'yuv420p'
st.options = {'crf': CRF, 'preset': 'faster', 'profile': 'high'}

n = 0
for frame in src.decode(video=0):
    f = frame.reformat(width=st.width, height=st.height, format='yuv420p')
    f.pts, f.time_base = frame.pts, frame.time_base  # sin esto la duracion sale en cero
    for pkt in st.encode(f):
        out.mux(pkt)
    n += 1

for pkt in st.encode():
    out.mux(pkt)
out.close(); src.close()
print(f"{n} frames -> {st.width}x{st.height} crf {CRF}")
