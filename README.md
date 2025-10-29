# Mama's Grocery & Charcoal BBQ – React Storefront

<!-- Last deployment: 2025-10-29 -->

<p align="center">
  <img src="/logos/logo2.png" alt="Mama's Grocery Logo" width="160" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite%20%2B%20React%20%2B%20TS-1b1b38?style=for-the-badge&logo=vite&logoColor=ffd62e&labelColor=282B43" alt="Vite + React + TS Badge" />
</p>

## Tech Stack Badge

The **"Vite + React + TS"** badge highlights the core technology powering the storefront experience:

- **Vite** delivers lightning-fast dev tooling and optimized production builds.
- **React** enables modular UI composition for the hero, product, FAQ, and contact sections.
- **TypeScript** keeps the component library type-safe and predictable as the catalogue grows.

## Overview

Mama's Grocery & Charcoal BBQ is a modern React + Tailwind storefront showcasing wholesale grocery and catering products. The application features an animated hero section, product drawers with cart interactions, marquee brand showcases, and a responsive navigation system with dynamic scroll behavior.

## Key Features

- Home page with animated hero, origin story, featured products, categories, FAQs, and contact form.
- Dedicated products page with search, filters, GSAP-powered marquees, and drawer-based product details.
- Reusable animation wrappers (`RevealOnScroll`, `ScrollFloat`) and Tailwind utility classes for motion and layout.
- Comprehensive documentation in `docs/` with architecture and change history.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to view the storefront locally. The dev server supports hot-module replacement for rapid UI updates.

## Available Scripts

- `npm run dev` – Start the Vite development server.
- `npm run build` – Create an optimized production build in `dist/`.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint with the TypeScript-aware configuration.

## Project Structure

Refer to `docs/project_structure.md` for a full, continuously updated architectural breakdown covering components, pages, assets, and configuration files.
