# ESLint Configuration for Restock'd

## Overview

This document explains the custom ESLint rules implemented for the Restock'd project to enforce coding consistency and best practices.

## Installed Packages

```bash
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import husky lint-staged prettier
```

## Rules Implemented

### 1. Type Import Consistency (`@typescript-eslint/consistent-type-imports`)

**Rule**: `"@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }]`

**Purpose**: Enforces using `import type` for type-only imports to improve build performance and clarity.

**Examples**:

```tsx
// ❌ Bad
import { Product } from '@/types/Product';
import { NextRequest } from 'next/server';

// ✅ Good
import type { Product } from '@/types/Product';
import type { NextRequest } from 'next/server';
```

### 2. No Magic Numbers (`no-magic-numbers`)

**Rule**: `"no-magic-numbers": ["warn", { "ignore": [-1, 0, 1, 2, 100] }]`

**Purpose**: Prevents hardcoded numbers and encourages using named constants from config files.

**Examples**:

```tsx
// ❌ Bad
const tax = subtotal * 0.08; // Magic number

// ✅ Good
import { TAX_RATE } from '@/config/app';
const tax = subtotal * TAX_RATE;
```

### 3. Unused Variable Naming (`@typescript-eslint/no-unused-vars`)

**Rule**: `"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]`

**Purpose**: Allows intentionally unused variables when prefixed with underscore.

**Examples**:

```tsx
// ❌ Bad
function handler(req, res) {} // req is unused

// ✅ Good
function handler(_req, res) {} // Intentionally unused
```

### 4. Console Statement Restrictions (`no-console`)

**Rule**: `"no-console": ["warn", { "allow": ["warn", "error"] }]`

**Purpose**: Prevents `console.log` statements in production code while allowing warnings and errors.

**Examples**:

```tsx
// ❌ Bad
console.log('Debug info'); // Warning

// ✅ Good
console.warn('Something unexpected happened');
console.error('An error occurred');
```

### 5. React Specific Rules

#### No PropTypes (`react/prop-types`)

**Rule**: `"react/prop-types": "off"`
**Purpose**: TypeScript provides type checking, PropTypes are redundant.

#### React Import (`react/react-in-jsx-scope`)

**Rule**: `"react/react-in-jsx-scope": "off"`
**Purpose**: Next.js automatically imports React.

#### Hooks Dependencies (`react-hooks/exhaustive-deps`)

**Rule**: `"react-hooks/exhaustive-deps": "warn"`
**Purpose**: Ensures useEffect dependencies are correctly specified.

## File-Specific Rules

### Configuration Files

Files: `src/config/**/*.ts`, `src/utils/**/*.ts`, `*.config.*`

**Relaxed Rules**:

- `no-magic-numbers`: off (constants are allowed in config files)

### Test Files

Files: `**/*.test.{ts,tsx}`, `**/*.spec.{ts,tsx}`

**Relaxed Rules**:

- `no-magic-numbers`: off
- `@typescript-eslint/no-unused-vars`: off

## Git Hooks

### Pre-commit Hook

Automatically runs before each commit:

```bash
pnpm lint-staged && pnpm type-check
```

### Lint-Staged Configuration

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"]
  }
}
```

## Available Scripts

### Linting

```bash
pnpm lint          # Run ESLint
pnpm lint:fix      # Run ESLint with auto-fix
pnpm lint:strict   # Run ESLint with zero warnings allowed
```

### Formatting

```bash
pnpm format        # Format all files with Prettier
pnpm format:check  # Check if files are formatted correctly
```

### Type Checking

```bash
pnpm type-check    # Run TypeScript compiler without emitting files
```

## Common Fixes

### 1. Type Import Issues

**Auto-fix**: Run `pnpm lint:fix`

### 2. Magic Numbers

**Manual fix**: Extract to constants in `src/config/app.ts`

```tsx
// Before
const maxItems = 99;

// After
import { APP_CONFIG } from '@/config/app';
const maxItems = APP_CONFIG.cart.maxQuantityPerItem;
```

### 3. Console Statements

**Manual fix**: Replace with appropriate logging

```tsx
// Before
console.log('User logged in');

// After
console.info('User logged in'); // If needed for debugging
// Or remove entirely for production
```

## Suppressing Rules

### Disable for a Line

```tsx
// eslint-disable-next-line no-magic-numbers
const port = 3000;
```

### Disable for a File

```tsx
/* eslint-disable no-magic-numbers */
// File content with magic numbers allowed
```

### Disable for a Block

```tsx
/* eslint-disable no-console */
console.log('Debug info');
console.log('More debug info');
/* eslint-enable no-console */
```

## Integration with VS Code

Add to `.vscode/settings.json`:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Benefits

1. **Consistency**: Enforces uniform coding style across the project
2. **Performance**: Type-only imports improve build times
3. **Maintainability**: Constants are centralized and easy to update
4. **Quality**: Prevents common JavaScript/TypeScript pitfalls
5. **Developer Experience**: Auto-fixes reduce manual work

## Troubleshooting

### ESLint Errors After Adding Rules

1. Run `pnpm lint:fix` to auto-fix simple issues
2. Check if the rule should be suppressed for specific cases
3. Update code to follow the established patterns

### Build Failures

1. Run `pnpm type-check` to identify TypeScript issues
2. Ensure all dependencies are properly typed
3. Check that imports match export patterns

### Git Hook Failures

1. Fix ESLint errors: `pnpm lint:fix`
2. Fix TypeScript errors: `pnpm type-check`
3. Format code: `pnpm format`
4. Try committing again

Remember: These rules are designed to help maintain code quality. If a rule consistently causes issues, it can be adjusted in `eslint.config.mjs`.
