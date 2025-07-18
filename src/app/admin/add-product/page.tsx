'use client';
import ErrorMessage from '@/components/ErrorMessage';
import { useCreateProduct } from '@/hooks/useProductMutations';
import { Button, PressEvent } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { NumberInput } from '@heroui/number-input';
import { useState } from 'react';

export default function AddProductPage() {
  const { mutate: createProduct, isPending, error } = useCreateProduct();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');
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

    if (image) {
      formData.append('image', image);
    }

    createProduct(formData, { onSuccess: () => resetForm() });
  };

  const resetForm = () => {
    setProductName('');
    setProductPrice(0);
    setProductDesc('');
    setImage(null);
  };

  return (
    <Form
      encType='multipart/form-data'
      onSubmit={handleSubmit}
      className='max-w-3xl flex flex-col gap-4 mx-auto max-h-[90vh]'>
      {error && <ErrorMessage description={error.message} />}

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
        autoComplete='off'
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
        minRows={4}
      />

      <Input
        accept='image/jpeg,image/png,image/jpg'
        disabled={isPending}
        errorMessage='An image is required'
        isRequired
        label='Image'
        labelPlacement='outside'
        name='image'
        radius='sm'
        type='file'
        variant='bordered'
        onChange={handleFileChange}
      />

      <div className='flex gap-2 w-full mt-4 justify-between md:justify-around'>
        <Button
          color='default'
          disabled={isPending}
          radius='sm'
          size='lg'
          variant='bordered'
          onPress={resetForm}>
          Reset
        </Button>
        <Button
          color='primary'
          isLoading={isPending}
          radius='sm'
          size='lg'
          type='submit'>
          {isPending ? 'Creating...' : 'Create Product'}
        </Button>
      </div>
    </Form>
  );
}
