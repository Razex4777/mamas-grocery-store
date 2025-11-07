import { Mail, MapPin, Phone, ArrowRight, Clock, Facebook, Shield } from "lucide-react";
import { COMPANY_INFO, QUICK_LINKS } from "./constants";
import { useEffect, useState } from "react";
import AdminLoginModal from "../admin/AdminLoginModal";
import { fetchCategories } from "../../lib/categories";
import type { Category } from "../../lib/database.types";
import { subscribeToNewsletter } from "../../lib/newsletter";
import { useToast } from "../Toast";

export default function Footer() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Load categories from Supabase
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    // expose footer height for spacing if needed
    const el = document.getElementById("site-footer");
    if (!el) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--footer-height", `${el.offsetHeight}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscribing || !email) return;

    setIsSubscribing(true);
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      toast.success(result.message);
      setEmail(''); // Clear the input
    } else {
      toast.error(result.message);
    }
    
    setIsSubscribing(false);
  };

  return (
    <footer id="site-footer" className="relative bg-gradient-to-b from-neutral-900 to-black text-neutral-200 pt-24">
      {/* Main body */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand + blurb */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-md p-2 w-12 h-12 grid place-items-center">
                <img src="/logos/mamas-grocery-2.png" alt="Logo" className="h-8 w-auto" />
              </div>
              <div className="text-xl font-semibold tracking-wide">Mama's Grocery & Charcoal BBQ</div>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Distributeur premium d’ingrédients orientaux et internationaux. Qualité,
              régularité et logistique rapide à travers le Canada.
            </p>
            <div className="flex items-center gap-3 text-neutral-300">
              <Clock size={18} className="text-orange-400" />
              <div>
                <div>Mon–Fri: {COMPANY_INFO.hours.weekdays}</div>
                <div>Sat: {COMPANY_INFO.hours.saturday}</div>
                <div>Sun: {COMPANY_INFO.hours.sunday}</div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {COMPANY_INFO.socials.map((social, index) => (
                <Social key={index} icon={<Facebook size={16} />} href={social.href} />
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a className="group inline-flex items-center gap-2 hover:text-white transition" href={l.href}>
                    <span className="inline-block w-4 h-4 rounded-full border border-orange-500 group-hover:bg-orange-500 transition" />
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Categories */}
          <div>
            <FooterHeading>Our Categories</FooterHeading>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <a 
                    className="group inline-flex items-center gap-2 hover:text-white transition" 
                    href={`/products?category=${category.id}`}
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition">
                      <ArrowRight size={14} />
                    </span>
                    <span>{category.name}</span>
                  </a>
                </li>
              ))}
              {categories.length === 0 && (
                <li className="text-neutral-400 text-sm">Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <FooterHeading>Newsletter</FooterHeading>
            <form
              onSubmit={handleNewsletterSubscribe}
              className="space-y-3"
              aria-label="newsletter"
            >
              <div className="relative">
                <input
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                  placeholder="Your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-500 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Subscribe"
                >
                  {isSubscribing ? '...' : <ArrowRight size={18} />}
                </button>
              </div>
              <p className="text-xs text-neutral-400">
                Subscribe to get special offers & updates
              </p>
            </form>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2"><MapPin size={16} className="text-orange-400" />{COMPANY_INFO.address}</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-orange-400" />{COMPANY_INFO.email}</div>
              <div className="flex items-center gap-2"><Phone size={16} className="text-orange-400" />{COMPANY_INFO.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-neutral-400">
          <div>© All Copyright {new Date().getFullYear()} by Mama's Grocery & Charcoal BBQ</div>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-white">Terms & Condition</a>
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <button 
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-teal-400 transition-colors group"
            >
              <Shield size={14} className="group-hover:rotate-12 transition-transform" />
              Admin Access
            </button>
          </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-white text-lg font-semibold tracking-wide mb-4 relative">
      <span className="relative z-10">{children}</span>
      <span className="absolute -left-2 -bottom-1 h-2 w-10 bg-orange-600/30 rounded-full blur-sm" />
    </h4>
  );
}

function Social({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition grid place-items-center"
    >
      {icon}
    </a>
  );
}


