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
      ".worktrees/**",
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
        // Exposed on window by umami-analytics-core.js before script.js runs
        UmamiAnalyticsCore: "readonly",
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
  // umami-analytics-core.js is a browser script with a UMD-style tail
  // (`if (typeof module !== 'undefined') module.exports = ...`) so tests can require() it
  {
    files: ["umami-analytics-core.js", "contact-form-core.js"],
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
  // These helpers remain available to the legacy portfolio generator even
  // though its public category pages now resolve through SEO redirects.
  {
    files: ["scripts/build-portfolio.mjs"],
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^render(Header|Footer|Head|PortfolioCard)$",
        },
      ],
    },
  },
];
