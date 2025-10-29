# 🏗️ Project Structure - Mama's Grocery & Charcoal BBQ React

Complete architectural documentation for the Mama's Grocery & Charcoal BBQ React e-commerce platform.

---

## 📁 Directory Tree

```
Mamas-Grocery-react/
├── 📁 dist/                          # Production build output
│   ├── 📁 about/                     # About section assets
│   ├── 📁 assets/                    # Compiled CSS & JS bundles
│   ├── 📁 contact-form/              # Contact form assets
│   ├── 📁 faqs/                      # FAQ section assets
│   ├── 📁 featured-products/         # Product images
│   ├── 📁 hero_form/                 # Hero section assets
│   ├── 📁 logos/                     # Brand logos
│   └── 📄 index.html                 # Built HTML entry point
│
├── 📁 public/                        # Static assets (served from root)
│   ├── 📁 about/                     # About section images
│   ├── 📁 contact-form/              # Contact form backgrounds
│   ├── 📁 faqs/                      # FAQ illustrations
│   ├── 📁 featured-products/         # Product photography
│   ├── 📁 hero_form/                 # Hero backgrounds & dishes
│   ├── 📁 logos/                     # Logo variants (mamas-grocery-2.png)
│   ├── 📁 marquee/                   # Brand category icons for marquee
│   └── 📄 vite.svg                   # Vite icon
│
├── 📁 src/                           # Source code
│   ├── 📁 components/                # React components
│   │   ├── 📁 AboutSection/          # About & Origin sections
│   │   │   ├── 📁 OrientSection/     # Orient subsection
│   │   │   │   └── 📄 types.ts       # Orient types
│   │   │   ├── 📄 AboutSection.tsx   # Main about component
│   │   │   ├── 📄 AboutUsBlock.tsx   # About us content block
│   │   │   ├── 📄 OrientSection.tsx  # Orient showcase
│   │   │   ├── 📄 ScrollingMarquee.tsx # Animated text banner
│   │   │   ├── 📄 ScrollToTop.tsx    # Scroll-to-top button
│   │   │   ├── 📄 SpecialOffers.tsx  # Offers display
│   │   │   ├── 📄 constants.ts       # Section constants
│   │   │   ├── 📄 types.ts           # Section types
│   │   │   └── 📄 index.tsx          # Barrel export
│   │   │
│   │   ├── 📁 animations/            # Reusable animation components
│   │   │   ├── 📄 RevealOnScroll.tsx # Scroll-triggered reveal
│   │   │   └── 📄 ScrollFloat.tsx    # Floating animation
│   │   │
│   │   ├── 📁 CategoryShowcase/      # Category showcase section
│   │   │   ├── 📄 CategoryShowcase.tsx # Main category display
│   │   │   ├── 📄 constants.ts       # Category data
│   │   │   ├── 📄 types.ts           # Category types
│   │   │   └── 📄 index.tsx          # Barrel export
│   │   │
│   │   ├── 📁 ContactForm/           # Contact form section
│   │   │   ├── 📄 constants.ts       # Form constants
│   │   │
│   │   ├── 📁 FAQsSection/            # FAQ accordion section
│   │   │   ├── 📄 FAQsSection.tsx     # Main FAQ component
│   │   │   └── 📄 index.tsx           # Barrel export
│   │   │
│   │   ├── 📁 FeaturedProducts/      # Product showcase with cart
│   │   │   ├── 📄 CartSheet.tsx      # Shopping cart sheet
│   │   │   ├── 📄 ProductCard.tsx    # Individual product card
│   │   │   ├── 📄 ProductCarousel.tsx # Product slider
│   │   │   ├── 📄 ViewProductDrawer.tsx # Product detail drawer
│   │   │   ├── 📄 constants.ts       # Product data
│   │   │   ├── 📄 types.ts           # Product types
│   │   │   ├── 📄 README.md          # Component documentation
│   │   │   └── 📄 index.tsx          # Barrel export
│   │   │
│   │   ├── 📁 Footer/                # Site footer
│   │   │   ├── 📄 constants.ts       # Footer data
│   │   │   ├── 📄 index.ts           # Barrel export (duplicate)
│   │   │   └── 📄 index.tsx          # Footer component
│   │   │
│   │   ├── 📁 ourproduct-components/  # OurProductsPage-specific components
│   │   │   ├── 📁 FeaturedProducts/   # Featured product cards & drawer
│   │   │   │   ├── 📄 ProductCard.tsx # Product card component
│   │   │   │   ├── 📄 ViewProductDrawer.tsx # Product details drawer
│   │   │   │   ├── 📄 constants.ts    # Product data
│   │   │   │   ├── 📄 types.ts        # Product types
│   │   │   │   ├── 📄 README.md      # Component documentation
│   │   │   │   └── 📄 index.tsx      # Barrel export
│   │   │   ├── 📄 FeatureTabs.tsx    # 4 feature tabs with custom SVG icons
│   │   │   ├── 📄 AnimatedMarqueeHero.tsx # Animated hero banner with scrolling images
│   │   │   ├── 📄 NewsletterSection.tsx # Newsletter subscription (MarketPro design)
│   │   │   └── 📄 BrandMarquee.tsx   # GSAP-powered infinite marquee with brand category icons
│   │   │
│   │   ├── 📄 ProductBanner.tsx      # [DEPRECATED] Old banner - replaced by AnimatedMarqueeHero
│   │   │
│   │   ├── 📁 HeroForm/              # Hero section with carousel
│   │   │   ├── 📄 HeroForm.tsx       # Main hero component
│   │   │   ├── 📄 FloatingShapes.tsx # Animated background shapes
│   │   │   ├── 📄 NavigationControls.tsx # Carousel controls
│   │   │   ├── 📄 SlideContent.tsx   # Individual slide content
│   │   │   ├── 📄 constants.ts       # Hero data
│   │   │   ├── 📄 types.ts           # Hero types
│   │   │   └── 📄 index.tsx          # Barrel export
│   │   │
│   │   ├── 📁 Testimonials/          # Testimonials section (empty)
│   │   │
│   │   ├── 📄 FullNavbar.tsx         # Main home navigation component
│   │   └── 📄 ShopNavbar.tsx         # Shop page navigation (marketpro-style)
│   │
│   ├── 📁 types/                     # Shared TypeScript types & declarations
│   │   ├── 📄 products.d.ts          # Featured product typings
│   │   └── 📄 aos.d.ts               # Module declaration for AOS library
│   │
│   ├── 📁 pages/                     # Page components
│   │   ├── 📄 HomePage.tsx           # Home page with all sections
│   │   └── 📄 OurProductsPage.tsx    # Our Products page
│   │
│   ├── 📁 assets/                    # React assets
│   │   └── 📄 react.svg              # React logo
│   │
│   ├── 📄 App.tsx                    # Main app with routing
│   ├── 📄 App.css                    # App-specific styles
│   ├── 📄 index.css                  # Global styles & Tailwind directives
│   ├── 📄 main.tsx                   # React entry point with BrowserRouter
│   └── 📄 vite-env.d.ts             # Vite TypeScript definitions
│
├── 📁 docs/                          # 📚 Project documentation
│   ├── 📄 changelog.md               # Historical change log
│   └── 📄 project_structure.md       # This file - architectural overview
│
├── 📁 node_modules/                  # Dependencies (not tracked)
│
├── 📁 templates/                     # Archived UI templates and design references (ignored in git)
│
├── 📄 index.html                     # HTML entry point
├── 📄 package.json                   # NPM dependencies & scripts
├── 📄 package-lock.json              # Locked dependency versions
├── 📄 README.md                      # Project readme
│
├── 📄 vite.config.ts                 # Vite configuration
├── 📄 tsconfig.json                  # TypeScript base config
├── 📄 tsconfig.app.json              # App-specific TypeScript config
├── 📄 tsconfig.node.json             # Node-specific TypeScript config
│
├── 📄 tailwind.config.js             # Tailwind CSS configuration
├── 📄 tailwind.config.cjs            # Tailwind CommonJS variant
├── 📄 postcss.config.js              # PostCSS configuration
└── 📄 eslint.config.js               # ESLint flat config
```

