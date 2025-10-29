<<<<<<< HEAD
import { FAQ_ITEMS } from "../faqs/constants";
import { CATEGORIES } from "../CategoryShowcase/constants";

export interface CompanyInfo {
  phone: string;
  email: string;
  address: string;
  hours: { weekdays: string; saturday: string; sunday: string };
  socials: { label: string; href: string }[];
}

const extractFromFaqs = () => {
  const text = FAQ_ITEMS.map((f) => f.answer).join(" \n ");
  const phoneMatch = text.match(/\+?[0-9][0-9\s()\-]{6,}/);
  const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

  // Infer a broad address/region from the delivery FAQ if present
  const hasMaritimes = /Maritimes|Nouveau\-Brunswick|Nouvelle\-Écosse|Prince\-Édouard|Canada/i.test(
    text
  );

  return {
    phone: phoneMatch?.[0] ?? "+1 000 000 0000",
    email: emailMatch?.[0] ?? "hello@example.com",
    address: hasMaritimes ? "New Brunswick · Maritimes, Canada" : "Canada",
  };
};

const inferred = extractFromFaqs();

export const COMPANY_INFO: CompanyInfo = {
  phone: inferred.phone,
  email: inferred.email,
  address: inferred.address,
  hours: {
    weekdays: "8am – 6pm",
    saturday: "8am – 12pm",
    sunday: "Closed",
  },
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
  ],
};

export const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Featured", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

// Use categories from CategoryShowcase instead of hardcoded menu
export const CATEGORY_LINKS = CATEGORIES.map((category) => ({
  label: category.name,
  href: `#category-${category.id}`,
}));

=======
import { FAQ_ITEMS } from "../faqs/constants";
import { CATEGORIES } from "../CategoryShowcase/constants";

export interface CompanyInfo {
  phone: string;
  email: string;
  address: string;
  hours: { weekdays: string; saturday: string; sunday: string };
  socials: { label: string; href: string }[];
}

const extractFromFaqs = () => {
  const text = FAQ_ITEMS.map((f) => f.answer).join(" \n ");
  const phoneMatch = text.match(/\+?[0-9][0-9\s()\-]{6,}/);
  const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

  // Infer a broad address/region from the delivery FAQ if present
  const hasMaritimes = /Maritimes|Nouveau\-Brunswick|Nouvelle\-Écosse|Prince\-Édouard|Canada/i.test(
    text
  );

  return {
    phone: phoneMatch?.[0] ?? "+1 000 000 0000",
    email: emailMatch?.[0] ?? "hello@example.com",
    address: hasMaritimes ? "New Brunswick · Maritimes, Canada" : "Canada",
  };
};

const inferred = extractFromFaqs();

export const COMPANY_INFO: CompanyInfo = {
  phone: inferred.phone,
  email: inferred.email,
  address: inferred.address,
  hours: {
    weekdays: "8am – 6pm",
    saturday: "8am – 12pm",
    sunday: "Closed",
  },
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
  ],
};

export const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Featured", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

// Use categories from CategoryShowcase instead of hardcoded menu
export const CATEGORY_LINKS = CATEGORIES.map((category) => ({
  label: category.name,
  href: `#category-${category.id}`,
}));

>>>>>>> f364477e1bf411dd22665f5070bbf41d1f473208
