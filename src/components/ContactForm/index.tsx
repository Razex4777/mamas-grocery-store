import { useState } from 'react';
import { CONTACT_FORM_BG } from './constants';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    subject: '',
    message: '',
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${CONTACT_FORM_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '800px', // Exact height to match the red form
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative flex items-center h-full">
        {/* Desktop: Red half-circle form - Mobile: Centered transparent form */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-white shadow-2xl backdrop-blur-sm
                     w-full md:w-[50vw] h-[800px]
                     md:bg-gradient-to-br md:from-rose-600/95 md:to-red-600/95
                     flex justify-center md:justify-start
                     rounded-none md:rounded-r-[400px]"
        >
          {/* Desktop only: Inner fade-to-dark border effect */}
          <div
            className="absolute inset-0 hidden md:block md:rounded-r-[400px]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />

          {/* Desktop only: Inner shadow for depth */}
          <div
            className="absolute inset-2 hidden md:block md:rounded-r-[398px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)',
            }}
          />

          <div className="relative px-4 md:px-8 lg:px-12 h-full flex flex-col justify-center z-10 w-full max-w-md mx-auto md:mx-0">
            <div className="space-y-5">
              <label className="block">
                <span className="text-sm font-medium mb-2 block">Full Name*</span>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border-0 px-3 py-3 text-black text-sm focus:ring-2 focus:ring-white/50"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Email Address*</span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border-0 px-3 py-3 text-black text-sm focus:ring-2 focus:ring-white/50"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <div className="grid grid-cols-4 gap-3">
                <label className="block">
                  <span className="text-sm font-medium mb-2 block">Code</span>
                  <select
                    className="w-full rounded-xl border-0 px-2 py-3 text-black text-sm focus:ring-2 focus:ring-white/50"
                    value={form.countryCode}
                    onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  >
                    <option value="+1">+1</option>
                    <option value="+33">+33</option>
                    <option value="+212">+212</option>
                    <option value="+213">+213</option>
                    <option value="+216">+216</option>
                    <option value="+44">+44</option>
                    <option value="+49">+49</option>
                  </select>
                </label>
                <label className="block col-span-3">
                  <span className="text-sm font-medium mb-2 block">Phone Number*</span>
                  <input
                    type="tel"
                    placeholder="123 456 7890"
                    className="w-full rounded-xl border-0 px-3 py-3 text-black text-sm focus:ring-2 focus:ring-white/50"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Subject*</span>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className="w-full rounded-xl border-0 px-3 py-3 text-black text-sm focus:ring-2 focus:ring-white/50"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Message / Description</span>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full rounded-xl border-0 px-3 py-3 text-black text-sm focus:ring-2 focus:ring-white/50 resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>

              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center gap-2 group w-full justify-center mt-6">
                SEND MESSAGE
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop only: Enhanced glow effect for half-circle */}
          <div className="absolute -inset-2 bg-gradient-to-r from-red-600/60 to-rose-600/60 blur-xl opacity-40 -z-10 hidden md:block md:rounded-r-[402px]" />

          {/* Desktop only: Additional inner glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-rose-500/30 blur opacity-50 -z-10 hidden md:block md:rounded-r-[401px]" />
        </motion.div>
      </div>
    </section>
  );
}
