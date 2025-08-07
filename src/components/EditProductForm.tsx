import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { NumberInput } from '@heroui/number-input';
import { useState } from 'react';
import type { Product } from '../types/Product';
import ErrorMessage from './ErrorMessage';

interface EditProductFormProps {
  product: Product;
  onSubmit: (formData: FormData) => void;
  isPending?: boolean;
  error?: Error | null;
  submitButtonText?: string;
  showError?: boolean;
  className?: string;
}

export default function EditProductForm({
  product,
  onSubmit,
  isPending = false,
  error,
  submitButtonText = 'Save Changes',
  showError = true,
  className = 'flex flex-col gap-4',
}: EditProductFormProps) {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDesc, setProductDesc] = useState(product.description);
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice.toString());
    formData.append('description', productDesc);
    formData.append('_id', product._id);
    formData.append('userId', product.userId);

    // Only append image if a new one is selected
    if (image) {
      formData.append('image', image);
    }

    onSubmit(formData);
  };

  return (
    <Form
      className={className}
      encType='multipart/form-data'
      onSubmit={handleSubmit}>
      {showError && error && <ErrorMessage description={error.message} />}

      <Input
        autoFocus
        isRequired
        disabled={isPending}
        errorMessage='Product name is required'
        label='Product Name'
        labelPlacement='outside'
        name='productName'
        radius='sm'
        value={productName}
        variant='bordered'
        onValueChange={setProductName}
      />

      <NumberInput
        hideStepper
        isRequired
        disabled={isPending}
        errorMessage='Product price is required and must be a number'
        isInvalid={isNaN(productPrice)}
        label='Product Price'
        labelPlacement='outside'
        minValue={0}
        name='productPrice'
        radius='sm'
        value={productPrice}
        variant='bordered'
        startContent={
          <span className='text-gray-500 pointer-events-none'>$</span>
        }
        onValueChange={setProductPrice}
      />

      <Textarea
        isRequired
        disabled={isPending}
        errorMessage='Product description is required'
        label='Product Description'
        labelPlacement='outside'
        name='productDesc'
        radius='sm'
        rows={4}
        value={productDesc}
        variant='bordered'
        onValueChange={setProductDesc}
      />

      <Input
        accept='image/jpeg,image/png,image/jpg'
        disabled={isPending}
        label='Image (optional - leave empty to keep current image)'
        labelPlacement='outside'
        name='image'
        radius='sm'
        type='file'
        variant='bordered'
        onChange={handleFileChange}
      />

      <Button
        className='self-end'
        color='primary'
        isLoading={isPending}
        radius='sm'
        size='lg'
        type='submit'>
        {submitButtonText}
      </Button>
    </Form>
  );
}
