import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Restock'd Custom Rules for Consistency

      // 1. Enforce proper variable naming
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // 2. Enforce consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      // 3. No hardcoded constants (warn about magic numbers)
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2, 100],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          detectObjects: false,
        },
      ],

      // 4. Code quality rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',

      // 5. React specific rules
      'react/prop-types': 'off', // We use TypeScript
      'react/react-in-jsx-scope': 'off', // Next.js doesn't require it
      'react-hooks/exhaustive-deps': 'warn',

      // 6. Prefer const over let when possible
      'prefer-const': 'error',

      // 7. Enforce consistent function declarations
      'prefer-arrow-callback': 'error',
    },
  },
  {
    // Configuration and utility files - allow magic numbers
    files: ['src/config/**/*.ts', 'src/utils/**/*.ts', '*.config.*'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
  {
    // Test files - more lenient rules
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
