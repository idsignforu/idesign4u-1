import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_3b9058a0-7844-4852-8656-1f94a27f5842/artifacts/wtv9ay46_WhatsApp%20Image%202026-03-06%20at%203.51.44%20PM-Photoroom.png";

const navLinks = [
  { name: "Home", href: "/", section: null },
  { name: "Services", href: "/#services", section: "services" },
  { name: "Pricing", href: "/#pricing", section: "pricing" },
  { name: "Portfolio", href: "/portfolio", section: null },
  { name: "Blog", href: "/blog", section: null },
  { name: "Contact", href: "/#contact", section: "contact" },
];

export const Header = ({ scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Home");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;
    if (path === "/" && !hash) setActiveLink("Home");
    else if (path === "/portfolio") setActiveLink("Portfolio");
    else if (path === "/blog" || path.startsWith("/blog/")) setActiveLink("Blog");
    else if (hash === "#services") setActiveLink("Services");
    else if (hash === "#pricing") setActiveLink("Pricing");
    else if (hash === "#contact") setActiveLink("Contact");
  }, [location]);

  useEffect(() => {
    const activeEl = linkRefs.current[activeLink];
    if (activeEl && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setPillStyle({ left: elRect.left - navRect.left, width: elRect.width });
    }
  }, [activeLink]);

  const handleNavClick = (link) => {
    setActiveLink(link.name);
    if (link.section) {
      if (location.pathname === "/") {
        const el = document.getElementById(link.section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(link.section);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else if (link.href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-[52px] left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-blur border-b border-purple-900/20" : ""
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0"
            data-testid="logo"
            onClick={(e) => { e.preventDefault(); handleNavClick({ name: "Home", href: "/", section: null }); navigate("/"); }}
          >
            <img src={LOGO_URL} alt="I Design 4 U" className="h-9 sm:h-12 w-auto object-contain" />
          </Link>

          {/* Sliding Pill Nav */}
          <nav
            ref={navRef}
            className="relative flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-1 py-1 overflow-hidden"
          >
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
              animate={{ left: pillStyle.left, width: pillStyle.width }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              style={{ boxShadow: "0 0 15px rgba(123,47,247,0.5)" }}
            />
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.section ? "/" : link.href}
                ref={(el) => (linkRefs.current[link.name] = el)}
                onClick={(e) => {
                  if (link.section || link.href === "/") e.preventDefault();
                  handleNavClick(link);
                  if (!link.section && link.href !== "/") {}
                }}
                className={`relative z-10 px-2 sm:px-3.5 py-1.5 text-[10px] sm:text-xs lg:text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                  activeLink === link.name ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={() => handleNavClick({ name: "Contact", href: "/#contact", section: "contact" })}
            className="btn-neon text-[10px] sm:text-sm flex-shrink-0 hidden xs:block"
            style={{ padding: "8px 16px", borderRadius: "9999px" }}
            data-testid="start-project-btn"
          >
            <span className="hidden sm:inline">Start Project</span>
            <span className="sm:hidden">Hire Me</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
