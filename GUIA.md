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

### Los videos hay que exportarlos para web

El sitio los muestra en vertical (9:16), tal cual los grabás. Pero el archivo que
sale del drone (200-700 MB) es el material **crudo**: no sirve para publicar.

- No entra en el almacenamiento del plan gratis (3 videos de 700 MB son 2,1 GB).
- Cada persona que lo mire se descarga esos MB. Con unas pocas visitas se agota
  el tráfico incluido y empieza a costar plata.
- Desde el celular, con datos, tarda minutos en arrancar. La mayoría se va antes.

El mismo clip exportado para web pesa **30-40 MB y se ve igual en un teléfono**.
Por eso el panel no acepta archivos de más de 100 MB.

**Con HandBrake** (gratis, handbrake.fr — lo más simple):
arrastrás el archivo, preset `Fast 1080p30`, Start. Listo.

**Por terminal**, para un vertical:

```bash
ffmpeg -i entrada.mp4 -vf "scale=1080:-2" -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k -movflags +faststart salida.mp4
```

`-movflags +faststart` hace que el video empiece a reproducirse sin descargarse
entero: sin eso el visitante mira una pantalla negra hasta que baja todo.

¿Querés conservar el 4K? Cambiá `scale=1080:-2` por `scale=2160:-2` y subí el
`-crf` a `28`. Igual, en un celular no se nota la diferencia y pesa el triple.

Guardá siempre el crudo aparte: lo que subís al sitio es una copia para web.

### Cómo exportar, paso a paso

Safari no comprime video: es un navegador. Y los conversores online no sirven
acá, porque tendrías que subir 700 MB a otra web antes de empezar.

#### Con Final Cut Pro

**1. Que el proyecto sea vertical.** Al arrastrar el primer clip a una línea de
tiempo vacía, Final Cut adopta su formato. Si quedó horizontal: seleccionás el
proyecto → tecla `Cmd+J` → Formato de vídeo **Personalizado** → Resolución
**1080 x 1920**.

**2. Exportar.** `Archivo → Compartir → Exportar archivo` (o `Cmd+E`), pestaña
**Ajustes**:

| Campo | Valor |
|---|---|
| Formato | Vídeo y audio |
| Códec de vídeo | **H.264 Better Quality** |
| Resolución | 1080 x 1920 |

Siguiente → Guardar. Un clip de 20-30 s queda en 30-50 MB.

**3. Pasarlo a `.mp4`.** Final Cut exporta en `.mov`, que el panel no acepta
(Chrome y Android no lo reproducen). Como adentro ya está en H.264, esto solo
cambia el envase: tarda segundos y no recomprime nada.

```bash
ffmpeg -i export.mov -c copy -movflags +faststart final.mp4
```

Si no querés usar la terminal, arrastrá el `.mov` a **HandBrake**
(gratis, handbrake.fr), Format **MP4**, preset `Fast 1080p30`, Start.

#### Sin Final Cut

**CapCut** (gratis, capcut.com): importás el video → **Exportar** → 1080p, 30 fps
→ sale `.mp4` vertical directo, sin el paso 3.

> **No uses iMovie para los verticales.** iMovie trabaja en 16:9 y te mete el
> video parado dentro de un marco horizontal, con dos barras negras a los
> costados. Para material 9:16 arruina la toma.

### Por qué .mp4 y no .mov

Un `.mov` se ve bien en Safari pero **Chrome y Android no lo reproducen**.
Como desde tu Mac se ve perfecto, no te darías cuenta de que buena parte de la
gente ve una pantalla en blanco. Por eso el panel no lo acepta.

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
