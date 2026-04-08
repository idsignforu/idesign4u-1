import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// ── ADD / REMOVE projects here ──────────────────────────────────────────────
// Each project needs: id, title, description, category, url,
//   desktopImg (16:10 landscape screenshot), mobileImg (9:19 portrait screenshot)
//
// Use real screenshots from your live sites for best result.
// Free screenshot tools: screenshotone.com  |  microlink.io/screenshot
// Unsplash placeholder format used below until real screenshots are available.
// ─────────────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "Fitness Studio Website",
    description: "A modern, energetic website for a premium fitness studio featuring class schedules, trainer profiles, and membership options.",
    category: "FITNESS & HEALTH",
    url: "https://femme-strength-club.preview.emergentagent.com/",
    desktopImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=390&h=844&fit=crop&crop=top&q=90",
  },
  {
    id: 2,
    title: "Event Organising Services",
    description: "Elegant website for a luxury event planning company showcasing their portfolio of high-end celebrations and corporate events.",
    category: "EVENTS & SERVICES",
    url: "https://luxury-celebrations-2.preview.emergentagent.com/",
    desktopImg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=390&h=844&fit=crop&crop=top&q=90",
  },
  {
    id: 3,
    title: "Real Estate Website",
    description: "Feature-rich real estate platform with property listings, EMI calculator, and advanced search functionality for approved plots.",
    category: "REAL ESTATE",
    url: "https://approved-plots-hyd.preview.emergentagent.com/",
    desktopImg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=390&h=844&fit=crop&crop=top&q=90",
  },
  {
    id: 4,
    title: "Car Detailing Services",
    description: "Sleek and professional website for premium car detailing services with booking system and service packages showcase.",
    category: "AUTOMOTIVE",
    url: "https://shine-elite.preview.emergentagent.com/",
    desktopImg: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=390&h=844&fit=crop&crop=top&q=90",
  },
  {
    id: 5,
    title: "Interior Design Website",
    description: "Modern interior design company website showcasing premium interior services and project portfolio.",
    category: "INTERIOR DESIGN",
    url: "https://interior.idesign4u.in/",
    desktopImg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=390&h=844&fit=crop&crop=top&q=90",
  },
  {
    id: 6,
    title: "IT Services Website",
    description: "Professional IT services website showcasing technology solutions, support services, and digital expertise.",
    category: "TECHNOLOGY & IT",
    url: "https://smile-tech-hub-1.preview.emergentagent.com/",
    desktopImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=390&h=844&fit=crop&crop=top&q=90",
  },
  {
    id: 7,
    title: "Beauty & Skincare Website",
    description: "Elegant beauty and skincare brand website showcasing services, products, and client experiences.",
    category: "BEAUTY & SKINCARE",
    url: "https://modest-elegance-24.preview.emergentagent.com/",
    desktopImg: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1280&h=800&fit=crop&q=90",
    mobileImg:  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=390&h=844&fit=crop&crop=top&q=90",
  },
];

