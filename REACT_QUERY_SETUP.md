# React Query Setup Documentation

## Overview
This document explains the React Query (TanStack Query) setup for the restock-d application.

## Installation
```bash
pnpm install @tanstack/react-query @tanstack/react-query-devtools
```

## Key Components

### 1. QueryProvider (`src/components/QueryProvider.tsx`)
- Wraps the app with QueryClientProvider
- Includes React Query DevTools for development
- Configures default query options (staleTime, retry logic)

### 2. API Client (`src/lib/api.ts`)
- Centralized API functions for fetching products
- Custom `ApiError` class for better error handling
- Query keys factory for consistent cache management
- Type-safe response handling

### 3. Custom Hooks

#### `useProducts` (`src/hooks/useProducts.ts`)
- Fetches paginated products list
- Handles errors and retry logic
- Caches results for 5 minutes

#### `useProduct` (`src/hooks/useProduct.ts`)
- Fetches single product by ID
- Enabled only when ID is provided
- Doesn't retry on 404 errors

#### `useProductMutations` (`src/hooks/useProductMutations.ts`)
- Future CRUD operations (create, update, delete)
- Invalidates cache after mutations
- Optimistic updates support

### 4. Query Helpers (`src/lib/queryHelpers.ts`)
- Prefetching utilities
- Cache invalidation helpers
- Performance optimization functions

### 5. Error Handling
- `ErrorBoundary` component for React errors
- Custom `ApiError` class for API errors
- Comprehensive error states in components

## API Routes

### Products List: `GET /api/products?page={page}`
```typescript
// Response format
{
  message: string;
  data: {
    products: Product[];
    totalPages: number;
    totalProducts: number;
    currentPage: number;
  }
}
```

### Single Product: `GET /api/products/{id}`
```typescript
// Response format
{
  message: string;
  data: Product;
}
```

## Usage Examples

### Products List
```tsx
import { useProducts } from '../hooks/useProducts';

export default function ProductsList() {
  const { data, isPending, error } = useProducts(1);
  
  if (isPending) return <LoadingCards />;
  if (error) return <ErrorMessage description={error.message} />;
  
  return (
    <div>
      {data?.products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

### Single Product
```tsx
import { useProduct } from '../hooks/useProduct';

export default function ProductDetail({ id }: { id: string }) {
  const { data: product, isPending, error } = useProduct(id);
  
  if (isPending) return <ProductSkeleton />;
  if (error) return <ErrorMessage description={error.message} />;
  
  return <ProductCard product={product} />;
}
```

## Performance Features

### Caching
- 5-minute stale time for all queries
- 10-minute garbage collection time
- Automatic background refetching when stale

### Retry Logic
- 3 retry attempts with exponential backoff
- No retries on client errors (4xx)
- Maximum 30-second retry delay

### Prefetching
```typescript
import { prefetchProducts } from '../lib/queryHelpers';

// Prefetch next page
await prefetchProducts(queryClient, page + 1);
```

## Development Tools
- React Query DevTools available in development
- Query inspection and debugging
- Cache state visualization

## Next Steps
1. Add mutations for CRUD operations
2. Implement optimistic updates
3. Add infinite queries for pagination
4. Set up server-side rendering with hydration
5. Add background sync for offline support

## Benefits
- **Caching**: Automatic request deduplication and caching
- **Background Updates**: Keeps data fresh automatically
- **Error Handling**: Comprehensive error states and retry logic
- **Performance**: Reduces unnecessary network requests
- **Developer Experience**: DevTools and TypeScript support
- **Scalability**: Easy to add new API endpoints and features
