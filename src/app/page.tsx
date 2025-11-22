import BenefitsSection from '@/components/BenefitsSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import HeroSection from '@/components/HeroSection';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className='min-h-screen gap-10 flex flex-col pb-10'>
      <HeroSection />
      <FeaturedProducts />
      <BenefitsSection />
    </div>
  );
}
