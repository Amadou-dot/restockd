import { useUpdateProduct } from '@/hooks/useProductMutations';
import { Button } from '@heroui/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import { IoCreateOutline } from 'react-icons/io5';
import type { Product } from '../../types/Product';
import EditProductForm from '../EditProductForm';

export default function EditProductBtn({ product }: { product: Product }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: updateProduct, isPending, error } = useUpdateProduct();

  const handleEditProduct = (formData: FormData) => {
    updateProduct(
      { id: product._id, data: formData },
      {
        onSuccess: () => {
          onOpenChange();
        },
      }
    );
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label='edit product'
        variant='light'
        onPress={onOpen}>
        <IoCreateOutline size={24} />
      </Button>

      <Modal
        isOpen={isOpen}
        placement='top-center'
        radius='sm'
        size='lg'
        onOpenChange={onOpenChange}>
        <ModalContent>
          {
            <>
              <ModalHeader>{product.name}</ModalHeader>
              <ModalBody>
                <EditProductForm
                  error={error}
                  isPending={isPending}
                  product={product}
                  showError={false}
                  submitButtonText='Save Changes'
                  onSubmit={handleEditProduct}
                />
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
}
