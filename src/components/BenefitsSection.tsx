import { Card, CardBody } from '@heroui/card';
import { FaShippingFast, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const benefits = [
  {
    icon: FaShippingFast,
    title: 'Fast Shipping',
    description:
      'Get your gear delivered in record time with our express shipping options.',
    color: 'text-blue-500',
  },
  {
    icon: FaShieldAlt,
    title: 'Secure Payment',
    description:
      'Your transactions are protected with industry-leading security standards.',
    color: 'text-green-500',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'Our expert team is available around the clock to assist you.',
    color: 'text-purple-500',
  },
];

export default function BenefitsSection() {
  return (
    <section className='py-12 px-4'>
      <h2 className='text-3xl font-bold text-center mb-10'>
        Why Shop With Us?
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {benefits.map((benefit, index) => (
          <Card key={index} className='py-4' shadow='sm'>
            <CardBody className='overflow-visible py-2 items-center text-center'>
              <benefit.icon className={`text-5xl mb-4 ${benefit.color}`} />
              <h3 className='text-xl font-bold mb-2'>{benefit.title}</h3>
              <p className='text-default-500 px-4'>{benefit.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
