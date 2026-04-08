import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Instagram, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";



const businessTypes = [
  "Small Business",
  "Startup",
  "E-Commerce",
  "Personal Brand",
  "Agency",
  "Restaurant/Cafe",
  "Gym/Fitness",
  "Salon/Spa",
  "Healthcare",
  "Education",
  "Real Estate",
  "Other",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@idesign4u.in",
    href: "mailto:hello@idesign4u.in",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+91 92814 10305",
    href: "https://wa.me/919281410305",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@i_design4.u",
    href: "https://www.instagram.com/i_design4.u",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: null,
  },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business_type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {

    await axios.post(
      "https://formspree.io/f/xpqywwjg",
      formData
    );

    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      business_type: "",
      message: "",
    });

  } catch (error) {
    console.error(error);
    toast.error("Failed to send message");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="contact" className="py-24 relative" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Start Your Project
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Ready to take your business online? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all input-glow"
                    placeholder="Your name"
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all input-glow"
                    placeholder="your@email.com"
                    data-testid="contact-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all input-glow"
                    placeholder="+91 98765 43210"
                    data-testid="contact-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Type
                  </label>
                  <select
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all input-glow appearance-none cursor-pointer"
                    data-testid="contact-business-type"
                  >
                    <option value="" className="bg-[#0F051D]">Select type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#0F051D]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all input-glow resize-none"
                  placeholder="Tell us about your project..."
                  data-testid="contact-message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="contact-submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const Content = (
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      {Content}
                    </a>
                  ) : (
                    <div key={index}>{Content}</div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Contact
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Prefer to chat directly? Reach out to us on WhatsApp for faster response.
              </p>
             <a
  href="https://wa.me/919281410305?text=Hi%2C%20I%27m%20interested%20in%20your%20web%20design%20services"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-[#25D366] hover:bg-[#20bd5a] rounded-full text-white font-medium transition-colors"
  data-testid="whatsapp-cta"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="20"
    height="20"
    fill="white"
  >
    <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.889.757 5.6 2.074 7.945L.396 32l7.84-1.63a15.89 15.89 0 007.764 1.98h.006c8.836 0 16-7.164 16-16S24.842.396 16 .396zM16 29.634c-2.56 0-5.06-.68-7.236-1.968l-.52-.308-4.65.968.99-4.533-.338-.533A13.25 13.25 0 012.75 16.4c0-7.33 5.96-13.29 13.29-13.29 3.55 0 6.88 1.38 9.39 3.89a13.2 13.2 0 013.9 9.39c0 7.33-5.96 13.29-13.29 13.29z"/>
  </svg>

  Chat on WhatsApp
</a>
            </div>

            {/* Service Area */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Service Area
              </h3>
              <p className="text-gray-400 text-sm">
                Based in <span className="text-purple-400">Hyderabad, India</span>, we serve clients worldwide. No matter where you are, we can help you build your dream website.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
