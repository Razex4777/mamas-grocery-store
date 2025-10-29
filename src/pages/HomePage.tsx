import HeroForm from '../components/HeroForm';
import AboutSection from '../components/AboutSection';
import ScrollFloat from '../components/animations/ScrollFloat';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import FeaturedProducts from '../components/ourproduct-components/FeaturedProducts';
import ContactForm from '../components/ContactForm';
import CategoryShowcase from '../components/CategoryShowcase';
import FAQs from '../components/faqs';

export default function HomePage() {
  return (
    <>
      {/* Hero section - full screen */}
      <ScrollFloat y={0} scaleFrom={1.02} scaleTo={1} className="will-change-transform">
        <HeroForm />
      </ScrollFloat>
      
      {/* About section - directly underneath hero */}
      <RevealOnScroll from="up">
        <AboutSection />
      </RevealOnScroll>
      
      {/* Featured Products */}
      <FeaturedProducts />

      {/* Category Showcase - Floating Transition Strip */}
      <CategoryShowcase />

      {/* FAQs */}
      <FAQs />

      {/* Contact Form */}
      <ContactForm />
    </>
  );
}
