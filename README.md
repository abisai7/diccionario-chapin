# ![icon](./public/favicon.svg) Chapinismos.org

> Un glosario interactivo de chapinismos guatemaltecos con definiciones y ejemplos. Desarrollado con Astro y Tailwind CSS.

![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![Astro](https://img.shields.io/badge/Astro-6.1.1-FF5D01.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2.2-38B2AC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Características

- 🎨 **Diseño Moderno** - Interfaz limpia y profesional con Tailwind CSS
- 🌓 **Tema Claro/Oscuro** - Toggle para cambiar entre temas con persistencia en localStorage
- 🔍 **Búsqueda Avanzada** - Busca por palabra
- 📱 **Responsive** - Optimizado para móviles, tablets y desktop
- ⚡ **Rendimiento** - Sitio estático generado con Astro (SSG)
- 🎭 **Animaciones Suaves** - Transiciones y efectos pulidos
- ♿ **Accesible** - Diseño que cumple estándares WCAG
- 🎯 **Ticker Interactivo** - Carrusel de palabras clickeable
- 📑 **Índice Alfabético** - Navegación ordenada de todas las palabras

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 22+ y pnpm (o npm)
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/abisai7/diccionario-chapin.git
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

### Formateo y Linting

```bash
# Formatear código con Prettier
pnpm run format

# Verificar formato sin modificar archivos
pnpm run format:check

# Ejecutar ESLint
pnpm run lint

# Arreglar problemas de ESLint automáticamente
pnpm run lint:fix
```

## 📁 Estructura del Proyecto

```text
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
- Filtrado por palabra

### 📑 Índice (`/indice`)

- Lista alfabética completa
- Diseño en columnas responsive
- Links directos a cada palabra

### 📖 Detalle (`/palabras/[slug]`)

- Definición completa
- Lista de ejemplos de uso
- Botón para generar una imagen y compartirla
- Botón de navegación

## 🛠️ Tecnologías

- **[Astro](https://astro.build)** - Framework web moderno
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utility-first
- **JavaScript** - Lógica del cliente
- **JSON** - Base de datos estática

## 🧹 Calidad de Código

Este proyecto utiliza herramientas para mantener la calidad y consistencia del código:

### Prettier

Formateador de código configurado para mantener un estilo consistente:

- Semi-colons: Habilitados
- Comillas: Dobles
- Ancho máximo de línea: 100 caracteres
- Tabs: 2 espacios
- Plugin para archivos Astro
- **Ordenamiento automático de clases de Tailwind CSS**

### ESLint

Linter configurado con:

- `eslint-plugin-astro` - Reglas específicas para Astro
- `eslint-plugin-jsx-a11y` - Validación de accesibilidad
- Reglas de ES6+ modernas
- Validación de mejores prácticas

### Configuración de VS Code

El proyecto incluye configuración recomendada para VS Code:

- Formateo automático al guardar
- ESLint auto-fix al guardar
- Extensiones recomendadas (Prettier, ESLint, Astro)

## 📝 Agregar Nuevas Palabras

Las palabras se gestionan mediante **Content Collections** de Astro con archivos Markdown individuales.

### Crear una Nueva Palabra

1. Crea un archivo en `src/content/words-es/` con el nombre de la palabra (ej: `chapin.md`)
2. Usa el siguiente formato:

```markdown
---
word: "Chapín"
meaning: "Persona originaria de Guatemala; gentilicio coloquial."
examples:
  - "Me siento orgulloso de ser chapín."
  - "Los chapines somos trabajadores."
category: "sustantivo"
region: "Guatemala"
---

Contenido adicional opcional en Markdown...
```

1. Repite el proceso para agregar la versión en inglés en `src/content/words-en/`, el nombre del archivo debe ser el mismo, igual que la palabra.

### Campos Disponibles

**Obligatorios:**

- `word` - La palabra en español
- `meaning` - Definición completa
- `examples` - Array de ejemplos de uso
- `category` - `sustantivo`, `verbo`, `adjetivo`, `expresión`, `modismo`

**Opcionales:**

- `region` - Región donde se usa (por defecto "Guatemala")
- `synonyms` - Array de sinónimos
- `relatedWords` - Array de palabras relacionadas

### Validación Automática

El sistema usa **TypeScript + Zod** para validar automáticamente:

- ✅ Campos obligatorios presentes
- ✅ Tipos de datos correctos
- ✅ Categorías válidas

Ver [src/content/WORDS_README.md](src/content/WORDS_README.md) para más detalles.

## 🚀 Optimizaciones

- ✅ **Sitio Estático** - Pre-renderizado en build time
- ✅ **CSS Purgado** - Solo CSS usado
- ✅ **Imágenes Optimizadas** - SVG para iconos
- ✅ **Zero JavaScript** - Para páginas estáticas
- ✅ **Lazy Loading** - Carga diferida de contenido
- ✅ **SEO Friendly** - Meta tags optimizados

## 📚 Documentación Adicional

- [WORDS_README.md](src/content/WORDS_README.md) -Instrucciones para agregar una nueva palabra
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guía para contribuir al proyecto

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Abisai Herrera

- GitHub: [@abisai7](https://github.com/abisai7)
- Website: [abisai.dev](https://abisai.dev)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

**Hecho con 💙 para Guatemala** 🇬🇹
