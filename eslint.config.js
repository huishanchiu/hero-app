import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import prettierPlugin from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      // 關掉會與 Prettier 衝突的規則
      { rules: configPrettier.rules },
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // 啟用 Prettier 作為 ESLint 規則來檢查格式
    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      // 不需要 React 17+ 的 React in scope
      "react-refresh/only-export-components": "off",
      // Prettier 格式化檢查（違反時給警告，可自行調成 'error'）
      "prettier/prettier": "warn",
    },
  },
]);
