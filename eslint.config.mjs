import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "saulofitness/**",
      "testing/**",
      ".tools/**",
      "img/**",
      "**/*.min.js",
      "madamebleuewatches-preview/**",
      "madamebleuewatches-preview-src/**",
      ".claude/**",
      "apps/studio-panel/.next/**",
    ],
  },
  js.configs.recommended,
  // Browser-loaded plain scripts (no bundler, no <script type="module">)
  {
    files: ["**/*.js"],
    ignores: ["tests/**", "playwright.config.js", "scripts/**", "portfolio/**"],
    languageOptions: {
      sourceType: "script",
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        // Exposed on window by google-analytics-core.js before script.js runs
        GoogleAnalyticsCore: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      // try/catch around localStorage/JSON access intentionally swallows errors
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  // google-analytics-core.js is a browser script with a UMD-style tail
  // (`if (typeof module !== 'undefined') module.exports = ...`) so tests can require() it
  {
    files: ["google-analytics-core.js"],
    languageOptions: {
      globals: {
        ...globals.commonjs,
      },
    },
  },
  // Playwright tests run under Node, but page.evaluate() callbacks execute
  // in the browser — both global sets are needed for the file to lint clean.
  {
    files: ["tests/**/*.js", "playwright.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  // Node ES module scripts (build tooling, data files)
  {
    files: ["**/*.mjs", "scripts/**/*.js", "portfolio/**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
