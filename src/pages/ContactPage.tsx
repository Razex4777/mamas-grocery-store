import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, Headset } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useToast } from '../components/Toast';
import { submitContactMessage } from '../lib/contact';

export default function ContactPage() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContactMessage(formData);
      
      if (result.success) {
        toast.success(result.message);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">Get in touch with us for wholesale inquiries and partnerships</p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-8" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                        Subject <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                        placeholder="Wholesale inquiry"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent resize-none"
                        placeholder="Tell us about your wholesale needs..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6" data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <a href="tel:+15065445692" className="text-gray-900 font-medium hover:text-green-700 transition-colors">
                        +1 (506) 544-5692
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href="mailto:notremarchecaroline@gmail.com" className="text-gray-900 font-medium hover:text-green-700 transition-colors break-all">
                        notremarchecaroline@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Address</p>
                      <p className="text-gray-900 font-medium">
                        New Brunswick<br />
                        Maritimes, Canada
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                <a
                  href="tel:+15065445692"
                  className="block bg-gray-900 hover:bg-gray-800 text-white rounded-lg p-4 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Get Support On Call</span>
                    <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                      <Headset className="w-5 h-5" />
                    </div>
                  </div>
                </a>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900 hover:bg-gray-800 text-white rounded-lg p-4 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Get Directions</span>
                    <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6" data-aos="fade-up" data-aos-delay="300">
                <h4 className="font-bold text-green-900 mb-3">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-800">Monday - Friday:</span>
                    <span className="font-semibold text-green-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Saturday:</span>
                    <span className="font-semibold text-green-900">8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Sunday:</span>
                    <span className="font-semibold text-green-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - you can add Google Maps iframe here) */}
      <section className="py-0">
        <div className="w-full h-[600px] bg-gray-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2802489.6788865533!2d-67.5!3d46.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0c5baa5f1ad1d%3A0xbbd0878e6844e2e!2sNew%20Brunswick%2C%20Canada!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </section>
    </>
  );
}
