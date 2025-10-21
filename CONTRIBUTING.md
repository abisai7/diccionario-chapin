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

2. **Edita el archivo `src/data/words.json`**

3. **Agrega tu palabra siguiendo este formato:**

```json
{
  "word": "La palabra chapina",
  "meaning": "Definición clara y concisa del término",
  "examples": [
    "Ejemplo 1 de cómo se usa en una oración",
    "Ejemplo 2 mostrando otro contexto de uso"
  ]
}
```

**Lineamientos para palabras:**
- ✅ Debe ser un término usado en Guatemala
- ✅ La definición debe ser clara y comprensible
- ✅ Incluye al menos 2 ejemplos de uso
- ✅ Los ejemplos deben ser naturales y contextualizados
- ❌ No uses lenguaje ofensivo o discriminatorio
- ❌ Evita regionalismos muy específicos de una sola área

4. **Commit tus cambios:**

```bash
git commit -m "feat: agregar palabra 'tupalabra'"
```

5. **Envía un Pull Request**

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
- [ ] He probado mis cambios localmente
- [ ] He agregado comentarios en código complejo
- [ ] Mis commits tienen mensajes descriptivos
- [ ] He actualizado la documentación si es necesario
- [ ] No hay errores en la consola
- [ ] El build de producción funciona (`npm run build`)

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
```

### Código JavaScript/Astro

- Usa **2 espacios** para indentación
- Usa **comillas simples** para strings
- Usa **const** en lugar de let cuando sea posible
- Nombres de variables y funciones en **camelCase**
- Nombres de componentes en **PascalCase**

```javascript
// ✅ Bueno
const userName = 'Juan';
const getUserData = () => {
  return { name: userName };
};

// ❌ Malo
var user_name = "Juan";
function get_user_data() {
  return { name: user_name };
}
```

### CSS/Tailwind

- Usa **variables CSS** para colores
- Prioriza **clases Tailwind** sobre CSS custom
- Mantén la **coherencia** con el sistema de diseño
- Usa las **variables de border-radius** definidas

```astro
<!-- ✅ Bueno -->
<div class="p-4" style="background: var(--card); border-radius: var(--radius-lg)">
  Contenido
</div>

<!-- ❌ Malo -->
<div style="padding: 16px; background: #141920; border-radius: 16px">
  Contenido
</div>
```

### Estructura de Archivos

- **Componentes** en `src/components/`
- **Páginas** en `src/pages/`
- **Utilidades** en `src/utils/`
- **Estilos globales** en `src/styles/`
- **Datos** en `src/data/`

### Nombres de Archivos

- Componentes Astro: `PascalCase.astro`
- JavaScript: `camelCase.js`
- CSS: `kebab-case.css`
- Datos: `kebab-case.json`

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
- [Documentación de Tailwind](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Markdown Guide](https://www.markdownguide.org/)

---

¡Gracias por contribuir al Diccionario Chapín! 🇬🇹💙
