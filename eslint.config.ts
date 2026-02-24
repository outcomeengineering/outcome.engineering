import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

// Shared restricted syntax rules for all TypeScript files
const tsRestrictedSyntax = [
  {
    selector: "TSEnumDeclaration",
    message: "TypeScript enums are banned. Use `type Foo = 'a' | 'b'` or `{ A: 'a', B: 'b' } as const` instead.",
  },
  {
    selector: "TSAsExpression[typeAnnotation.type='TSAnyKeyword']",
    message: "Do not use 'as any'. Use 'as unknown' and narrow with a type guard.",
  },
  {
    selector: "TSTypeAssertion[typeAnnotation.type='TSAnyKeyword']",
    message: "Do not use '<any>' type assertion. Use 'as unknown' and narrow with a type guard.",
  },
];

// Additional restricted syntax rules for test files
const testRestrictedSyntax = [
  {
    selector: "CallExpression[callee.object.name='vi'][callee.property.name='mock']",
    message: "vi.mock() is banned. Use dependency injection instead.",
  },
  {
    selector: "CallExpression[callee.object.name='vi'][callee.property.name='fn']",
    message: "vi.fn() is banned. Use typed interface implementations instead.",
  },
  {
    selector:
      "CallExpression[callee.type='MemberExpression'][callee.property.name=/^(toBe|toEqual|toStrictEqual|toContain|toMatch)$/] > Literal.arguments[raw=/^['\"`]/]",
    message: "Do not use string literals in assertions. Use a named constant or data factory.",
  },
];

const config = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),

  // Global ignores
  {
    ignores: [".next/**", "out/**", "build/**", "dist/**", "mintlify/**"],
  },

  // All TypeScript files: ban enums, ban "as any"
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...tsRestrictedSyntax],
    },
  },

  // Test files: ban vi.mock(), vi.fn(), string literals in assertions
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...tsRestrictedSyntax,
        ...testRestrictedSyntax,
      ],
    },
  },

  // Known issue in Next.js 15.5+ where auto-generated next-env.d.ts includes
  // triple-slash references for typed routes
  // See: https://github.com/vercel/next.js/issues/82828
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },

  prettier,
];

export default config;
