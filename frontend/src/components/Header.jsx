import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Wrench, Tag, Briefcase, BookOpen, Mail } from "lucide-react";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_3b9058a0-7844-4852-8656-1f94a27f5842/artifacts/wtv9ay46_WhatsApp%20Image%202026-03-06%20at%203.51.44%20PM-Photoroom.png";

const navLinks = [
  { name: "Home",      href: "/",          section: null,       icon: Home },
  { name: "Services",  href: "/#services", section: "services", icon: Wrench },
  { name: "Pricing",   href: "/#pricing",  section: "pricing",  icon: Tag },
  { name: "Portfolio", href: "/portfolio", section: null,       icon: Briefcase },
  { name: "Blog",      href: "/blog",      section: null,       icon: BookOpen },
  { name: "Contact",   href: "/#contact",  section: "contact",  icon: Mail },
];

export const Header = ({ scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Home");
  const [hoveredLink, setHoveredLink] = useState(null);

  // Desktop pill
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  // Mobile pill
  const mobileNavRef = useRef(null);
  const mobileLinkRefs = useRef({});
  const [mobilePillStyle, setMobilePillStyle] = useState({ left: 0, width: 0 });

  // ── Intersection Observer: update active based on which section is visible ──
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionMap = {
      services: "Services",
      pricing:  "Pricing",
      contact:  "Contact",
    };

    const observers = [];

    Object.entries(sectionMap).forEach(([id, name]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveLink(name);
        },
        { threshold: 0.15, rootMargin: "-10% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // When scrolled to top → Home
    const heroObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveLink("Home");
      },
      { threshold: 0.1 }
    );
    const heroEl = document.querySelector("[data-testid='hero-section']");
    if (heroEl) heroObs.observe(heroEl);

    return () => {
      observers.forEach(o => o.disconnect());
      heroObs.disconnect();
    };
  }, [location.pathname]);

  // ── Set active from URL on route change ──
  useEffect(() => {
    const p = location.pathname;
    const h = location.hash;
    if (p === "/portfolio") setActiveLink("Portfolio");
    else if (p.startsWith("/blog")) setActiveLink("Blog");
    else if (h === "#services") setActiveLink("Services");
    else if (h === "#pricing")  setActiveLink("Pricing");
    else if (h === "#contact")  setActiveLink("Contact");
    else if (p === "/" && !h)   setActiveLink("Home");
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

  // Mobile pill + auto scroll
  useEffect(() => {
    const el = mobileLinkRefs.current[activeLink];
    const nav = mobileNavRef.current;
    if (!el || !nav) return;
    const er = el.getBoundingClientRect();
    setMobilePillStyle({ left: el.offsetLeft, width: er.width });
    nav.scrollTo({
      left: el.offsetLeft - nav.clientWidth / 2 + er.width / 2,
      behavior: "smooth",
    });
  }, [activeLink]);

  const scrollToSection = useCallback((section) => {
    const doScroll = () => {
      const el = document.getElementById(section);
      if (el) {
        // Account for fixed header height
        const headerHeight = 120;
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    if (location.pathname === "/") {
      doScroll();
    } else {
      navigate("/");
      setTimeout(doScroll, 400);
    }
  }, [location.pathname, navigate]);

  const handleClick = useCallback((link) => {
    setActiveLink(link.name);
    if (link.section) {
      scrollToSection(link.section);
    } else if (link.href === "/") {
      if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
      else navigate("/");
    }
  }, [scrollToSection, location.pathname, navigate]);

  // Announcement bar height: 2 rows ≈ 62px
  const announcementH = 62;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-blur border-b border-purple-900/20" : ""
      }`}
      style={{ top: announcementH }}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">

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
            <img src={LOGO_URL} alt="I Design 4 U" className="h-8 sm:h-11 w-auto object-contain" />
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
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.section ? "/" : link.href}
                  ref={(el) => { linkRefs.current[link.name] = el; }}
                  onClick={(e) => {
                    if (link.section || link.href === "/") e.preventDefault();
                    handleClick(link);
                  }}
                  className={`relative z-10 flex items-center gap-1.5 px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                    activeLink === link.name ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  <Icon size={13} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => handleClick({ name: "Contact", href: "/#contact", section: "contact" })}
            className="btn-neon text-xs sm:text-sm flex-shrink-0 hidden md:block"
            style={{ padding: "9px 20px", borderRadius: "9999px" }}
            data-testid="start-project-btn"
          >
            Start Project
          </button>

          {/* Mobile Contact */}
          <button
            onClick={() => handleClick({ name: "Contact", href: "/#contact", section: "contact" })}
            className="md:hidden btn-neon text-xs flex-shrink-0"
            style={{ padding: "8px 16px", borderRadius: "9999px" }}
            data-testid="mobile-cta-btn"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Mobile icon-only pill nav */}
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
          {/* Sliding pill */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
            animate={{ left: mobilePillStyle.left, width: mobilePillStyle.width }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            style={{ boxShadow: "0 0 14px rgba(123,47,247,0.6)", pointerEvents: "none" }}
          />

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeLink === link.name;
            const isHovered = hoveredLink === link.name;

            return (
              <div key={link.name} className="relative flex-shrink-0">
                <Link
                  to={link.section ? "/" : link.href}
                  ref={(el) => { mobileLinkRefs.current[link.name] = el; }}
                  onClick={(e) => {
                    if (link.section || link.href === "/") e.preventDefault();
                    handleClick(link);
                    setHoveredLink(null);
                  }}
                  onTouchStart={() => setHoveredLink(link.name)}
                  onTouchEnd={() => setTimeout(() => setHoveredLink(null), 900)}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative z-10 flex items-center justify-center rounded-full transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  style={{ width: 44, height: 36 }}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  <Icon size={16} />
                </Link>

                {/* Floating label tooltip */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.88 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.88 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: isActive
                          ? "linear-gradient(135deg,#7B2FF7,#9F5BFF)"
                          : "rgba(18,8,36,0.96)",
                        border: "1px solid rgba(123,47,247,0.4)",
                        borderRadius: 8,
                        padding: "4px 10px",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#fff",
                        whiteSpace: "nowrap",
                        zIndex: 100,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                        pointerEvents: "none",
                      }}
                    >
                      {link.name}
                      <div style={{
                        position: "absolute", bottom: -5, left: "50%",
                        transform: "translateX(-50%)",
                        width: 8, height: 5,
                        background: isActive ? "#9F5BFF" : "rgba(18,8,36,0.96)",
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
};
