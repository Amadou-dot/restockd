# Product Form Separation Documentation

## Overview
The original `ProductForm` component has been separated into two distinct forms to improve code maintainability and reduce complexity:

1. **CreateProductForm** - For creating new products
2. **EditProductForm** - For editing existing products

## Changes Made

### 1. New Components Created

#### `CreateProductForm.tsx`
- **Purpose**: Handles creation of new products
- **Key Features**:
  - Empty initial state
  - Required image field
  - Reset form functionality
  - Optimized for creation workflow

#### `EditProductForm.tsx`
- **Purpose**: Handles editing of existing products
- **Key Features**:
  - Pre-populated with product data
  - Optional image field (keeps current image if not changed)
  - Optimized for editing workflow

### 2. Updated Components

#### `ProductForm.tsx` (Deprecated)
- Now serves as a wrapper for backward compatibility
- Automatically determines which form to use based on whether a product is provided
- **⚠️ Deprecated**: Will be removed in a future version

#### `EditProductBtn.tsx`
- Updated to use the new `EditProductForm`
- Simplified handler function
- Better type safety with FormData

### 3. Updated Hooks

#### `useProductMutations.ts`
- `useCreateProduct`: Now accepts `FormData` instead of `Partial<Product>`
- `useUpdateProduct`: Now accepts `FormData` instead of `Partial<Product>`
- Both hooks handle multipart form data for file uploads

### 4. API Routes Enhanced

#### `POST /api/products`
- Added to handle product creation
- Handles FormData including file uploads
- Validates required fields

#### `PUT /api/products/[id]`
- Added to handle product updates
- Handles FormData including optional file uploads
- Only updates provided fields

## Usage Examples

### Creating a New Product
```tsx
import { useCreateProduct } from '../hooks/useProductMutations';
import CreateProductForm from '../components/CreateProductForm';

export function CreateProductPage() {
  const { mutate: createProduct, isPending, error } = useCreateProduct();

  const handleCreateProduct = (formData: FormData) => {
    formData.append('userId', getCurrentUserId());
    createProduct(formData);
  };

  return (
    <CreateProductForm
      onSubmit={handleCreateProduct}
      isPending={isPending}
      error={error}
    />
  );
}
```

### Editing an Existing Product
```tsx
import { useUpdateProduct } from '../hooks/useProductMutations';
import EditProductForm from '../components/EditProductForm';

export function EditProductModal({ product, onClose }) {
  const { mutate: updateProduct, isPending, error } = useUpdateProduct();

  const handleUpdateProduct = (formData: FormData) => {
    updateProduct({ id: product._id, data: formData }, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <EditProductForm
      product={product}
      onSubmit={handleUpdateProduct}
      isPending={isPending}
      error={error}
    />
  );
}
```

## Migration Guide

### From Old ProductForm to New Forms

**Before:**
```tsx
<ProductForm
  product={product}
  onSubmit={handleSubmit}
  isPending={isPending}
  error={error}
  submitButtonText="Save"
  requireImage={!product}
/>
```

**After (for creating):**
```tsx
<CreateProductForm
  onSubmit={handleSubmit}
  isPending={isPending}
  error={error}
  submitButtonText="Create Product"
/>
```

**After (for editing):**
```tsx
<EditProductForm
  product={product}
  onSubmit={handleSubmit}
  isPending={isPending}
  error={error}
  submitButtonText="Save Changes"
/>
```

## Key Benefits

1. **Clearer Intent**: Each form has a single, clear purpose
2. **Better UX**: Optimized user experience for each use case
3. **Simplified Logic**: No complex conditional rendering
4. **Better Type Safety**: More specific prop types
5. **Easier Testing**: Each form can be tested independently
6. **Maintainability**: Changes to one form don't affect the other

## File Structure
```
src/
├── components/
│   ├── CreateProductForm.tsx      # New - Create products
│   ├── EditProductForm.tsx        # New - Edit products
│   ├── ProductForm.tsx            # Deprecated wrapper
│   └── ProductFormExamples.tsx    # Usage examples
├── hooks/
│   └── useProductMutations.ts     # Updated to use FormData
└── app/api/products/
    ├── route.ts                   # Added POST method
    └── [id]/route.ts             # Added PUT method
```

## Migration Timeline
- **Phase 1**: New forms available alongside old form
- **Phase 2**: Update all imports to use specific forms
- **Phase 3**: Remove deprecated ProductForm wrapper

## Notes
- Image uploads are handled via FormData
- API routes expect multipart/form-data
- Error handling is consistent across both forms
- Both forms support all existing styling and configuration options
