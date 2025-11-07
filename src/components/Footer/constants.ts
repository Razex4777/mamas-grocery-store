export interface CompanyInfo {
  phone: string;
  email: string;
  address: string;
  hours: { weekdays: string; saturday: string; sunday: string };
  socials: { label: string; href: string }[];
}

export const COMPANY_INFO: CompanyInfo = {
  phone: "+1 (506) 544-5692",
  email: "notremarchecaroline@gmail.com",
  address: "New Brunswick · Maritimes, Canada",
  hours: {
    weekdays: "8am – 6pm",
    saturday: "8am – 12pm",
    sunday: "Closed",
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/Alsmadimoncton?locale=fr_FR" },
  ],
};

export const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export const CATEGORY_LINKS = [
  { label: "Fruits & Vegetables", href: "#category-fruits" },
  { label: "Meat & Seafood", href: "#category-meat" },
  { label: "Dairy & Eggs", href: "#category-dairy" },
  { label: "Bakery", href: "#category-bakery" },
  { label: "Snacks", href: "#category-snacks" },
];