---

## 🎯 Application Architecture

### **Routing Structure** (`src/App.tsx`)
The application uses React Router for navigation:
- **Route: `/`** - HomePage with FullNavbar
- **Route: `/products`** - OurProductsPage with FullNavbar
- Conditional navbar rendering based on route
- Conditional footer rendering (hidden on products page)

### **Homepage Composition** (`src/pages/HomePage.tsx`)
The homepage renders components in this order:
1. `HeroForm` - Hero carousel with floating shapes
2. `AboutSection` - About us & origins
3. `FeaturedProducts` - Product showcase with cart
4. `CategoryShowcase` - Category grid
5. `FAQs` - Accordion FAQ section
6. `ContactForm` - Contact form with background

### **Our Products Page Composition** (`src/pages/OurProductsPage.tsx`)
The products page includes:
1. Feature tabs - 4 feature highlights with custom SVG icons (orange background)
2. Animated Marquee Hero - Modern banner with scrolling grocery images and animations
3. Search bar - Ekomart-style with category dropdown and search input
4. Page header - "Our Products" title and description
5. Filter bar - All, New, Popular, Discounts, Organic
6. Product grid - 4-column responsive grid
7. Pagination - Previous/Next with page numbers
8. Product drawers - ViewProductDrawer and CartSheet

