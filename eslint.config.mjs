// @ts-check

import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module", // Permite el uso de imports y exports
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...eslint.configs.recommended,
      ...tseslint.configs.recommended,
      quotes: ["error", "double"],
      "import/prefer-default-export": "off",
    },
  },
];
