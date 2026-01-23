# Guía de Contribución

¡Gracias por tu interés en contribuir al Diccionario Chapín! 🇬🇹

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Agregar nuevas palabras](#agregar-nuevas-palabras)
- [Reportar bugs](#reportar-bugs)
- [Sugerir mejoras](#sugerir-mejoras)
- [Pull Requests](#pull-requests)
- [Guías de estilo](#guías-de-estilo)

## Código de Conducta

Este proyecto y todos los que participan en él se rigen por nuestro código de conducta. Al participar, se espera que respetes este código.

## ¿Cómo puedo contribuir?

### Agregar nuevas palabras

La forma más fácil de contribuir es agregando nuevas palabras chapinas. Aquí te mostramos cómo:

1. **Fork el repositorio**

2. **Instala las dependencias:**

```bash
pnpm install
# o
npm install
```

1. **Crea un archivo Markdown para la versión en español en `src/content/words-es/`**

El nombre del archivo debe ser la palabra en minúsculas sin tilde, con guiones en lugar de espacios (ej: `chapin.md`). Si es una expresión o modismo, usa el nombre completo (ej: `ponerse-las-pilas.md`).

```markdown
---
word: "Chapín"
meaning: "Persona originaria de Guatemala; gentilicio coloquial."
examples:
  - "Me siento orgulloso de ser chapín."
  - "Los chapines somos trabajadores y amables."
  - "Ese restaurante tiene comida bien chapina."
category: "sustantivo"
region: "Guatemala"
featured: true
---

## Etimología

El término viene del español antiguo "chapín", un tipo de calzado con plataforma de corcho que usaban los españoles en el siglo XVI.

## Notas

Puedes agregar contexto adicional, etimología o información cultural aquí (opcional).
```

1. **Crea el mismo archivo para la versión en inglés en `src/content/words-en/`**

Usa el **mismo nombre de archivo** y traduce el contenido:

```markdown
---
word: "Chapín"
meaning: "A person from Guatemala; Guatemalan"
examples:
  - "He's a chapín, born and raised in Guatemala City"
  - "Chapines are known for their friendly nature"
  - "The chapín culture is very rich and diverse"
category: "noun"
region: "Guatemala"
featured: true
---

## Etymology

The term comes from the old Spanish word referring to a type of wooden clog shoe with a cork platform that was popular in Spain during the 16th century.

## Notes

You can add additional context, etymology, or cultural information here (optional).
```

**Lineamientos para palabras:**

**Campos obligatorios:**

- ✅ `word` - La palabra en español o inglés según la carpeta
- ✅ `meaning` - Definición clara y concisa
- ✅ `examples` - Array con al menos 2 ejemplos de uso
- ✅ `category` - Tipo: `"sustantivo"`, `"verbo"`, `"adjetivo"`, `"expresión"`, `"modismo"` (español) o `"noun"`, `"verb"`, `"adjective"`, `"expression"`, `"idiom"` (inglés)
  **Campos opcionales:**

- `region` - Por defecto "Guatemala"
- `synonyms` - Array de sinónimos
- `relatedWords` - Array de palabras relacionadas
- `featured` - `true` para destacar en la página principal (solo 6 palabras)

**Reglas importantes:**

- ✅ Debe ser un término usado en Guatemala
- ✅ La definición debe ser clara y comprensible
- ✅ Los ejemplos deben ser naturales y contextualizados
- ✅ Nombres de archivo en minúsculas, sin acentos, con guiones
- ✅ El mismo nombre de archivo debe existir en `words-es/` y `words-en/`
- ❌ No uses lenguaje ofensivo o discriminatorio

1. **Formatea el código antes de hacer commit:**

```bash
pnpm run format
# o
npm run format
```

1. **Verifica que el proyecto compile sin errores:**

```bash
pnpm run build
# o
npm run build
```

El sistema usa **Zod** para validar automáticamente que todos los campos estén correctos. Si hay errores, el build fallará con un mensaje descriptivo.

1. **Commit tus cambios:**

```bash
git commit -m "feat: agregar palabra 'chapin'"
```

1. **Envía un Pull Request**

Para más detalles sobre cómo agregar palabras, consulta [src/content/WORDS_README.md](src/content/WORDS_README.md).

### Reportar Bugs

Si encuentras un bug, por favor abre un issue con:

- **Título claro y descriptivo**
- **Descripción detallada** del problema
- **Pasos para reproducir** el error
- **Comportamiento esperado** vs comportamiento actual
- **Screenshots** si es posible
- **Información del navegador/dispositivo**

Ejemplo:

```markdown
## Bug: El buscador no filtra correctamente

**Descripción:**
Al buscar la palabra "patojo", no se muestran resultados a pesar de que la palabra existe.

**Pasos para reproducir:**

1. Ir a /buscar
2. Escribir "patojo"
3. Presionar buscar

**Esperado:** Ver la palabra "patojo" en los resultados
**Actual:** No se muestran resultados

**Navegador:** Chrome 120, macOS
```

### Sugerir Mejoras

¿Tienes una idea para mejorar el proyecto? ¡Genial!

1. **Revisa** que no exista ya un issue similar
2. **Abre un issue** con la etiqueta "enhancement"
3. **Describe claramente:**
   - Qué problema resuelve tu sugerencia
   - Cómo funcionaría la mejora
   - Por qué sería útil para los usuarios

## Pull Requests

### Proceso

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Haz tus cambios** siguiendo las guías de estilo
4. **Testea** que todo funcione correctamente
5. **Commit** tus cambios con mensajes descriptivos
6. **Push** a tu fork (`git push origin feature/AmazingFeature`)
7. **Abre un Pull Request** con descripción clara

### Checklist antes de enviar PR

- [ ] Mi código sigue las guías de estilo del proyecto
- [ ] He formateado el código con `pnpm run format`
- [ ] He ejecutado el linter con `pnpm run lint`
- [ ] He probado mis cambios localmente con `pnpm run dev`
- [ ] Si agregué palabras, creé ambos archivos (español e inglés)
- [ ] He verificado que los archivos tengan el mismo nombre en ambas carpetas
- [ ] He agregado comentarios en código complejo
- [ ] Mis commits tienen mensajes descriptivos
- [ ] He actualizado la documentación si es necesario
- [ ] No hay errores en la consola
- [ ] El build de producción funciona (`pnpm run build`)
- [ ] El sistema de validación Zod no reporta errores

## Guías de Estilo

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar nueva funcionalidad
fix: corregir bug
docs: actualizar documentación
style: cambios de formato (no afectan funcionalidad)
refactor: refactorizar código
test: agregar tests
chore: tareas de mantenimiento
```

Ejemplos:

```bash
git commit -m "feat: agregar palabra 'chilero'"
git commit -m "fix: corregir búsqueda case-sensitive"
git commit -m "docs: actualizar README con nuevas instrucciones"
git commit -m "style: formatear código con prettier"
```

### Código JavaScript/Astro

- Usa **2 espacios** para indentación
- Usa **comillas dobles** para strings (configurado en Prettier)
- Usa **const** en lugar de let cuando sea posible
- Nombres de variables y funciones en **camelCase**
- Nombres de componentes en **PascalCase**
- El proyecto incluye **auto-formateo** con Prettier
- Las **clases de Tailwind se ordenan automáticamente** con prettier-plugin-tailwindcss

```javascript
// ✅ Bueno
const userName = "Juan";
const getUserData = () => {
  return { name: userName };
};

// ❌ Malo
var user_name = "Juan";
function get_user_data() {
  return { name: user_name };
}
```

**Comandos útiles:**

```bash
# Formatear todo el código
pnpm run format

# Verificar formato sin modificar
pnpm run format:check

# Ejecutar linter
pnpm run lint

# Arreglar problemas automáticamente
pnpm run lint:fix
```

### CSS/Tailwind

- Usa **variables CSS** para colores
- Prioriza **clases Tailwind** sobre CSS custom
- Mantén la **coherencia** con el sistema de diseño
- Usa las **variables de border-radius** definidas

```astro
<!-- ✅ Bueno -->
<div class="p-4" style="background: var(--card); border-radius: var(--radius-lg)">Contenido</div>

<!-- ❌ Malo -->
<div style="padding: 16px; background: #141920; border-radius: 16px">Contenido</div>
```

### Estructura de Archivos

- **Componentes** en `src/components/`
- **Páginas** en `src/pages/`
- **Utilidades** en `src/utils/`
- **Estilos globales** en `src/styles/`
- **Palabras en español** en `src/content/words-es/`
- **Palabras en inglés** en `src/content/words-en/`
- **Configuración de contenido** en `src/content/config.ts`

### Nombres de Archivos

- Componentes Astro: `PascalCase.astro`
- JavaScript: `camelCase.js`
- CSS: `kebab-case.css`
- Palabras (Markdown): `kebab-case.md` (sin acentos, todo minúsculas)

## Tipos de Contribuciones

### 🌟 Prioridad Alta

- Agregar nuevas palabras chapinas
- Corregir errores en definiciones existentes
- Mejorar ejemplos de uso
- Reportar y corregir bugs

### 📝 Prioridad Media

- Mejorar la documentación
- Optimizar el rendimiento
- Mejorar la accesibilidad
- Agregar tests

### 💡 Prioridad Baja

- Nuevas features
- Mejoras de UI/UX
- Refactorización de código

## Proceso de Revisión

1. Un maintainer revisará tu PR
2. Puede solicitar cambios o mejoras
3. Una vez aprobado, se hará merge
4. Tu contribución aparecerá en el proyecto!

## Reconocimiento

Todos los contribuidores serán reconocidos en el proyecto. Tu nombre aparecerá en:

- La lista de contribuidores de GitHub
- El archivo de agradecimientos

## ¿Necesitas Ayuda?

- 📧 Abre un issue con tus preguntas
- 💬 Revisa issues existentes con la etiqueta "question"
- 📚 Lee la documentación del proyecto

## Recursos Útiles

- [Documentación de Astro](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Documentación de Tailwind](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Zod Documentation](https://zod.dev/) - Sistema de validación usado en el proyecto
- [Prettier](https://prettier.io/) - Formateador de código
- [ESLint](https://eslint.org/) - Linter de JavaScript

---

¡Gracias por contribuir al Diccionario Chapín! 🇬🇹💙