### **Component Organization**
- Components live under `src/components/<ComponentName>/`
- Barrel exports via `index.tsx` re-export the main component
- Types defined in `types.ts`, constants in `constants.ts`
- Self-contained folders include all related logic and styling

---

## 🎨 Styling System

### **Tailwind Configuration**
- **Config files**: `tailwind.config.js`, `tailwind.config.cjs`
- **Global utilities**: Defined in `src/index.css`
- **Custom classes**: `animate-slide-in-left`, `animate-fade-in`, `no-scrollbar`, `featured-bg`, `featured-grid`, `carousel-progress-bar`, `float-x`, `float-y`, `rotate-360`, `text-shadow`, `text-shadow-lg`

### **CSS Variables**
- `--navbar-height`: Set by `FullNavbar.tsx`, used for layout padding
- `--footer-height`: Set by `Footer/index.tsx` via ResizeObserver

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build & dev server configuration |
| `tsconfig.json` | Base TypeScript compiler options |
| `tsconfig.app.json` | App-specific TypeScript settings (strict mode) |
| `tsconfig.node.json` | Node/Vite-specific TypeScript settings |
| `eslint.config.js` | ESLint flat config for code linting |
| `postcss.config.js` | PostCSS configuration for Tailwind |
| `tailwind.config.js` | Tailwind CSS customization |

---

## 📦 Static Assets

### **Asset Organization**
- **Public folder**: Assets served from root at runtime
- **Reference pattern**: Use absolute paths like `/logos/logo2.png`
- **Asset categories**:
  - `/logos/` - Brand logos (mamas-grocery-2.png)
  - `/about/` - About section imagery (flags, baskets, maps)
  - `/hero_form/` - Hero backgrounds and food photography
  - `/featured-products/` - Product images
  - `/faqs/` - FAQ illustrations
  - `/contact-form/` - Contact backgrounds
  - `/marquee/` - Brand category icons (10 PNG icons for marquee animation)

### **Build Output**
- **Dist folder**: Production build artifacts
- Vite bundles CSS/JS into `/dist/assets/`
- Static assets copied to `/dist/` preserving structure

---

## 🧩 Component Patterns

### **Barrel Exports**
Components with dedicated folders use barrel exports:
- `index.tsx` imports and re-exports the main component
- `types.ts` exports prop interfaces
- `constants.ts` exports data and configuration

**Example**:
```typescript
// src/components/HeroForm/index.tsx
export { default } from './HeroForm';
export * from './types';
```

### **Animation Components**
Reusable animation wrappers in `src/components/animations/`:
- `RevealOnScroll.tsx` - Scroll-triggered reveal animations
- `ScrollFloat.tsx` - Floating animation effects

### **Type-Safe Props**
All components define prop interfaces in `types.ts`:
```typescript
export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}
```

---

## 🛠️ Development Tools

### **Build System**
- **Bundler**: Vite
- **Package manager**: npm
- **Hot reload**: Vite dev server with HMR

### **Code Quality**
- **Linting**: ESLint with flat config
- **Type checking**: TypeScript strict mode
- **Styling**: Tailwind CSS with PostCSS

### **Scripts** (from `package.json`)
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 📱 Responsive Design

The application implements responsive design principles:
- Mobile-first approach with Tailwind breakpoints
- Flexible layouts adapt to all screen sizes
- Touch-friendly interfaces for mobile devices
- Consistent experience across devices

---

## 🔄 State Management

### **Global Events**
- Cart interactions managed via custom events
- Product view/add actions communicated app-wide
- Event-driven architecture for UI updates

### **Local State**
- Component-level state with React hooks
- Props drilling for parent-child communication
- No global state library (Redux/Zustand) currently implemented

---

## 📋 Key Features

1. **Hero Carousel**: Multi-slide hero with animated transitions
2. **Product Showcase**: Featured products with cart functionality
3. **Category Grid**: Visual category navigation
4. **FAQ Accordion**: Expandable question/answer section
5. **Contact Form**: Contact submission with background imagery
6. **Responsive Navigation**: Full navbar with mobile adaptation
7. **Scroll Animations**: Reveal-on-scroll and floating effects

---

## 🚀 Future Considerations

- Consider splitting large components if they exceed 400 lines
- Add `Testimonials` component implementation (folder exists but empty)
- Implement `ContactTitle` component (folder exists but empty)
- Remove duplicate `Footer/index.ts` file (keep only `index.tsx`)
- Consider state management library for complex cart logic

---

**Last Updated**: 2025-10-29 10:30
**Project Type**: React + TypeScript + Vite + Tailwind CSS + React Router
**Status**: Active Development
