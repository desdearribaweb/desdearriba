# DESDE ARRIBA - Estructura y Guía de Implementación

## Resumen de la Estructura Creada

La página web ha sido desarrollada con **Next.js 15** + **TypeScript** + **Tailwind CSS** siguiendo las mejores prácticas de desarrollo profesional.

---

## 📁 Estructura de Carpetas

```
desdearriba/
├── app/
│   ├── components/              # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Introduction.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Formats.tsx
│   │   ├── Equipment.tsx
│   │   ├── Editing.tsx
│   │   ├── Process.tsx
│   │   ├── CTASection.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   ├── data/                    # Datos centralizados
│   │   ├── services.ts          # Lista de servicios
│   │   └── projects.ts          # Proyectos del portfolio
│   ├── layout.tsx               # Layout principal (SEO, metadatos)
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales
├── public/
│   ├── images/
│   │   ├── services/            # Imágenes de servicios
│   │   ├── projects/            # Imágenes del portfolio
│   │   ├── hero-poster.jpg      # Poster del video hero
│   │   ├── cta-poster.jpg       # Poster del video CTA
│   │   └── drone-placeholder.jpg
│   ├── videos/                  # Videos (hero, CTA, etc.)
│   └── favicon.ico              # Icono de la página
├── package.json
├── tsconfig.json
├── tailwind.config.ts           # Configuración de Tailwind
└── next.config.ts               # Configuración de Next.js
```

---

## 🎨 Cambiar Textos y Contenido

### 1. **Textos principales de cada sección**

Todos los textos están hardcodeados en los componentes. Para cambiarlos:

#### Header y Navigation
- **Archivo:** `app/components/Header.tsx`
- **Cambiar:** Los labels del menú y el botón CTA

#### Hero Section
- **Archivo:** `app/components/Hero.tsx`
- **Cambiar:** Títulos, subtítulos, descripción y textos de botones

#### Introduction
- **Archivo:** `app/components/Introduction.tsx`
- **Cambiar:** Título "UNA NUEVA PERSPECTIVA" y párrafos descriptivos

#### Services
- **Archivo:** `app/data/services.ts`
- **Cambiar:** Descripción de cada servicio (archivo de datos centralizado)

#### Portfolio
- **Archivo:** `app/data/projects.ts`
- **Cambiar:** Títulos y descripciones de proyectos

#### Equipment
- **Archivo:** `app/components/Equipment.tsx`
- **Cambiar:** Especificaciones del drone y textos técnicos

#### Contact
- **Archivo:** `app/components/Contact.tsx`
- **Cambiar:** Teléfono, Instagram, textos de formulario

#### Footer
- **Archivo:** `app/components/Footer.tsx`
- **Cambiar:** Links sociales y copyright

---

## 📸 Agregar Imágenes

### Estructura de carpetas de imágenes:

```
public/images/
├── services/
│   ├── events-placeholder.jpg         → Reemplazar con tu imagen de eventos
│   ├── architecture-placeholder.jpg   → Reemplazar con tu imagen de arquitectura
│   ├── realestate-placeholder.jpg     → Reemplazar con tu imagen inmobiliaria
│   ├── fields-placeholder.jpg         → Reemplazar con tu imagen de campos
│   ├── corporate-placeholder.jpg      → Reemplazar con tu imagen corporativa
│   ├── social-placeholder.jpg         → Reemplazar con tu imagen redes sociales
│   └── editing-placeholder.jpg        → Reemplazar con tu imagen edición
├── projects/
│   ├── project-1-placeholder.jpg      → Proyecto 1
│   ├── project-2-placeholder.jpg      → Proyecto 2
│   ├── project-3-placeholder.jpg      → Proyecto 3
│   ├── project-4-placeholder.jpg      → Proyecto 4
│   ├── project-5-placeholder.jpg      → Proyecto 5
│   └── project-6-placeholder.jpg      → Proyecto 6
├── drone-placeholder.jpg              → Imagen del drone
├── hero-poster.jpg                    → Poster para video del hero
└── cta-poster.jpg                     → Poster para video CTA
```

### Pasos para agregar imágenes:

1. **Coloca tus imágenes** en las carpetas correspondientes
2. **Reemplaza el nombre del archivo** (los nombres actuales terminan en `-placeholder.jpg`)
3. **Actualiza la referencia en el código:**
   - Para servicios: edita `app/data/services.ts` (propiedad `image`)
   - Para proyectos: edita `app/data/projects.ts` (propiedad `thumbnail`)
   - Para componentes: edita el path en la propiedad `src` de cada `<Image>`

### Ejemplo:
```typescript
// app/data/services.ts
{
  id: 'events',
  title: 'EVENTOS',
  description: 'Tu descripción aquí',
  image: '/images/services/tu-imagen.jpg', // ← Cambiar aquí
}
```

---

## 🎥 Agregar Videos

### Ubicación de videos:

```
public/videos/
├── hero.mp4          # Video principal del hero (fullscreen)
└── cta.mp4           # Video de la sección CTA
```

### Pasos para agregar videos:

1. **Convierte tu video** a MP4 (recomendado: 1920x1080 o superior)
2. **Optimiza el tamaño** (comprime sin perder calidad - máximo 50MB)
3. **Coloca el archivo** en `public/videos/`
4. **Actualiza los paths** en los componentes:
   - Hero: `app/components/Hero.tsx` → `<source src="/videos/hero.mp4"`
   - CTA: `app/components/CTASection.tsx` → `<source src="/videos/cta.mp4"`

