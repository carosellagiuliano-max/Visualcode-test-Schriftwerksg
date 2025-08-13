import React from 'react';
import Navigation from '@/components/ui/navigation';
import FloatingCTA from '@/components/ui/floating-cta';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
