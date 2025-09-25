import { configs, plugin, parser } from "typescript-eslint";

export default [
  ...configs.recommended,
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": plugin,
    },
    languageOptions: {
      ecmaVersion: 2023,
      parser,
      parserOptions: {
        project: true,
      },
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
      ],
      "@typescript-eslint/no-deprecated": "warn",
      curly: "warn",
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      semi: "warn",
    },
  },
];
