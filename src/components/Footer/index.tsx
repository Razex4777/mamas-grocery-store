import { Mail, MapPin, Phone, ArrowRight, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { COMPANY_INFO, CATEGORY_LINKS, QUICK_LINKS } from "./constants";
// framer-motion not used after removing back-to-top
import { useEffect } from "react";

export default function Footer() {
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

  return (
    <footer id="site-footer" className="relative bg-gradient-to-b from-neutral-900 to-black text-neutral-200">
      {/* Floating CTA strip (moved down for spacing) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="pt-10 pb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <InfoPill icon={<MapPin size={18} />} title="Address" value={COMPANY_INFO.address} />
            <InfoPill icon={<Mail size={18} />} title="Email" value={COMPANY_INFO.email} />
            <InfoPill icon={<Phone size={18} />} title="Call" value={COMPANY_INFO.phone} />
          </div>
        </div>
      </div>

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
              <Social icon={<Facebook size={16} />} />
              <Social icon={<Instagram size={16} />} />
              <Social icon={<Twitter size={16} />} />
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
              {CATEGORY_LINKS.map((l) => (
                <li key={l.label}>
                  <a className="group inline-flex items-center gap-2 hover:text-white transition" href={l.href}>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition">
                      <ArrowRight size={14} />
                    </span>
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3"
              aria-label="newsletter"
            >
              <div className="relative">
                <input
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your email"
                  type="email"
                  required
                />
                <button
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-500 active:scale-95 transition"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              <label className="flex items-center gap-2 text-xs text-neutral-400">
                <input type="checkbox" className="accent-orange-500" /> I agree to the
                <a href="#privacy" className="underline decoration-dotted hover:text-white">Privacy Policy</a>
              </label>
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
          </div>
        </div>
      </div>

      {/* Back to top removed per request */}
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

function InfoPill({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 text-white p-5 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center">{icon}</div>
        <div className="space-y-0.5">
          <div className="text-xs uppercase tracking-wider opacity-80">{title}</div>
          <div className="text-base font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}

function Social({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition grid place-items-center">
      {icon}
    </button>
  );
}


