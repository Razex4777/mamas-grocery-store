import React from 'react';
import { motion } from 'framer-motion';

const ABOUT_CONTENT = {
  subtitle: "ABOUT US",
  title: "The elite of oriental products at your fingertips.",
  description: "We distribute the highest quality ingredients across Canada. Our vision focuses on research to develop products that stand out in both quality and accessibility.",
  imageSrc: "/about/products-wooden-table.png",
  imageAlt: "Oriental products on wooden table with countryside background"
};

const FEATURE_BOXES = [
  {
    id: 1,
    icon: "📦",
    title: "Vast Selection",
    description: "Authentic products from Morocco, Algeria, and Tunisia."
  },
  {
    id: 2,
    icon: "🚛",
    title: "Efficient Distribution",
    description: "We ensure reliable and fast logistics across Canada."
  }
];

const MARQUEE_ITEMS = [
  "MOROCCAN PRODUCTS",
  "ALGERIAN SPECIALTIES",
  "TUNISIAN DELIGHTS",
  "ORIENTAL SPICES",
  "AUTHENTIC PRESERVES",
  "TRADITIONAL PASTRIES",
  "TEAS & INFUSIONS"
];

const AboutUsSection: React.FC = () => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      {/* About Us Block */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Mobile Layout */}
        <div className="block md:hidden px-6 py-8 space-y-6">
          <motion.div
            className="text-left"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.6 }
            }}
            viewport={{ once: true }}
          >
            <h3 className="text-orange-500 font-bold text-sm uppercase tracking-wider">
              {ABOUT_CONTENT.subtitle}
            </h3>
          </motion.div>

          <motion.div
            className="relative w-full max-w-md mx-auto h-48 overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
            viewport={{ once: true }}
          >
            <img
              src={ABOUT_CONTENT.imageSrc}
              alt={ABOUT_CONTENT.imageAlt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-gray-900 leading-tight text-left px-2"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.2, duration: 0.6 }
            }}
            viewport={{ once: true }}
          >
            {ABOUT_CONTENT.title}
          </motion.h2>

          <motion.p
            className="text-gray-600 text-base leading-relaxed text-left px-2"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.3, duration: 0.6 }
            }}
            viewport={{ once: true }}
          >
            {ABOUT_CONTENT.description}
          </motion.p>

          <div className="space-y-4 px-2 mt-8">
            {FEATURE_BOXES.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: index * 0.2, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                <div className="text-2xl mb-3 text-left">{feature.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 text-left">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-left text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-center">
            <motion.div
              className="relative w-1/2 lg:w-1/2"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div
                  className="relative w-full h-96 lg:h-[500px] overflow-hidden"
                  style={{
                    clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
                  }}
                >
                  <motion.img
                    src={ABOUT_CONTENT.imageSrc}
                    alt={ABOUT_CONTENT.imageAlt}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{
                      scale: 1,
                      transition: { duration: 1, ease: "easeOut" }
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-1/2 lg:w-1/2 px-8 lg:px-16 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
                <h3 className="text-red-600 font-bold text-lg uppercase tracking-wider">
                  {ABOUT_CONTENT.subtitle}
                </h3>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {ABOUT_CONTENT.title}
              </motion.h2>

              <motion.p
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {ABOUT_CONTENT.description}
              </motion.p>

              <motion.div
                className="flex items-start gap-8 pt-8"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {FEATURE_BOXES.map((feature, index) => (
                  <React.Fragment key={feature.id}>
                    <motion.div
                      className="flex-1 space-y-4"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>

                    {index === 0 && (
                      <div className="w-px bg-gray-300 self-stretch mx-4" />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <section className="py-8 bg-gray-900 overflow-hidden">
        <div className="relative overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: [0, -100 * MARQUEE_ITEMS.length + '%']
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedItems.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                className="inline-flex items-center mx-8 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="text-3xl sm:text-5xl lg:text-8xl font-bold text-white uppercase tracking-wider group-hover:text-red-600 transition-colors duration-300 relative"
                  whileHover={{
                    textShadow: "0 0 20px rgba(220, 38, 38, 0.5)"
                  }}
                >
                  {item}

                  {/* Animated Underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-2 bg-red-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{
                      scaleX: 1,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    style={{ width: '100%' }}
                  />
                </motion.span>

                {/* Separator Dot */}
                <motion.div
                  className="w-4 h-4 bg-red-600 rounded-full mx-8 opacity-60"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays for Fade Effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
        </div>
      </section>
    </>
  );
};

export default AboutUsSection;
