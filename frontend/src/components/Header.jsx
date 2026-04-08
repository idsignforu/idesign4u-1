import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  // Desktop pill refs
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  // Mobile pill refs
  const mobileNavRef = useRef(null);
  const mobileLinkRefs = useRef({});
  const [mobilePillStyle, setMobilePillStyle] = useState({ left: 0, width: 0 });

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
  }, [location]);

  // Desktop pill position
  useEffect(() => {
    const el = linkRefs.current[activeLink];
    const nav = navRef.current;
    if (!el || !nav) return;
    const nr = nav.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setPillStyle({ left: er.left - nr.left, width: er.width });
  }, [activeLink]);

  // Mobile pill position + auto-scroll active into view
  useEffect(() => {
    const el = mobileLinkRefs.current[activeLink];
    const nav = mobileNavRef.current;
    if (!el || !nav) return;
    const er = el.getBoundingClientRect();
    setMobilePillStyle({ left: el.offsetLeft, width: er.width });

    // Scroll active pill into center
    nav.scrollTo({
      left: el.offsetLeft - nav.clientWidth / 2 + er.width / 2,
      behavior: "smooth",
    });
  }, [activeLink]);

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

          {/* Desktop pill nav */}
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

          {/* Mobile: Contact pill button (replaces hamburger) */}
          <button
            onClick={() =>
              handleClick({ name: "Contact", href: "/#contact", section: "contact" })
            }
            className="md:hidden btn-neon text-xs flex-shrink-0"
            style={{ padding: "8px 16px", borderRadius: "9999px" }}
            data-testid="mobile-cta-btn"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Mobile scrollable pill nav row */}
      <div className="md:hidden w-full px-3 pb-2">
        <div
          ref={mobileNavRef}
          className="relative flex items-center overflow-x-auto"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9999px",
            padding: "4px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style>{`.mobile-pill-nav::-webkit-scrollbar { display: none; }`}</style>
          {/* Animated sliding pill */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
            animate={{ left: mobilePillStyle.left, width: mobilePillStyle.width }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            style={{
              boxShadow: "0 0 16px rgba(123,47,247,0.6)",
              pointerEvents: "none",
            }}
          />
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.section ? "/" : link.href}
              ref={(el) => { mobileLinkRefs.current[link.name] = el; }}
              onClick={(e) => {
                if (link.section || link.href === "/") e.preventDefault();
                handleClick(link);
              }}
              className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                activeLink === link.name
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              data-testid={`mobile-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.header>
  );
};
