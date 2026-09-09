# DESDE ARRIBA — Guía rápida

## Cambiar el video de portada

Es el video de fondo del hero, arriba de todo. Se cambia desde `/admin`:
**SUBIR VIDEO** → **PUBLICAR EN EL SITIO**. Sin video queda un degradado negro.

No lo subas al repositorio: GitHub rechaza archivos de más de 25 MB desde la web,
el repo queda pesado para siempre y cada cambio te obliga a un commit.

Que sea **corto y liviano**: 10-15 segundos en loop, por debajo de 10 MB. Es lo
primero que carga el sitio, así que acá el peso se nota más que en ningún lado.

En celular un video vertical entra perfecto; en desktop se recorta al centro,
así que si tenés uno horizontal, mejor usá ese acá.

---

## Cómo exportar el video

El archivo que sale del drone (200-700 MB) es el material **crudo**: no sirve
para publicar. Cada visita se lo descarga entero, y desde el celular tarda
minutos en arrancar. El mismo clip exportado para web pesa 30-40 MB y **se ve
igual en un teléfono**. Por eso el panel no acepta más de 100 MB.

Safari no comprime video: es un navegador. Y los conversores online tampoco
sirven, porque tendrías que subir 700 MB a otra web antes de empezar.

### Con Final Cut Pro

**1. Que el proyecto sea vertical.** Al arrastrar el primer clip a una línea de
tiempo vacía, Final Cut adopta su formato. Si quedó horizontal: seleccionás el
proyecto → `Cmd+J` → Formato de vídeo **Personalizado** → **1080 x 1920**.

**2. Exportar.** `Archivo → Compartir → Exportar archivo` (`Cmd+E`), pestaña
**Ajustes**:

| Campo | Valor |
|---|---|
| Formato | Vídeo y audio |
| Códec de vídeo | **H.264 Better Quality** |
| Resolución | 1080 x 1920 |

**3. Pasarlo a `.mp4`.** Final Cut exporta en `.mov`, que el panel no acepta.
Como adentro ya está en H.264, esto solo cambia el envase: tarda segundos y no
recomprime nada.

```bash
ffmpeg -i export.mov -c copy -movflags +faststart salida.mp4
```

### Sin Final Cut

**CapCut** (gratis, capcut.com): importás el video → **Exportar** → 1080p, 30 fps
→ sale `.mp4` vertical directo.

**HandBrake** (gratis, handbrake.fr): arrastrás el archivo, Format **MP4**,
preset `Fast 1080p30`, Start.

> **En HandBrake, con material vertical, revisá la pestaña Dimensions:**
> `Anamorphic` tiene que estar en **None** y la resolución escrita a mano
> (1080 x 1920). Si lo dejás en Automatic con un preset horizontal, te devuelve
> un archivo de 1920x1080 con los píxeles deformados para simular el vertical:
> se ve borroso y pesa el triple de lo que debería.

> **No uses iMovie para los verticales.** iMovie trabaja en 16:9 y te mete el
> video parado dentro de un marco horizontal, con dos barras negras a los
> costados. Para material 9:16 arruina la toma.

### Dos detalles que importan

**Tiene que ser `.mp4`, no `.mov`.** Un `.mov` se ve bien en Safari pero Chrome
y Android no lo reproducen. Como desde tu Mac se ve perfecto, no te darías
cuenta de que buena parte de la gente ve una pantalla en blanco.

**El índice tiene que ir adelante.** Es lo que hace `-movflags +faststart`: sin
eso el navegador descarga el archivo entero antes de mostrar el primer cuadro.
Si ya tenés un mp4 sin eso, `scripts/faststart.py` lo corrige sin recomprimir:

```bash
python3 scripts/faststart.py entrada.mp4 salida.mp4
```

---

## Activar el panel (una sola vez)

Sin estos pasos el panel te avisa qué falta, pero el sitio funciona igual.

**1. Contraseña.** Vercel → Settings → Environment Variables → New:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | la contraseña que quieras |

**2. Almacenamiento.** Vercel → Storage → Create Database → **Blob** →
conectar al proyecto. El token se agrega solo.

**3. Redeploy.** Deployments → el primero → `···` → **Redeploy**.

Las variables solo se aplican a los deploys nuevos: sin este paso el panel
sigue diciendo que falta configurarlo.

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
├── lib/            contact.ts (WhatsApp/IG) · site.ts · auth.ts · blob.ts
├── admin/          Panel del video de portada
├── api/admin/      Login, subida y guardado
└── page.tsx        El orden de las secciones
```

Secciones, en orden: Hero · Servicios · Equipo · Proceso · Contacto.

---

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificar antes de subir
```
