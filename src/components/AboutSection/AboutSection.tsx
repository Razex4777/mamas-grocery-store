<<<<<<< HEAD
import React from 'react';
import type { AboutSectionProps } from './types';
import SpecialOffers from './SpecialOffers';
import AboutUsBlock from './AboutUsBlock';
import ScrollingMarquee from './ScrollingMarquee';
import ScrollToTop from './ScrollToTop';

const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Part 1: Special Offers Grid */}
      <SpecialOffers />

      {/* Part 2: About Us Block */}
      <AboutUsBlock />

      {/* Part 3: Scrolling Text Marquee */}
      <ScrollingMarquee />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

=======
import React from 'react';
import type { AboutSectionProps } from './types';
import SpecialOffers from './SpecialOffers';
import AboutUsBlock from './AboutUsBlock';
import ScrollingMarquee from './ScrollingMarquee';
import ScrollToTop from './ScrollToTop';

const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Part 1: Special Offers Grid */}
      <SpecialOffers />

      {/* Part 2: About Us Block */}
      <AboutUsBlock />

      {/* Part 3: Scrolling Text Marquee */}
      <ScrollingMarquee />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

>>>>>>> f364477e1bf411dd22665f5070bbf41d1f473208
export default AboutSection;