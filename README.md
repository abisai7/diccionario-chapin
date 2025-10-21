# 📖 Diccionario Chapín

> Un glosario interactivo de chapinismos guatemaltecos con definiciones y ejemplos. Desarrollado con Astro y Tailwind CSS.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Astro](https://img.shields.io/badge/Astro-5.14.8-FF5D01.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.15-38B2AC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Características

- 🎨 **Diseño Moderno** - Interfaz limpia y profesional con Tailwind CSS
- 🌓 **Tema Claro/Oscuro** - Toggle para cambiar entre temas con persistencia en localStorage
- 🔍 **Búsqueda Avanzada** - Busca por palabra, significado o ejemplos
- 📱 **Responsive** - Optimizado para móviles, tablets y desktop
- ⚡ **Rendimiento** - Sitio estático generado con Astro (SSG)
- 🎭 **Animaciones Suaves** - Transiciones y efectos pulidos
- ♿ **Accesible** - Diseño que cumple estándares WCAG
- 🎯 **Ticker Interactivo** - Carrusel de palabras clickeable
- 📑 **Índice Alfabético** - Navegación ordenada de todas las palabras

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ y pnpm (o npm)
- Git

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd diccionario-chapin

# Instalar dependencias
pnpm install
# o
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm run dev
# o
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

### Build para Producción

```bash
# Generar sitio estático
pnpm run build
# o
npm run build

# Preview del build
pnpm run preview
# o
npm run preview
```

## 📁 Estructura del Proyecto

```
diccionario-chapin/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── SearchBox.astro
│   │   ├── Ticker.astro
│   │   └── WordCard.astro
│   ├── data/
│   │   └── words.json      # Base de datos de palabras
│   ├── layouts/
│   │   └── Base.astro      # Layout principal
│   ├── pages/              # Rutas de la aplicación
│   │   ├── index.astro     # Página principal
│   │   ├── buscar.astro    # Página de búsqueda
│   │   ├── indice.astro    # Índice alfabético
│   │   └── palabras/
│   │       └── [slug].astro # Página de detalle
│   ├── styles/
│   │   └── global.css      # Estilos globales y variables
│   └── utils/
│       └── slug.js         # Utilidades
├── astro.config.mjs        # Configuración de Astro
├── tailwind.config.js      # Configuración de Tailwind
└── package.json
```

## 🎯 Páginas Principales

### 🏠 Inicio (`/`)
- Hero section con buscador
- Ticker animado con palabras aleatorias
- Grid de palabras destacadas

### 🔍 Buscador (`/buscar`)
- Campo de búsqueda con parámetros URL
- Filtrado por palabra, significado y ejemplos
- Resultados en tiempo real

### 📑 Índice (`/indice`)
- Lista alfabética completa
- Diseño en columnas responsive
- Links directos a cada palabra

### 📖 Detalle (`/palabras/[slug]`)
- Definición completa
- Lista de ejemplos de uso
- Botón de navegación

## 🎨 Sistema de Diseño

### Variables CSS

El proyecto utiliza un sistema de variables CSS para:
- **Colores** - Paleta adaptable a temas
- **Sombras** - 3 niveles (sm, md, lg)
- **Border Radius** - 5 tamaños coherentes
- **Tipografía** - Jerarquía de texto

### Border Radius
```css
--radius-sm: 8px      /* Tags, kbd */
--radius-md: 12px     /* Botones, nav */
--radius-lg: 16px     /* Cards, forms */
--radius-xl: 20px     /* Hero, articles */
--radius-full: 9999px /* Pills, badges */
```

### Sombras
```css
--shadow-sm: rgba(0, 0, 0, 0.1)   /* Sutil */
--shadow-md: rgba(0, 0, 0, 0.15)  /* Media */
--shadow-lg: rgba(0, 0, 0, 0.2)   /* Pronunciada */
```

## 🛠️ Tecnologías

- **[Astro](https://astro.build)** - Framework web moderno
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utility-first
- **JavaScript** - Lógica del cliente
- **JSON** - Base de datos estática

## 📝 Agregar Nuevas Palabras

Edita el archivo `src/data/words.json`:

```json
{
  "word": "Palabra",
  "meaning": "Significado de la palabra",
  "examples": [
    "Ejemplo 1 de uso",
    "Ejemplo 2 de uso"
  ]
}
```

El sitio se regenerará automáticamente con las nuevas palabras.

## ⌨️ Atajos de Teclado

- **`/`** - Enfocar el buscador desde cualquier página

## 🚀 Optimizaciones

- ✅ **Sitio Estático** - Pre-renderizado en build time
- ✅ **CSS Purgado** - Solo CSS usado
- ✅ **Imágenes Optimizadas** - SVG para iconos
- ✅ **Zero JavaScript** - Para páginas estáticas
- ✅ **Lazy Loading** - Carga diferida de contenido
- ✅ **SEO Friendly** - Meta tags optimizados

## 📚 Documentación Adicional

- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios
- [DESIGN_IMPROVEMENTS.md](./DESIGN_IMPROVEMENTS.md) - Mejoras de diseño
- [VISUAL_CONSISTENCY.md](./VISUAL_CONSISTENCY.md) - Sistema de consistencia visual
- [BUTTON_IMPROVEMENTS.md](./BUTTON_IMPROVEMENTS.md) - Mejoras del botón de búsqueda

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Abisai Herrera**

- GitHub: [@abisai7](https://github.com/abisai7)
- Website: [abisai.dev](https://abisai.dev)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

**Hecho con 💙 para Guatemala** 🇬🇹
