# FeaturedProducts Component

This section showcases five featured products with a premium, minimalist card design.

Structure:
- `types.ts`: Type definitions for products
- `constants.ts`: Example product data (mapped to existing public assets)
- `ProductCard.tsx`: Card UI with floating media, rotating ambient shape, and hover CTA expansion
- `index.tsx`: Section wrapper with title and responsive grid

Styling & Animations:
- Uses Tailwind utility classes
- Ambient rotating background relies on `.rotate-slow` and `.rotate-slow-fast` keyframes declared in `src/index.css`

Integration:
- Import `FeaturedProducts` and place it after the About section in `App.tsx`.





