import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
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
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".vercel/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs",
      "**/*.min.js",
      ".opencode/skills/**",
      ".github/skills/**",
    ],
  },
];
