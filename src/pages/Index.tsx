import React from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ContactSection from '@/components/home/ContactSection';

const Index: React.FC = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ContactSection />
    </PublicLayout>
  );
};

export default Index;
