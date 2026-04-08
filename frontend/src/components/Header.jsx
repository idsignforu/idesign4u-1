import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_3b9058a0-7844-4852-8656-1f94a27f5842/artifacts/wtv9ay46_WhatsApp%20Image%202026-03-06%20at%203.51.44%20PM-Photoroom.png";

const navLinks = [
  { name: "Home",      href: "/",          section: null },
  { name: "Services",  href: "/#services", section: "services" },
  { name: "Pricing",   href: "/#pricing",  section: "pricing" },
  { name: "Portfolio", href: "/portfolio", section: null },
  { name: "Blog",      href: "/blog",      section: null },
  { name: "Contact",   href: "/#contact",  section: "contact" },
];

export const Header = ({ scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Home");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const linkRefs = useRef({});

  // Detect active link from URL
  useEffect(() => {
    const p = location.pathname;
    const h = location.hash;
    if (p === "/" && !h) setActiveLink("Home");
    else if (p === "/portfolio") setActiveLink("Portfolio");
    else if (p.startsWith("/blog")) setActiveLink("Blog");
    else if (h === "#services") setActiveLink("Services");
    else if (h === "#pricing") setActiveLink("Pricing");
    else if (h === "#contact") setActiveLink("Contact");
    setMobileOpen(false);
  }, [location]);

  // Move pill to active link (desktop)
  useEffect(() => {
    const el = linkRefs.current[activeLink];
    const nav = navRef.current;
    if (!el || !nav) return;
    const nr = nav.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setPillStyle({ left: er.left - nr.left, width: er.width });
  }, [activeLink]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToSection = (section) => {
    if (location.pathname === "/") {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  const handleClick = (link) => {
    setActiveLink(link.name);
    setMobileOpen(false);
    if (link.section) {
      scrollToSection(link.section);
    } else if (link.href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      {/* ── MAIN HEADER ── */}
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
              className="flex-shrink-0"
              data-testid="logo"
              onClick={(e) => {
                e.preventDefault();
                handleClick({ name: "Home", href: "/", section: null });
                navigate("/");
              }}
            >
              <img
                src={LOGO_URL}
                alt="I Design 4 U"
                className="h-9 sm:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop pill nav — hidden on mobile */}
            <nav
              ref={navRef}
              className="hidden md:flex relative items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-1 py-1"
            >
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                animate={{ left: pillStyle.left, width: pillStyle.width }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                style={{ boxShadow: "0 0 16px rgba(123,47,247,0.6)" }}
              />
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.section ? "/" : link.href}
                  ref={(el) => { linkRefs.current[link.name] = el; }}
                  onClick={(e) => {
                    if (link.section || link.href === "/") e.preventDefault();
                    handleClick(link);
                  }}
                  className={`relative z-10 px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                    activeLink === link.name
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <button
              onClick={() =>
                handleClick({ name: "Contact", href: "/#contact", section: "contact" })
              }
              className="btn-neon text-xs sm:text-sm flex-shrink-0 hidden md:block"
              style={{ padding: "9px 20px", borderRadius: "9999px" }}
              data-testid="start-project-btn"
            >
              Start Project
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              aria-label="Toggle menu"
              data-testid="mobile-menu-btn"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed left-0 right-0 bottom-0 z-40 flex flex-col"
            style={{
              top: "104px",
              background: "rgba(3,0,20,0.97)",
              backdropFilter: "blur(24px)",
            }}
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  className="w-full max-w-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.section ? "/" : link.href}
                    onClick={(e) => {
                      if (link.section || link.href === "/") e.preventDefault();
                      handleClick(link);
                    }}
                    className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 ${
                      activeLink === link.name
                        ? "text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white border border-transparent hover:bg-white/5"
                    }`}
                    style={
                      activeLink === link.name
                        ? { background: "rgba(123,47,247,0.15)" }
                        : {}
                    }
                  >
                    <span>{link.name}</span>
                    {activeLink === link.name && (
                      <span
                        className="w-2 h-2 rounded-full bg-purple-400"
                        style={{ boxShadow: "0 0 8px rgba(159,91,255,0.8)" }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                className="w-full max-w-xs mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
              >
                <button
                  onClick={() =>
                    handleClick({ name: "Contact", href: "/#contact", section: "contact" })
                  }
                  className="btn-neon w-full text-base text-center"
                  style={{ padding: "14px 32px", borderRadius: "16px" }}
                >
                  Start Your Project
                </button>
              </motion.div>
            </nav>

            <p className="text-center text-gray-600 text-xs pb-8">
              iDesign4U — Premium Web Design
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
