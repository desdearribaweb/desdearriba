# 🚁 DESDE ARRIBA - One Page Profesional

**Fotografía y Filmación Aérea con Drones**

ONE PAGE responsivo, moderno y profesional para un emprendimiento de producción audiovisual aérea.

---

## ⚡ Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Componentes:** React 19
- **Iconografía:** Lucide React
- **Deploy:** Vercel (recomendado)
- **Tipografía:** Manrope (Google Fonts)

---

## 🎨 Características

✨ **Design Premium**
- Estética minimalista y cinematográfica
- Paleta monocromática (Negro & Blanco)
- Tipografía profesional (Manrope)
- Alto contraste y legibilidad

📱 **Totalmente Responsive**
- Mobile-first design
- Optimizado para 375px a 1920px+
- Menú hamburguesa en mobile
- Experiencia visual premium en todos los dispositivos

🎬 **Optimizado para Multimedia**
- Soporte para videos fullscreen
- Galería de proyectos interactiva
- Modal/Lightbox para proyectos
- Lazy loading de imágenes

🔗 **Integración de Contacto**
- Botón flotante de WhatsApp
- Links directos prearmados
- Formulario visual
- Instagram integrado

🚀 **Performance**
- Build optimizado (Next.js)
- Imágenes comprimidas
- Code splitting automático
- Sitemap y robots.txt configurados

♿ **Accesibilidad**
- HTML semántico
- ARIA labels
- Contraste WCAG AA
- Navegación por teclado

📊 **SEO Completo**
- Metadatos estructurados
- OpenGraph y Twitter Cards
- Datos estructurados (JSON-LD)
- Sitemap XML y robots.txt

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

### Build para Producción

```bash
# Crear build optimizado
npm run build

# Ejecutar build localmente
npm start
```

---

## 📁 Estructura del Proyecto

Ver `ESTRUCTURA_Y_GUIA.md` para documentación completa sobre:
- Estructura de carpetas
- Cómo cambiar textos
- Cómo agregar imágenes y videos
- Cómo agregar proyectos al portfolio
- Cómo publicar en Vercel

---

## 🎯 Secciones de la Página

1. **Header** - Navegación responsiva con sticky scroll
2. **Hero** - Fullscreen cinematográfico con video
3. **Introduction** - Presentación de la marca
4. **Services** - Grid de 7 servicios
5. **Portfolio** - Galería filtrable de proyectos
6. **Formats** - Capacidad 4K horizontal y vertical
7. **Equipment** - Especificaciones del DJI Mini 4 Pro
8. **Editing** - Servicios de edición de video
9. **Process** - Proceso en 4 pasos
10. **CTA** - Sección call-to-action cinematográfica
11. **Contact** - Múltiples métodos de contacto
12. **Footer** - Links y copyright

---

## 🔗 Links Importantes

**WhatsApp:** +54 9 3492 680779
- Link: https://wa.me/5493492680779

**Instagram:** @_desdearriba_
- Link: https://instagram.com/_desdearriba_

---

## 📸 Personalización

### Cambiar Textos
Editar archivos de componentes en `app/components/` o datos en `app/data/`

### Agregar Imágenes
1. Colocar en `public/images/`
2. Actualizar referencias en componentes

### Agregar Videos
1. Colocar MP4 en `public/videos/`
2. Actualizar paths en `Hero.tsx` y `CTASection.tsx`

### Agregar Proyectos
Editar `app/data/projects.ts` y agregar nuevo objeto

---

## 🚀 Deployment en Vercel

### Opción 1: Automatic Deployment
1. Conectar repo en [vercel.com](https://vercel.com)
2. Vercel deployará automáticamente en cada push

### Opción 2: Manual
```bash
npm install -g vercel
vercel
```

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor en http://localhost:3000

# Producción
npm run build        # Build optimizado
npm start           # Ejecutar build

# Linting
npm run lint        # Verificar código

# Otros
npm run format      # Formatear código (si está configurado)
npm run typecheck   # Verificar tipos TypeScript
```

---

## 📋 Checklist de Publicación

- [ ] Reemplazar imágenes de servicios
- [ ] Reemplazar imágenes de proyectos
- [ ] Agregar videos (hero y CTA)
- [ ] Actualizar textos principales
- [ ] Verificar links de WhatsApp e Instagram
- [ ] Probar responsive en mobile
- [ ] Probar todos los links internos y externos
- [ ] Verificar formulario de contacto
- [ ] Hacer build (`npm run build`)
- [ ] Deploy en Vercel
- [ ] Configurar dominio personalizado
- [ ] Verificar SEO y metadatos

---

## 💡 Tips

- Las imágenes se optimizan automáticamente con Next.js `Image`
- Videos deben ser MP4 optimizados (< 50MB)
- Mantener nombres de archivo consistentes
- Usar formato: `nombre-descriptivo.jpg` o `.mp4`
- Los datos están centralizados para fácil actualización
- Todos los componentes son reutilizables

---

## 📝 Licencia

Este proyecto ha sido desarrollado específicamente para DESDE ARRIBA.

---

## 🤝 Soporte

Para cambios o actualizaciones futuras, referir a `ESTRUCTURA_Y_GUIA.md` donde está documentada toda la estructura.

---

**Versión:** 1.0.0  
**Última actualización:** 2025  
**Status:** ✅ Listo para producción
