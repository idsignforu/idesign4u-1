import { Link } from "react-router-dom";
import { Mail, MapPin, Instagram, MessageCircle, Globe } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_3b9058a0-7844-4852-8656-1f94a27f5842/artifacts/wtv9ay46_WhatsApp%20Image%202026-03-06%20at%203.51.44%20PM-Photoroom.png";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

const services = [
  "Business Websites",
  "E-Commerce Websites",
  "Landing Pages",
  "Portfolio Websites",
  "Website Redesign",
  "SEO Optimization",
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-900/20 bg-[#0a0318]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={LOGO_URL}
                alt="I Design 4 U"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium Web Design Studio crafting modern, high-performance websites for businesses worldwide.
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-400">
              <Globe className="w-4 h-4" />
              <span>Serving Clients Worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@idesign4u.in"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  hello@idesign4u.in
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919281410305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  +91 92814 10305
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/i_design4.u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  @i_design4.u
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Hyderabad, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-purple-900/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} I Design 4 U. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Premium Web Design Studio • Serving Clients Worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
