# 📝 Cómo Agregar Nuevas Palabras

Este directorio contiene todos los chapinismos del diccionario en formato Markdown con frontmatter.

## 📄 Estructura de un Archivo

Cada palabra debe estar en su propio archivo `.md` y en la carpeta `src/content/words-es/` (para la versión en español) y la carpeta `src/content/words-en/` (para la versión en inglés) con el siguiente formato:

```markdown
---
word: "Patojo"
meaning: "Niño o joven; persona de corta edad..."
examples:
  - "El patojo de la tienda siempre me ayuda..."
  - "Cuando era patojo jugaba en la calle..."
category: "sustantivo"
region: "Guatemala"
synonyms: ["cipote", "güiro"]
relatedWords: ["güiro"]
---

Contenido adicional opcional en Markdown...

## Notas

Puedes agregar contexto extra, etimología, o cualquier información adicional aquí.
```

## 📋 Campos Obligatorios

- `word`: La palabra en español (String)
- `meaning`: Definición completa (String)
- `examples`: Array de ejemplos de uso (Array de Strings)
- `category`: Tipo gramatical
  - Opciones: `"sustantivo"`, `"verbo"`, `"adjetivo"`, `"expresión"`, `"modismo"`
  - Opciones para la versión en inglés: `"noun"`, `"verb"`, `"adjective"`, `"expression"`, `"idiom"`

## 🔤 Campos Opcionales

- `region`: Región donde se usa (String)
  - Por defecto: `"Guatemala"`
- `synonyms`: Palabras similares (Array de Strings)
- `relatedWords`: Palabras relacionadas (Array de Strings)
- `featured`: Marca la palabra como destacada para mostrarla en la página principal (Boolean)
  - Ejemplo: `featured: true`
  - **Nota**: Solo marcar las 6 palabras más representativas o populares

## ✅ Pasos para Agregar una Palabra

1. **Crear archivo**: `nombre-de-palabra.md` (todo en minúsculas, con guiones)
2. **Copiar plantilla** de ejemplo
3. **Llenar información** en el frontmatter
4. **Agregar contenido** opcional después del `---`
5. **Guardar** y hacer commit

## 💡 Ejemplos

### Ejemplo Mínimo

```markdown
---
word: "Patojo"
meaning: "Niño o joven; persona de corta edad."
examples:
  - "El patojo de la tienda siempre me ayuda."
  - "Cuando era patojo jugaba en la calle."
category: "sustantivo"
---
```

### Ejemplo Completo

```markdown
---
word: "Chunche"
meaning: "Objeto indeterminado o cuyo nombre no se recuerda."
examples:
  - "Pasame ese chunche que está en la mesa."
  - "Guardé el chunche en el cajón."
category: "sustantivo"
region: "Guatemala"
synonyms: ["cosa", "cosilla"]
relatedWords: ["cachivache"]
---

## Etimología

Posible derivación del náhuatl o de variantes centroamericanas.

## Uso

Muy común en el habla cotidiana guatemalteca cuando no se recuerda
el nombre específico de un objeto.
```

## 🚀 Validación Automática

El sistema usa **Zod** para validar automáticamente que:

- ✅ Todos los campos obligatorios estén presentes
- ✅ Los tipos de datos sean correctos
- ✅ La categoría sea una de las opciones válidas

Si hay errores, el build fallará con un mensaje descriptivo.

## 📝 Convenciones

### Nombres de Archivo

- Todo en **minúsculas**
- Usa **guiones** en lugar de espacios: `pura-vida.md`
- Sin acentos: `puchica.md` (no `púchica.md`)
- Sin caracteres especiales

### Contenido

- Escribe con **claridad y concisión**
- Usa **ejemplos reales** y naturales
- Incluye **contexto cultural** si es relevante
- Mantén un **tono respetuoso** y educativo

## 🔗 Generación Automática

El sistema automáticamente:

- 🔗 Genera URLs amigables (slugs)
- 📑 Actualiza el índice alfabético
- 🔍 Incluye la palabra en el buscador
- 🎲 Puede aparecer en el ticker de inicio

¡No necesitas tocar ningún otro archivo!

## 🤝 Contribuir

Para contribuir con nuevas palabras:

1. Fork el repositorio
2. Crea una nueva palabra en `src/content/words-es/` y `src/content/words-en/`
3. Haz commit con un mensaje descriptivo
4. Crea un Pull Request

Consulta [CONTRIBUTING.md](../../CONTRIBUTING.md) para más detalles.