/* ── Realistic Laptop + Phone Mockup ──────────────────────────────────────── */
function DeviceMockup({ project }) {
  return (
    <div className="relative flex items-end justify-center" style={{ minHeight: "340px" }}>

      {/* ── LAPTOP ─────────────────────────────── */}
      <div style={{
        position: "relative", width: "100%", maxWidth: "520px",
        filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.7))",
      }}>
        {/* Lid */}
        <div style={{
          background: "linear-gradient(160deg,#3d3d3d 0%,#1c1c1c 50%,#2a2a2a 100%)",
          borderRadius: "14px 14px 0 0",
          padding: "10px 10px 0 10px",
          border: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "none",
        }}>
          {/* Camera dot */}
          <div style={{
            width:"7px", height:"7px", borderRadius:"50%",
            background:"#2a2a2a", border:"1px solid #444",
            margin:"0 auto 8px",
          }}/>
          {/* Screen */}
          <div style={{
            background:"#000", borderRadius:"6px 6px 0 0", overflow:"hidden",
            border:"2px solid #111", borderBottom:"none",
          }}>
            {/* Browser bar */}
            <div style={{
              background:"#1c1c1e", padding:"7px 10px",
              display:"flex", alignItems:"center", gap:"8px",
              borderBottom:"1px solid #2a2a2a",
            }}>
              {/* Traffic lights */}
              <div style={{ display:"flex", gap:"5px", flexShrink:0 }}>
                <div style={{ width:"9px",height:"9px",borderRadius:"50%",background:"#ff5f57" }}/>
                <div style={{ width:"9px",height:"9px",borderRadius:"50%",background:"#febc2e" }}/>
                <div style={{ width:"9px",height:"9px",borderRadius:"50%",background:"#28c840" }}/>
              </div>
              {/* URL bar */}
              <div style={{
                flex:1, background:"#2c2c2e", borderRadius:"5px",
                padding:"3px 10px", fontSize:"9px", color:"#aaa",
                fontFamily:"monospace", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis",
              }}>
                🔒 {project.url.replace("https://","")}
              </div>
            </div>
            {/* Website screenshot */}
            <div style={{ aspectRatio:"16/10", overflow:"hidden" }}>
              <img src={project.desktopImg} alt={project.title}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }}
              />
            </div>
          </div>
        </div>
        {/* Base / hinge */}
        <div style={{
          background:"linear-gradient(180deg,#2a2a2a 0%,#1a1a1a 40%,#333 100%)",
          height:"18px", borderRadius:"0 0 8px 8px",
          border:"1px solid rgba(255,255,255,0.06)", borderTop:"none",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <div style={{ width:"35%", height:"4px", background:"#111", borderRadius:"0 0 6px 6px" }}/>
        </div>
        {/* Desk reflection */}
        <div style={{
          height:"6px", margin:"0 10px",
          background:"linear-gradient(180deg,rgba(100,100,100,0.15) 0%,transparent 100%)",
          borderRadius:"0 0 50% 50%",
        }}/>

        {/* Desktop label */}
        <div style={{
          textAlign:"center", marginTop:"10px",
          fontSize:"11px", color:"#555", letterSpacing:"0.08em", fontFamily:"monospace",
        }}>
          ⌥ Desktop View
        </div>
      </div>

      {/* ── PHONE ─────────────────────────────── */}
      <div style={{
        position:"absolute", right:"-10px", bottom:"30px",
        filter:"drop-shadow(4px 10px 30px rgba(0,0,0,0.9))",
        zIndex:10,
      }}>
        <div style={{
          width:"88px",
          background:"linear-gradient(160deg,#3d3d3d 0%,#1a1a1a 60%,#2a2a2a 100%)",
          borderRadius:"22px", padding:"9px 5px 11px 5px",
          border:"1px solid rgba(255,255,255,0.08)",
          position:"relative",
        }}>
          {/* Volume buttons */}
          <div style={{ position:"absolute", left:"-3px", top:"28px", width:"3px", height:"12px", background:"#1a1a1a", borderRadius:"2px 0 0 2px" }}/>
          <div style={{ position:"absolute", left:"-3px", top:"46px", width:"3px", height:"12px", background:"#1a1a1a", borderRadius:"2px 0 0 2px" }}/>
          {/* Power button */}
          <div style={{ position:"absolute", right:"-3px", top:"32px", width:"3px", height:"18px", background:"#1a1a1a", borderRadius:"0 2px 2px 0" }}/>
          {/* Dynamic island */}
          <div style={{
            width:"26px", height:"7px", background:"#000", borderRadius:"4px",
            margin:"0 auto 5px auto",
          }}/>
          {/* Screen */}
          <div style={{
            background:"#000", borderRadius:"14px", overflow:"hidden",
            aspectRatio:"9/19.5", border:"1px solid #111",
          }}>
            <img src={project.mobileImg} alt={`${project.title} mobile`}
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }}
            />
          </div>
          {/* Home indicator */}
          <div style={{
            width:"26px", height:"3px", background:"#444", borderRadius:"2px",
            margin:"6px auto 0",
          }}/>
        </div>
        {/* Phone label */}
        <div style={{
          textAlign:"center", marginTop:"8px",
          fontSize:"9px", color:"#555", letterSpacing:"0.08em", fontFamily:"monospace",
        }}>
          📱 Mobile
        </div>
      </div>

      {/* Purple glow under devices */}
      <div style={{
        position:"absolute", bottom:"-10px", left:"15%", right:"5%",
        height:"30px",
        background:"radial-gradient(ellipse,rgba(123,47,247,0.25) 0%,transparent 70%)",
        filter:"blur(10px)", zIndex:0,
      }}/>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="pt-40 pb-24" data-testid="portfolio-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5 }} className="text-center mb-20"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">Our Work</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-4"
            style={{ fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.03em" }}>
            Portfolio
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Explore our latest projects. Each website is crafted with attention to detail,
            performance optimization, and stunning design.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="space-y-28">
          {projects.map((project, index) => (
            <motion.div key={project.id}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-80px" }}
              transition={{ duration:0.7, ease:"easeOut" }}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center`}
              data-testid={`portfolio-item-${project.id}`}
            >
              {/* Devices */}
              <div className="flex-1 w-full px-4 sm:px-0">
                <DeviceMockup project={project} />
              </div>

              {/* Info */}
              <div className="flex-1 max-w-lg">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>
                  {project.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4"
                  style={{ fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.02em" }}>
                  {project.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8 text-base">{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                  className="btn-neon inline-flex items-center gap-2"
                  data-testid={`portfolio-live-preview-${project.id}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Preview
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.5 }}
          className="mt-28 text-center glass-card p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>
            Ready to Build Your Website?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let's create something amazing together. Start your project today and join our portfolio.
          </p>
          <a href="/#contact" className="btn-neon inline-flex items-center gap-2" data-testid="portfolio-cta">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </div>
  );
}
