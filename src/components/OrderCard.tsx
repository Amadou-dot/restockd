import { Button } from '@heroui/button';
import { OrderDocument } from '../types/Order';

export default function OrderCard({ order }: { order: OrderDocument }) {
  const { data: invoiceData } = {data: { invoiceUrl: 'https://example.com/invoice.pdf' }}; // Mocked invoice data

  const handleInvoiceDownload = () => {
    if (invoiceData?.invoiceUrl) {
      window.open(invoiceData.invoiceUrl, '_blank');
    }
  };

  return (
    <div className='border p-4 rounded-lg w-full max-w-md'>
      <h2 className='text-xl font-semibold'>
        Order ID: {order._id.toString()}
      </h2>
      <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
      <p>Items:</p>
      <ul>
        {order.items.map(item => (
          <li key={item.productId.toString()} className='ml-4'>
            {item.quantity} x {item.productName} ($
            {item.productPrice.toFixed(2)})
          </li>
        ))}
      </ul>

      <div className='mt-4 w-full flex justify-end'>
        <Button
          color='primary'
          disabled={!invoiceData?.invoiceUrl}
          radius='sm'
          size='sm'
          onPress={handleInvoiceDownload}>
          {invoiceData?.invoiceUrl ? 'View Invoice' : 'Generating Invoice...'}
        </Button>
      </div>
    </div>
  );
}
