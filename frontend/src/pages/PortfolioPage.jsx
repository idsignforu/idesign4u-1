import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";

// ── Projects Data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "Fitness Studio",
    subtitle: "Website",
    description: "A modern, energetic website for a premium fitness studio featuring class schedules, trainer profiles, and membership options.",
    category: "FITNESS & HEALTH",
    tags: ["UI/UX", "React", "Animation"],
    url: "https://femme-strength-club.preview.emergentagent.com/",
    accentColor: "#FF6B35",
    accentRgb: "255,107,53",
    desktopImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=390&h=844&fit=crop&crop=top&q=90",
    num: "01",
  },
  {
    id: 2,
    title: "Event Organising",
    subtitle: "Services",
    description: "Elegant website for a luxury event planning company showcasing their portfolio of high-end celebrations and corporate events.",
    category: "EVENTS & SERVICES",
    tags: ["Landing Page", "Luxury", "Booking"],
    url: "https://luxury-celebrations-2.preview.emergentagent.com/",
    accentColor: "#E4C07B",
    accentRgb: "228,192,123",
    desktopImg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=390&h=844&fit=crop&crop=top&q=90",
    num: "02",
  },
  {
    id: 3,
    title: "Real Estate",
    subtitle: "Platform",
    description: "Feature-rich real estate platform with property listings, EMI calculator, and advanced search functionality.",
    category: "REAL ESTATE",
    tags: ["Full Stack", "Calculator", "Search"],
    url: "https://approved-plots-hyd.preview.emergentagent.com/",
    accentColor: "#00C2FF",
    accentRgb: "0,194,255",
    desktopImg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=390&h=844&fit=crop&crop=top&q=90",
    num: "03",
  },
  {
    id: 4,
    title: "Car Detailing",
    subtitle: "Services",
    description: "Sleek and professional website for premium car detailing with booking system and service packages showcase.",
    category: "AUTOMOTIVE",
    tags: ["Booking", "Premium", "Services"],
    url: "https://shine-elite.preview.emergentagent.com/",
    accentColor: "#C0C0C0",
    accentRgb: "192,192,192",
    desktopImg: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=390&h=844&fit=crop&crop=top&q=90",
    num: "04",
  },
  {
    id: 5,
    title: "Interior Design",
    subtitle: "Showcase",
    description: "Modern interior design company website showcasing premium interior services and project portfolio.",
    category: "INTERIOR DESIGN",
    tags: ["Portfolio", "Gallery", "Elegant"],
    url: "https://interior.idesign4u.in/",
    accentColor: "#B08D57",
    accentRgb: "176,141,87",
    desktopImg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=390&h=844&fit=crop&crop=top&q=90",
    num: "05",
  },
  {
    id: 6,
    title: "IT Services",
    subtitle: "Technology",
    description: "Professional IT services website showcasing technology solutions, support services, and digital expertise.",
    category: "TECHNOLOGY & IT",
    tags: ["Corporate", "Tech", "SaaS"],
    url: "https://smile-tech-hub-1.preview.emergentagent.com/",
    accentColor: "#7B2FF7",
    accentRgb: "123,47,247",
    desktopImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=390&h=844&fit=crop&crop=top&q=90",
    num: "06",
  },
  {
    id: 7,
    title: "Beauty & Skincare",
    subtitle: "Brand",
    description: "Elegant beauty and skincare brand website showcasing services, products, and client experiences.",
    category: "BEAUTY & SKINCARE",
    tags: ["Brand", "Products", "Elegant"],
    url: "https://modest-elegance-24.preview.emergentagent.com/",
    accentColor: "#FF9EAA",
    accentRgb: "255,158,170",
    desktopImg: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=390&h=844&fit=crop&crop=top&q=90",
    num: "07",
  },
];

