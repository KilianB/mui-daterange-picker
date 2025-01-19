import globals from "globals";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import typescriptParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
// import typescript from "@typescript-eslint/eslint-plugin"

export default [
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // ...globals.browser,
        ...globals.node,
        ...globals.es2017,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".ts", ".jsx", ".tsx"],
        },
      },
    },
    plugins: {
      react,
      hooks,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // Note: Disable base rule to avoid incorrect errors
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
      "react/jsx-props-no-spreading": "off",
      "import/extensions": "off",
      "react/function-component-definition": "off",
    },
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
  },
];
