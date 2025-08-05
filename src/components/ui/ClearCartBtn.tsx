import { Button } from '@heroui/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import { FaTrash } from 'react-icons/fa6';
export default function ClearCartBtn() {
  const { isOpen, onOpen, onOpenChange: toggleOpenState } = useDisclosure();
  const onClearCart = async () => {
    // const user = await getUser();
    // if (!user) {
    //   console.error('User not found');
    //   return;
    // }
    // user.clearCart();
    toggleOpenState();
  };
  return (
    <>
      <Button
        color='danger'
        radius='sm'
        size='lg'
        startContent={<FaTrash />}
        variant='ghost'
        onPress={onOpen}>
        Clear cart
      </Button>
      <Modal isOpen={isOpen} onOpenChange={toggleOpenState}>
        <ModalContent>
          <ModalHeader>
            <h2 className='text-lg font-semibold'>Clear Cart</h2>
          </ModalHeader>
          <ModalBody>
            <p className='mb-4'>Are you sure you want to clear your cart?</p>
            {/* {error && <ErrorMessage description={error.message} />} */}
            <div className='flex justify-end gap-2'>
              <Button
                color='secondary'
                // isDisabled={isPending}
                variant='light'
                onPress={toggleOpenState}>
                Cancel
              </Button>
              <Button
                color='primary'
                // isLoading={isPending}
                variant='solid'
                onPress={onClearCart}>
                Yes, clear cart
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
