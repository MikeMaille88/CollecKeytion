import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginJest.configs.recommended.rules, // Active les règles Jest
    },
  },
];
