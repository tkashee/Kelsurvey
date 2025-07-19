import React from 'react';
import WelcomeHeader from '@/components/WelcomeHeader';
import WelcomeHero from '@/components/WelcomeHero';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import WelcomeFooter from '@/components/WelcomeFooter';

const WelcomePage: React.FC = () => {
  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <WelcomeHeader onNavigate={handleNavigate} />
      <main>
        <WelcomeHero />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <WelcomeFooter />
    </div>
  );
};

export default WelcomePage;
