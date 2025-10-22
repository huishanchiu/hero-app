import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

import configPrettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      configPrettier, // 關掉所有與 Prettier 衝突的規則
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      "react/react-in-jsx-scope": "off", //  React 17 開始不需要 import React
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
          filter: {
            regex: "^Theme$",
            match: false,
          },
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          prefix: ["T"],
          filter: {
            regex: ".*Props$",
            match: false,
          },
        },
      ],
    },
  },
]);
