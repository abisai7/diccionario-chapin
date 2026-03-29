import eslintPluginAstro from "eslint-plugin-astro";

export default [
  // Configuración base de ESLint
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  // Configuración para archivos Astro
  ...eslintPluginAstro.configs.recommended,

  // Ignorar archivos
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".vercel/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs",
      "**/*.min.js",
    ],
  },
];
