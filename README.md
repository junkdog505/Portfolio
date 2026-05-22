# Portfolio - Cristian Amezquita Soto

Portfolio personal como Desarrollador Full Stack, construido con Vue 3, TypeScript, Vite y Tailwind CSS 4.

## Tecnologías

- **Framework**: Vue 3 con Composition API (`<script setup>`)
- **Lenguaje**: TypeScript
- **Empaquetador**: Vite 8
- **Estilos**: Tailwind CSS 4
- **Modo oscuro**: Implementado con clases de Tailwind y CSS custom properties

## Estructura del proyecto

```
Portfolio/
├── index.html              # Entrada HTML con metadatos SEO
├── package.json            # Dependencias y scripts
├── vite.config.ts          # Configuración de Vite con plugin Vue y Tailwind
├── tsconfig.json           # Configuración raíz de TypeScript
├── tsconfig.app.json       # Configuración TS para la app
├── tsconfig.node.json      # Configuración TS para Node/Vite
├── public/
│   ├── profile.jpg         # Foto de perfil
│   ├── cv.pdf              # Hoja de vida descargable
│   ├── favicon.svg         # Ícono del sitio
│   ├── icons.svg           # Sprites de íconos
│   ├── proyectos.json      # Datos de proyectos (cargados vía fetch)
│   └── assets/
│       └── img/
│           └── proyectos/  # Imágenes SVG de proyectos
├── src/
│   ├── main.ts             # Punto de entrada de la aplicación
│   ├── App.vue             # Componente raíz con estructura principal
│   ├── style.css           # Estilos globales, tema claro/oscuro, scrollbar
│   ├── composables/
│   │   └── useTheme.ts     # Composable para manejo del tema claro/oscuro
│   └── components/
│       ├── Header.vue      # Barra de navegación con sidebar y menú móvil
│       ├── Hero.vue        # Sección principal con terminal interactiva
│       ├── TerminalHero.vue # Componente SVG que simula una terminal Linux
│       ├── AboutMe.vue     # Sección "Sobre mí" con foto, redes e idiomas
│       ├── Projects.vue    # Galería de proyectos con modal de detalles
│       ├── Experience.vue  # Experiencia laboral con línea de tiempo
│       ├── Education.vue   # Formación académica en formato de tarjetas
│       └── Contact.vue     # Formulario de contacto y datos protegidos
```

## Requisitos previos

- Node.js 18 o superior
- npm (incluido con Node.js)

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd Portfolio

# Instalar dependencias
npm install
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila el proyecto para producción (verifica tipos antes) |
| `npm run preview` | Previsualiza la versión de producción compilada |

## Personalización

### Cambiar datos personales

Los datos de experiencia laboral y educación están en sus respectivos componentes:

- **Experiencia**: Editar el array `items` en `src/components/Experience.vue`
- **Educación**: Editar el array `items` en `src/components/Education.vue`
- **Sobre mí**: Editar arrays `socials`, `softSkills` y `languages` en `src/components/AboutMe.vue`
- **Hero**: Editar props pasados a `TerminalHero` en `src/components/Hero.vue`

### Agregar proyectos

Editar el archivo `public/proyectos.json`:

```json
{
  "fullStack": [
    {
      "titulo": "Nombre del proyecto",
      "descripcion": "Descripción detallada",
      "imagenDestacada": "/assets/img/proyectos/imagen.svg",
      "linkProyecto": "https://github.com/usuario/repositorio",
      "estado": 2,
      "tecnologias": ["Vue", "TypeScript", "Node.js"],
      "galeria": [
        "/assets/img/proyectos/captura-1.svg"
      ]
    }
  ]
}
```

- `estado`: `0` = En proceso, `1` = En desarrollo, `2` = Completado
- `tecnologias`: campo opcional (si no se incluye no se muestra)
- Las categorías disponibles son: `fullStack`, `disenoWeb`, `pluginsWordpress`

### Cambiar la paleta de colores

Los colores de acento usan clases `blue-*` de Tailwind CSS. Para cambiar el color principal:

1. Reemplazar todas las ocurrencias de `blue-` por el color deseado (ej. `indigo-`, `emerald-`, `violet-`)
2. Ajustar los estilos de la terminal en `TerminalHero.vue`
3. Actualizar colores custom en `src/style.css`

### Cambiar el CV

Reemplazar el archivo `public/cv.pdf` por la versión actualizada.

### Información de contacto

El email y teléfono están ofuscados en Base64 en `src/components/Contact.vue`. Para actualizarlos:

1. Codificar los nuevos valores en Base64
2. Reemplazar `obfuscatedEmail` y `obfuscatedPhone`

## Despliegue

```bash
# Compilar para producción
npm run build

# El contenido de la carpeta dist/ está listo para desplegar en cualquier hosting estático
```

### Opciones de despliegue gratuitas

- **Vercel**: Importar el repositorio desde GitHub, detecta Vite automáticamente
- **Netlify**: Arrastrar la carpeta `dist/` o conectar el repositorio
- **GitHub Pages**: Usar `vite build --base=/nombre-repo/` y desplegar `dist/`

## Licencia

Este proyecto es de uso personal. Todos los derechos reservados.
