# Restock'd Development Style Guide

## Overview

This document outlines the coding standards and conventions used in the Restock'd project to ensure consistency and maintainability.

## File Structure & Naming

### File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.tsx`, `NavigationBar.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useProducts.ts`, `useCart.ts`)
- **Utils**: camelCase (e.g., `isClientError.ts`, `generateInvoice.ts`)
- **Types**: PascalCase (e.g., `Product.ts`, `User.ts`)
- **API Routes**: camelCase (e.g., `route.ts`, `[id]/route.ts`)

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   └── ui/                # UI-specific components
├── config/                # Configuration files
├── hooks/                 # Custom React hooks
├── lib/                   # External library utilities
├── models/                # Database models (Mongoose)
├── types/                 # TypeScript type definitions
└── utils/                 # General utility functions
```

## TypeScript Conventions

### Interface Definitions

- Always define interfaces for component props:

```tsx
interface ComponentProps {
  title: string;
  isVisible?: boolean;
}

export default function Component({
  title,
  isVisible = false,
}: ComponentProps) {
  // component logic
}
```

### Export Patterns

- Use `export default` for main component/function
- Use named exports for utilities and types
- Group related exports in index files when appropriate

### Type Imports

- Use `import type` for type-only imports:

```tsx
import type { Product } from '@/types/Product';
import { Button } from '@heroui/button';
```

## Component Standards

### Props Interface

Every component should have a clearly defined props interface:

```tsx
interface ProductCardProps {
  product: Product;
  variant?: 'customer' | 'admin';
  adminActions?: React.ReactNode;
  onCardClick?: () => void;
}
```

### Default Props

Use default parameters in destructuring:

```tsx
export default function Component({
  variant = 'default',
  isVisible = true,
}: ComponentProps) {
  // component logic
}
```

## Configuration Management

### Use Centralized Config

Import constants from the centralized configuration:

```tsx
import { APP_CONFIG } from '@/config/app';
// or
import { TAX_RATE, SHIPPING_COST } from '@/config/app';
```

### Environment Variables

- Use `process.env` variables with fallbacks in config files
- Document all environment variables in `.env.example`

## Error Handling

### API Errors

Use the centralized error types:

```tsx
import { ApiError, isClientError } from '@/types/errors';

try {
  // API call
} catch (error) {
  if (isClientError(error)) {
    // Handle client errors (4xx)
  }
}
```

### Form Validation

Use consistent validation patterns across forms.

## API Route Standards

### Parameter Handling

```tsx
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // route logic
}
```

### Response Format

Consistent response structure:

```tsx
return NextResponse.json({
  success: true,
  data: result,
  message: 'Operation successful',
});
```

## Database Patterns

### Model Exports

```tsx
export const ModelName =
  mongoose.models.ModelName ||
  mongoose.model<IModelDocument>('ModelName', modelSchema);
```

### Type Safety

Always use TypeScript interfaces for database documents.

## Testing Standards

### Component Testing

- Test user interactions
- Test edge cases
- Mock external dependencies

### API Testing

- Test success cases
- Test error handling
- Test validation

## Performance Guidelines

### React Query

- Use appropriate stale times
- Implement proper cache invalidation
- Use prefetching for critical data

### Image Optimization

- Use Next.js Image component
- Define remote patterns in `next.config.ts`

## Code Quality

### ESLint Rules

Follow the established ESLint configuration in `eslint.config.mjs`.

### Import Organization

1. External libraries
2. Internal utilities/types
3. Relative imports

```tsx
import { Button } from '@heroui/button';
import { useState } from 'react';

import { API_CONFIG } from '@/config/app';
import type { Product } from '@/types/Product';

import './component.css';
```

## Documentation

### Code Comments

- Comment complex business logic
- Explain "why" not "what"
- Use JSDoc for public APIs

### README Updates

Keep README.md current with:

- Setup instructions
- Environment variables
- Architecture decisions

## Deprecation Strategy

When deprecating code:

1. Add `@deprecated` JSDoc comment
2. Provide alternative
3. Update documentation
4. Plan removal timeline

Example:

```tsx
/**
 * @deprecated Use NewComponent instead. Will be removed in v2.0.0
 */
export function OldComponent() {
  // implementation
}
```

## Commit Standards

### Commit Messages

- Use conventional commits format
- Be descriptive but concise
- Reference issues when applicable

Examples:

```
feat: add product search functionality
fix: resolve cart quantity update issue
docs: update API documentation
refactor: standardize error handling
```

## Review Checklist

Before submitting PRs:

- [ ] TypeScript types are properly defined
- [ ] Components have proper interfaces
- [ ] Error handling is implemented
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Code follows style guide
- [ ] No console.log statements
- [ ] Environment variables are documented
