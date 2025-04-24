import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Cible les fichiers JS/JSX
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }, // Définir les environnements globaux (browser et node)
    },
    settings: {
      react: {
        version: "detect", // Détecter automatiquement la version de React
      },
    },
    plugins: {
      react: pluginReact, // Utiliser le plugin React
    },
  },
  pluginJs.configs.recommended, // Applique les règles recommandées pour JS
  pluginReact.configs.flat.recommended, // Applique les règles recommandées pour React
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Désactive la règle `react/react-in-jsx-scope`
      "react/jsx-uses-react": "off", // Désactive la règle `react/jsx-uses-react`
      "react/prop-types": "warn", // Désactive la règle de validation des prop-types
      "no-unused-vars": "warn", // Désactive la règle des variables non utilisées
    },
  },
  {
    ignores: ["node_modules", "dist"], // Dossiers à ignorer
  },
];