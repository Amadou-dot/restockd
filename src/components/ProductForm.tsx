import type { Product } from '../types/Product';
import CreateProductForm from './CreateProductForm';
import EditProductForm from './EditProductForm';

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: FormData, target?: HTMLFormElement) => void;
  isPending?: boolean;
  error?: Error | null;
  submitButtonText?: string;
  showError?: boolean;
  className?: string;
}

/**
 * @deprecated This component is deprecated. Use CreateProductForm or EditProductForm instead.
 * This wrapper will be removed in a future version.
 */
export default function ProductForm({
  product,
  onSubmit,
  isPending = false,
  error,
  submitButtonText,
  showError = true,
  className = 'flex flex-col gap-4',
}: ProductFormProps) {
  // If product is provided, use EditProductForm
  if (product) {
    return (
      <EditProductForm
        product={product}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error}
        submitButtonText={submitButtonText}
        showError={showError}
        className={className}
      />
    );
  }

  // Otherwise, use CreateProductForm
  return (
    <CreateProductForm
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
      submitButtonText={submitButtonText}
      showError={showError}
      className={className}
    />
  );
}
