import { OrderDocument } from '@/types/Order';
import { User } from '@/types/User';
import jsPDF from 'jspdf';

export interface InvoiceData {
  order: OrderDocument;
  user: User;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

export function generateInvoicePDF(data: InvoiceData): Buffer {
  const { order, user, companyInfo } = data;

  // Create new PDF document
  const doc = new jsPDF();

  // Set font
  doc.setFont('helvetica');

  // Header
  doc.setFontSize(24);
  doc.setTextColor(40);
  doc.text('INVOICE', 20, 30);

  // Company info
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(companyInfo.name, 120, 30);
  doc.text(companyInfo.address, 120, 40);
  doc.text(companyInfo.phone, 120, 50);
  doc.text(companyInfo.email, 120, 60);

  // Invoice details
  doc.setTextColor(40);
  doc.text(`Invoice #: ${order._id}`, 20, 70);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 80);
  doc.text(`Status: ${(order.status || 'completed').toUpperCase()}`, 20, 90);

  // Customer info
  doc.text('Bill To:', 20, 110);
  if (user.firstName && user.lastName) {
    doc.text(`${user.firstName} ${user.lastName}`, 20, 120);
  }
  doc.text(user.email, 20, 130);

  // Table header
  const startY = 150;
  doc.setFillColor(240, 240, 240);
  doc.rect(20, startY, 170, 10, 'F');

  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.text('Item', 25, startY + 7);
  doc.text('Qty', 120, startY + 7);
  doc.text('Price', 140, startY + 7);
  doc.text('Total', 165, startY + 7);

  // Table content
  let currentY = startY + 20;
  let subtotal = 0;

  order.items.forEach((item, index) => {
    const itemTotal = item.quantity * item.productPrice;
    subtotal += itemTotal;

    doc.setTextColor(40);
    doc.text(item.productName, 25, currentY);
    doc.text(item.quantity.toString(), 125, currentY);
    doc.text(`$${item.productPrice.toFixed(2)}`, 140, currentY);
    doc.text(`$${itemTotal.toFixed(2)}`, 165, currentY);

    currentY += 10;

    // Add line separator
    if (index < order.items.length - 1) {
      doc.setDrawColor(200);
      doc.line(20, currentY - 5, 190, currentY - 5);
    }
  });

  // Totals section
  currentY += 10;
  doc.setDrawColor(0);
  doc.line(140, currentY, 190, currentY);

  currentY += 10;
  doc.setFontSize(12);
  doc.text('Subtotal:', 140, currentY);
  doc.text(`$${subtotal.toFixed(2)}`, 165, currentY);

  currentY += 10;
  const tax = subtotal * 0.08; // 8% tax
  doc.text('Tax (8%):', 140, currentY);
  doc.text(`$${tax.toFixed(2)}`, 165, currentY);

  currentY += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', 140, currentY);
  doc.text(`$${order.totalPrice.toFixed(2)}`, 165, currentY);

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Thank you for your business!', 20, 270);
  doc.text('If you have any questions, please contact us.', 20, 280);

  // Convert to buffer
  const pdfOutput = doc.output('arraybuffer');
  return Buffer.from(pdfOutput);
}

export function generateInvoiceFilename(orderId: string): string {
  return `invoice-${orderId}-${Date.now()}.pdf`;
}
