import parserTypeScript from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // arquivos e pastas onde o eslint não será aplicado
  {
    ignores: ["node_modules", "dist", "babel.config.js", "metro.config.js"],
  },

  // TypeScript rules base (pode remover se não usar TS)
  tseslint.configs.recommended,

  // React base config
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parser: parserTypeScript,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      "react-native": pluginReactNative,
      "simple-import-sort": simpleImportSort,
      prettier: eslintPluginPrettier,
      "@typescript-eslint": tseslint.plugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          // (opcional) caminho para seu tsconfig.json
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "react/prop-types": "off",

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Prettier formatting as ESLint errors
      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          tabWidth: 4,
          singleQuote: true,
          trailingComma: "all",
          arrowParens: "always",
          semi: false,
          endOfLine: "auto",
        },
      ],

      // Unused vars from TS, ignoring variables/args that start with _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],

      // React Native recommendations (opcional)
      "react/react-in-jsx-scope": "off",
      "react-native/no-inline-styles": "warn",
      "react-native/no-unused-styles": "warn",
      "react-native/split-platform-components": "warn",
    },
  },
]);