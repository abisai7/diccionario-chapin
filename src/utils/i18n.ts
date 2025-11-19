export const translations = {
    es: {
        "home.title": "Chapinismos",
        "home.description": "Diccionario completo de chapinismos, palabras guatemaltecas, modismos y expresiones típicas de Guatemala con definiciones, ejemplos y uso correcto.",
        "home.keywords": "diccionario chapín, chapinismos, guatemaltequismos, palabras chapinas, jerga guatemalteca, modismos Guatemala",
        "home.subtitle": "Descubre el significado de las palabras y expresiones más usadas en Guatemala",
        "home.search.placeholder": "Buscar chapinismos...",
        "home.search.tip": "Presiona",
        "home.search.tip2": "para buscar rápidamente",
        "home.featured": "Palabras destacadas",
        "home.contribute.title": "Contribuye al Diccionario",
        "home.contribute.subtitle": "Este es un proyecto de código abierto y cualquiera puede contribuir para hacer crecer el diccionario.",
        "home.contribute.tech.title": "Contribuciones Técnicas",
        "home.contribute.tech.description": "Desarrolladores pueden agregar nuevas palabras, mejorar el código, o reportar errores en GitHub.",
        "home.contribute.tech.button": "Ver en GitHub",
        "home.contribute.all.title": "Otras Formas de Contribuir",
        "home.contribute.all.description": "Pronto habrá más formas de contribuir sin necesidad de conocimientos técnicos.",
        "home.contribute.all.status": "Próximamente",

        "search.title": "Buscar",
        "search.subtitle": "Encuentra el chapinismo que estás buscando",
        "search.description": "Busca entre todas las palabras y expresiones guatemaltecas del diccionario chapín",

        "index.title": "Índice Alfabético",
        "index.subtitle": "Explora todas las {count} palabras del diccionario",
        "index.description": "Índice alfabético completo de todos los chapinismos y guatemaltequismos del diccionario",

        "word.back": "Volver al inicio",
        "word.share": "Compartir imagen",

        "nav.home": "Inicio",
        "nav.search": "Buscar",
        "nav.index": "Índice",

        "word.page.title": "Chapinismos",
    },
    en: {
        "home.title": "Chapinismos",
        "home.description": "Complete dictionary of Guatemalan slang, words, idioms and typical expressions from Guatemala with definitions, examples and correct usage.",
        "home.keywords": "guatemalan dictionary, guatemalan slang, chapin words, guatemalan expressions, guatemala idioms",
        "home.subtitle": "Discover the meaning of the most used words and expressions in Guatemala",
        "home.search.placeholder": "Search Guatemalan slang...",
        "home.search.tip": "Press",
        "home.search.tip2": "to search quickly",
        "home.featured": "Featured Words",
        "home.contribute.title": "Contribute to the Dictionary",
        "home.contribute.subtitle": "This is an open source project and anyone can contribute to grow the dictionary.",
        "home.contribute.tech.title": "Technical Contributions",
        "home.contribute.tech.description": "Developers can add new words, improve the code, or report bugs on GitHub.",
        "home.contribute.tech.button": "View on GitHub",
        "home.contribute.all.title": "Other Ways to Contribute",
        "home.contribute.all.description": "Soon there will be more ways to contribute without technical knowledge.",
        "home.contribute.all.status": "Coming Soon",

        "search.title": "Search",
        "search.subtitle": "Find the Guatemalan slang you're looking for",
        "search.description": "Search among all Guatemalan words and expressions in the slang dictionary",

        "index.title": "Alphabetical Index",
        "index.subtitle": "Explore all {count} words in the dictionary",
        "index.description": "Complete alphabetical index of all Guatemalan slang and expressions in the dictionary",

        "word.back": "Back to home",
        "word.share": "Share image",

        "nav.home": "Home",
        "nav.search": "Search",
        "nav.index": "Index",

        "word.page.title": "Chapinismos",
    },
};

export function getLangFromUrl(url: URL): "es" | "en" {
    const [, lang] = url.pathname.split("/");
    if (lang === "en") return "en";
    return "es";
}

export function useTranslations(lang: string | undefined) {
    return (key: string, vars?: Record<string, string | number>) => {
        const locale = (lang === "en" ? "en" : "es") as "es" | "en";
        let text = translations[locale][key as keyof typeof translations.es] || key;

        if (vars) {
            Object.entries(vars).forEach(([varKey, value]) => {
                text = text.replace(`{${varKey}}`, String(value));
            });
        }

        return text;
    };
}

export function getLocalizedPath(path: string, lang: string): string {
    const prefix = lang === "en" ? "/en" : "/es";
    return `${prefix}${path}`;
}