// ── Bespoke Device Mockup ─────────────────────────────────────────────────────
function DeviceMockup({ project, flipped }) {
  return (
    <div className="relative w-full" style={{ minHeight: 360 }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse at ${flipped ? "30%" : "70%"} 60%, rgba(${project.accentRgb},0.18) 0%, transparent 65%)`,
        filter: "blur(24px)",
        pointerEvents: "none",
      }} />

      {/* Laptop */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "88%", maxWidth: 480,
        marginLeft: flipped ? "auto" : 0,
        marginRight: flipped ? 0 : "auto",
        filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.75)) drop-shadow(0 0 1px rgba(255,255,255,0.05))",
      }}>
        {/* Lid */}
        <div style={{
          background: "linear-gradient(170deg,#383838 0%,#1f1f1f 55%,#2e2e2e 100%)",
          borderRadius: "14px 14px 0 0",
          padding: "10px 10px 0 10px",
          border: "1.5px solid rgba(255,255,255,0.06)",
          borderBottom: "none",
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#222", border: "1px solid #3a3a3a",
            margin: "0 auto 7px",
          }} />
          {/* Bezel + screen */}
          <div style={{ background: "#000", borderRadius: "6px 6px 0 0", overflow: "hidden" }}>
            {/* Browser bar */}
            <div style={{
              background: "#1a1a1c", padding: "6px 10px",
              display: "flex", alignItems: "center", gap: 7,
              borderBottom: "1px solid #2a2a2a",
            }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => (
                  <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <div style={{
                flex: 1, background: "#2c2c2e", borderRadius: 4,
                padding: "3px 10px", fontSize: 9, color: "#888",
                fontFamily: "monospace", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
              }}>
                🔒 {project.url.replace("https://", "")}
              </div>
            </div>
            <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
              <img src={project.desktopImg} alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
            </div>
          </div>
        </div>
        {/* Base */}
        <div style={{
          background: "linear-gradient(180deg,#2a2a2a 0%,#191919 50%,#313131 100%)",
          height: 16, borderRadius: "0 0 7px 7px",
          border: "1.5px solid rgba(255,255,255,0.05)", borderTop: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: "34%", height: 4, background: "#0f0f0f", borderRadius: "0 0 5px 5px" }} />
        </div>
        {/* Desk glow */}
        <div style={{
          height: 6, margin: "0 12px",
          background: "linear-gradient(180deg,rgba(80,80,80,0.13) 0%,transparent 100%)",
          borderRadius: "0 0 50% 50%",
        }} />
      </div>

      {/* Phone */}
      <div style={{
        position: "absolute",
        bottom: 20,
        [flipped ? "left" : "right"]: -4,
        zIndex: 10,
        filter: "drop-shadow(4px 12px 32px rgba(0,0,0,0.9))",
      }}>
        <div style={{
          width: 84,
          background: "linear-gradient(165deg,#3a3a3a 0%,#181818 60%,#282828 100%)",
          borderRadius: 22, padding: "8px 5px 10px 5px",
          border: "1.5px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}>
          {/* Buttons */}
          {[28, 46].map(t => (
            <div key={t} style={{ position: "absolute", left: -3, top: t, width: 3, height: 12, background: "#181818", borderRadius: "2px 0 0 2px" }} />
          ))}
          <div style={{ position: "absolute", right: -3, top: 32, width: 3, height: 18, background: "#181818", borderRadius: "0 2px 2px 0" }} />
          {/* Dynamic island */}
          <div style={{ width: 24, height: 7, background: "#000", borderRadius: 4, margin: "0 auto 5px" }} />
          {/* Screen */}
          <div style={{ background: "#000", borderRadius: 14, overflow: "hidden", aspectRatio: "9/19.5" }}>
            <img src={project.mobileImg} alt={`${project.title} mobile`}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
          </div>
          {/* Home bar */}
          <div style={{ width: 24, height: 3, background: "#3a3a3a", borderRadius: 2, margin: "5px auto 0" }} />
        </div>
      </div>

    </div>
  );
}

// ── Single Project Row ────────────────────────────────────────────────────────
function ProjectRow({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const flipped = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
      data-testid={`portfolio-item-${project.id}`}
    >
      {/* Thin horizontal rule */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
        marginBottom: 64,
      }} />

      <div className={`flex flex-col ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>

        {/* ── Device ── */}
        <motion.div
          className="w-full lg:w-[55%] flex-shrink-0"
          initial={{ opacity: 0, x: flipped ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <DeviceMockup project={project} flipped={flipped} />
        </motion.div>

        {/* ── Info ── */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >

          {/* Project number */}
          <div style={{
            fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(72px, 10vw, 130px)",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: `1px rgba(${project.accentRgb},0.2)`,
            userSelect: "none",
            marginBottom: -24,
            marginLeft: -4,
          }}>
            {project.num}
          </div>

          {/* Category badge */}
          <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: project.accentColor,
              boxShadow: `0 0 8px ${project.accentColor}`,
            }} />
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11, letterSpacing: "0.18em",
              color: project.accentColor,
              fontWeight: 600,
              textTransform: "uppercase",
            }}>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            color: "#fff",
            marginBottom: 8,
          }}>
            {project.title}
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{project.subtitle}</span>
          </h2>

          {/* Description */}
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 15,
            lineHeight: 1.7,
            marginBottom: 28,
            maxWidth: 400,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                background: `rgba(${project.accentRgb},0.08)`,
                border: `1px solid rgba(${project.accentRgb},0.2)`,
                color: `rgba(${project.accentRgb},0.85)`,
                borderRadius: 6,
                padding: "4px 12px",
                fontSize: 12,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`portfolio-live-preview-${project.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: `rgba(${project.accentRgb},0.1)`,
              border: `1px solid rgba(${project.accentRgb},0.35)`,
              color: project.accentColor,
              borderRadius: 10,
              padding: "13px 24px",
              fontSize: 14, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: "none",
              transition: "all 0.25s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `rgba(${project.accentRgb},0.18)`;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(${project.accentRgb},0.25)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `rgba(${project.accentRgb},0.1)`;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Eye size={16} />
            View Live Preview
            <ArrowRight size={14} style={{ opacity: 0.7 }} />
          </a>

        </motion.div>
      </div>
    </motion.article>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { num: "7+", label: "Live Projects" },
    { num: "100%", label: "Client Satisfaction" },
    { num: "5★", label: "Avg. Rating" },
    { num: "30d", label: "Avg. Delivery" },
  ];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4,1fr)",
      gap: 1,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 96,
    }}>
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
          style={{
            padding: "28px 16px", textAlign: "center",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(28px,4vw,42px)",
            fontWeight: 700, color: "#fff",
            letterSpacing: "0.02em",
          }}>{s.num}</div>
          <div style={{
            fontSize: 11, color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase", letterSpacing: "0.12em",
            marginTop: 4, fontFamily: "'DM Sans', sans-serif",
          }}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  return (
    <>
      {/* DM Sans font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Barlow+Condensed:wght@400;600;700&display=swap');
        .portfolio-marquee {
          display: flex; gap: 48px; animation: marquee 22s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="pb-32" style={{ paddingTop: "160px" }} data-testid="portfolio-page">

        {/* ── Hero Header ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div style={{ marginBottom: 56 }}>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(123,47,247,0.08)",
                border: "1px solid rgba(123,47,247,0.2)",
                borderRadius: 999, padding: "6px 16px",
                marginBottom: 24,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9F5BFF", boxShadow: "0 0 8px #9F5BFF" }} />
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#9F5BFF",
                letterSpacing: "0.16em", textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Our Work
              </span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(64px, 12vw, 120px)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                SELECTED
                <br />
                <span style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                  color: "transparent",
                }}>
                  WORK
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "clamp(14px,2vw,17px)",
                maxWidth: 520,
                lineHeight: 1.65,
                marginTop: 24,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Each project is crafted with obsessive attention to detail—
              performance optimized, pixel perfect, and built to convert.
            </motion.p>
          </div>

          {/* Stats */}
          <StatsBar />

          {/* Projects */}
          <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
            {projects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Final rule */}
          <div style={{
            height: 1, margin: "80px 0 64px",
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
          }} />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: "center",
              padding: "72px 32px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 100%, rgba(123,47,247,0.15) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />

            <p style={{
              fontSize: 11, fontWeight: 600, color: "#9F5BFF",
              letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 16,
            }}>
              Ready to join our portfolio?
            </p>

            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 700, color: "#fff",
              lineHeight: 1, marginBottom: 24,
              letterSpacing: "0.01em",
            }}>
              LET'S BUILD SOMETHING<br />
              <span style={{ color: "#9F5BFF" }}>EXTRAORDINARY</span>
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.4)", fontSize: 16, marginBottom: 40,
              fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
            }}>
              Start your project today and we'll bring your vision to life.
            </p>

            <a
              href="/#contact"
              className="btn-neon"
              data-testid="portfolio-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 40px", borderRadius: 12,
                fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, textDecoration: "none",
              }}
            >
              Start Your Project
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* ── Marquee strip ── */}
        <div style={{
          marginTop: 80, overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "18px 0",
        }}>
          <div className="portfolio-marquee">
            {[...Array(2)].map((_, ri) =>
              ["Web Design", "UI/UX", "React", "Mobile First", "SEO Ready", "Fast Delivery", "Premium Quality", "iDesign4U"].map(t => (
                <span key={`${ri}-${t}`} style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13, fontWeight: 600,
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  flexShrink: 0,
                }}>
                  {t} <span style={{ color: "rgba(123,47,247,0.5)", marginLeft: 48 }}>✦</span>
                </span>
              ))
            )}
          </div>
        </div>

      </div>
    </>
  );
}
