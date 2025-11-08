import { COMPANY_INFO } from './Footer/constants';

export default function ContactTabs() {
  return (
    <div className="relative z-10 -mt-12 md:-mt-16 -mb-8 md:-mb-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          <ContactTab
            imgSrc="/icons/contact/location_pin_marker.svg"
            title="ADDRESS"
            value={COMPANY_INFO.address}
          />
          <ContactTab
            imgSrc="/icons/contact/envelope_mail_letter.svg"
            title="EMAIL"
            value={COMPANY_INFO.email}
          />
          <ContactTab
            imgSrc="/icons/contact/phone_call_handset.svg"
            title="CALL"
            value={COMPANY_INFO.phone}
          />
        </div>
      </div>
    </div>
  );
}

function ContactTab({ imgSrc, title, value }: { imgSrc: string; title: string; value: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white text-neutral-900 p-3 md:p-5 shadow-2xl hover:shadow-xl transition-all duration-300 ring-1 ring-neutral-200">
      {/* Background pattern - only visible on hover through red overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage: 'url(/images/contact-tabs-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Red overlay on hover with opacity to show background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

      <div className="relative flex items-center gap-2.5 md:gap-4">
        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-red-500/10 group-hover:bg-white/20 grid place-items-center backdrop-blur-sm transition-colors duration-300 flex-shrink-0">
          <img src={imgSrc} alt={title} className="w-5 h-5 md:w-8 md:h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="space-y-0 md:space-y-0.5">
          <div className="text-[9px] md:text-xs uppercase tracking-wider font-semibold text-neutral-500 group-hover:text-white transition-colors duration-300">{title}</div>
          <div className="text-xs md:text-base font-semibold text-neutral-900 group-hover:text-white transition-colors duration-300 break-words">{value}</div>
        </div>
      </div>
    </div>
  );
}
