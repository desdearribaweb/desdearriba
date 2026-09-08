# DESDE ARRIBA — Guía rápida

## Activar el panel /admin (una sola vez)

Sin estos dos pasos el panel te avisa qué falta, pero el sitio funciona igual.

**1. Contraseña**

Vercel → tu proyecto → Settings → Environment Variables → New:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | la contraseña que quieras |

**2. Almacenamiento de fotos y videos**

Vercel → tu proyecto → Storage → Create Database → **Blob** → conectar al proyecto.
La variable `BLOB_READ_WRITE_TOKEN` se agrega sola.

**3. Redeploy**

Vercel → Deployments → el último → `···` → Redeploy.

Listo: entrás a `tudominio.com/admin`.

---

## Cargar trabajos

1. Entrá a `/admin` y poné la contraseña.
2. En cada uno de los 3 casilleros tocá **Subir video o foto**.
3. Escribí el título y elegí la categoría.
4. **PUBLICAR EN EL SITIO**.

La portada se genera sola del primer frame del video: no hace falta subir una foto aparte.

**Sobre los videos:** el sitio los muestra en vertical (9:16), tal cual los grabás.
Subí el archivo ya comprimido (H.264, ~10-15 Mbps) en vez del crudo de la cámara:
un 4K vertical de 20s queda en ~30 MB y carga rápido. El límite por archivo es 200 MB.

### Tiene que ser .mp4, no .mov

Un `.mov` se ve bien en Safari pero **Chrome y Android no lo reproducen**.
Como no lo vas a notar desde tu Mac, el panel directamente no te deja subirlo.

Para convertirlo, cualquiera de estas:

**Si lo exportaste de un editor** (Final Cut, iMovie, Premiere, CapCut):
volvé a exportar eligiendo **MP4 / H.264**. Es lo más rápido y sin pérdida extra.

**Con iMovie** (ya viene en tu Mac): arrastrás el video → Compartir → Archivo → se
guarda como `.mp4`.

**Con Handbrake** (gratis, handbrake.fr): arrastrás el archivo, preset
`Fast 1080p30` (o `Fast 2160p60 4K`), Start.

**Por terminal**, si el `.mov` ya está en H.264 esto lo convierte en segundos
sin recomprimir ni perder calidad:

```bash
ffmpeg -i entrada.mov -c copy salida.mp4
```

Si eso falla o el video queda sin verse, está en H.265 y hay que recomprimir:

```bash
ffmpeg -i entrada.mov -c:v libx264 -crf 23 -preset medium -c:a aac salida.mp4
```

---

## Video del hero (el de fondo, arriba de todo)

Subí tu archivo como `public/videos/hero.mp4` y hacé commit.
Mientras no exista, el hero muestra un fondo negro degradado (no da error).

Tiene que ser `.mp4` (mirá arriba cómo convertir un `.mov`), y conviene que sea
corto y liviano: 10-15 segundos en loop, bajo 8 MB. Es lo primero que carga el
sitio, así que un archivo pesado acá se nota más que en cualquier otro lado.

En celular un video vertical entra perfecto; en desktop se recorta al centro,
así que si tenés uno horizontal, mejor usá ese acá.

---

## Cambiar textos

| Qué | Dónde |
|---|---|
| Título y bajada del hero | `app/components/Hero.tsx` |
| Lista de servicios | `app/data/services.ts` |
| Equipo, 4K y formatos | `app/components/Equipment.tsx` |
| Los 4 pasos | `app/components/Process.tsx` |
| Sección de contacto | `app/components/Contact.tsx` |
| **WhatsApp e Instagram** | `app/lib/contact.ts` ← un solo lugar |
| Título y descripción de Google | `app/layout.tsx` |

---

## Estructura

```
app/
├── components/     Cada sección del sitio
├── data/           services.ts
├── lib/            contact.ts (WhatsApp/IG) · projects.ts · auth.ts
├── admin/          Panel de carga
├── api/admin/      Login, subida de archivos y guardado
└── page.tsx        El orden de las secciones
```

Secciones, en orden: Hero · Servicios · Portfolio · Equipo · Proceso · Contacto.

---

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificar antes de subir
```