### Atributos de video recomendados:
```html
<video
  autoPlay          <!-- Autoplay (muted es requerido en navegadores)
  muted             <!-- Muted (necesario para autoplay)
  loop              <!-- Loop infinito
  playsInline       <!-- Reproducción inline en mobile
  poster="/images/poster.jpg"  <!-- Imagen mientras carga
>
```

---

## 🛍️ Agregar Nuevos Proyectos al Portfolio

### En `app/data/projects.ts`:

```typescript
{
  id: 'project-7',                    // ID único
  title: 'Nombre del proyecto',
  category: 'events',                 // eventos | architecture | realestate | fields | social
  thumbnail: '/images/projects/proyecto-7.jpg',
  video: '/images/projects/video-7.mp4',  // Opcional
  description: 'Descripción del proyecto',
}
```

### Categorías disponibles:
- `events` → Eventos
- `architecture` → Arquitectura
- `realestate` → Inmobiliario
- `fields` → Campos
- `social` → Redes Sociales

---

## 🔧 Cambiar Video del Hero

### Opción 1: Usar tu propio video

1. **Prepara el video:**
   - Formato: MP4
   - Resolución: 1920x1080 o mayor
   - Duración: 10-30 segundos
   - Tamaño: < 50MB (comprimido)

2. **Coloca en:** `public/videos/hero.mp4`

3. **Agregar poster (imagen de carga):**
   - Guarda una captura del video
   - Nombre: `hero-poster.jpg`
   - Ubicación: `public/images/`

### Opción 2: Si el video no se reproduce

Edita `app/components/Hero.tsx`:
```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className='w-full h-full object-cover'
  poster='/images/hero-poster.jpg'
>
  <source src='/videos/hero.mp4' type='video/mp4' />
  Your browser does not support the video tag.
</video>
```

---

## 🚀 Publicar en Vercel

### Método 1: Usando Vercel CLI (Recomendado)

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones en la terminal. Vercel detectará automáticamente que es un proyecto Next.js.

### Método 2: Conectar desde GitHub

1. Accede a [vercel.com](https://vercel.com)
2. Haz login con tu cuenta GitHub
3. Selecciona "Import Git Repository"
4. Busca y selecciona `desdearribaweb/desdearriba`
5. Vercel importará automáticamente la rama
6. Haz clic en "Deploy"

### Método 3: Deployar desde la rama actual

```bash
# Asegúrate de estar en la rama correcta
git status

# Vercel deployará automáticamente en cada push
git push origin claude/desde-arriba-website-42r90b
```

---

## 🔗 Links Importantes

### WhatsApp
```
https://wa.me/5493492680779
# Con mensaje prearmado:
https://wa.me/5493492680779?text=Hola%20Desde%20Arriba,%20quisiera%20consultar%20por%20una%20filmaci%C3%B3n%20con%20drone
```

### Instagram
```
https://instagram.com/_desdearriba_
```

---

## ✨ Características Implementadas

✅ **Header responsive** con navegación sticky
✅ **Hero fullscreen** cinematográfico con soporte video
✅ **Navigation mobile** con menú hamburguesa
✅ **13 componentes** reutilizables y organizados
✅ **Portfolio interactivo** con filtros y modal lightbox
✅ **Formulario de contacto** integrado con WhatsApp
✅ **Botón flotante WhatsApp** que aparece en scroll
✅ **Animaciones sofisticadas** pero performantes
✅ **Mobile-first responsive** en todos los breakpoints
✅ **SEO completo** (metadatos, OpenGraph, Twitter cards)
✅ **Accesibilidad WCAG** (HTML semántico, ARIA labels)
✅ **Tipografía profesional** (Manrope)
✅ **Identidad visual** monocromática (Negro/Blanco)
✅ **Datos centralizados** (fácil de actualizar)
✅ **Lazy loading** optimizado
✅ **Build process** sin errores

---

## 🐛 Troubleshooting

### "El video no se reproduce"
- Verifica que el archivo exista en `public/videos/`
- Comprueba que es un MP4 válido
- Intenta reducir el tamaño del archivo
- Usa FFmpeg: `ffmpeg -i input.mp4 -vcodec libx264 -crf 23 output.mp4`

### "Las imágenes se ven pixeladas"
- Usa imágenes de al menos 1920x1080px
- Comprime sin perder calidad (máximo 500KB por imagen)
- Vercel y Next.js optimizan automáticamente

### "El formulario no funciona"
- Es un formulario visual conectado a WhatsApp
- Verifica que el link de WhatsApp sea correcto
- Los datos se envían a través de WhatsApp URL

### "Mobile se ve roto"
- Verifica viewport en `app/layout.tsx`
- Prueba en Chrome DevTools (F12) con diferentes dispositivos
- Tailwind CSS es responsive by default

---

## 📱 Breakpoints Responsive

```
Mobile:   375px - 430px  ✓ Optimizado
Tablet:   768px - 1024px ✓ Optimizado
Desktop:  1440px+        ✓ Optimizado
```

---

## 🎯 Próximos Pasos Recomendados

1. **Agregar imágenes** reales de tus trabajos
2. **Cargar videos** de tus producciones
3. **Actualizar textos** con tu información específica
4. **Configurar dominio** personalizado en Vercel
5. **Agregar Google Analytics** (opcional)
6. **Crear sitemap.xml** (opcional)
7. **Configurar SSL/HTTPS** (automático en Vercel)

---

## 📞 Contacto y Soporte

Para cambios futuros o actualizaciones, mantén esta estructura clara y bien organizada. Todos los componentes están nombrados intuitivamente y el código está bien documentado.

¡Tu página está lista para publicar! 🚀
