import { motion } from "framer-motion";
import { Globe, ShoppingCart, FileText, User, RefreshCw, Search, ArrowRight } from "lucide-react";

const services = [
  { icon:Globe,       title:"Business Websites",     description:"Professional websites that establish your brand presence and convert visitors into customers.", color:"#7B2FF7", bg:"rgba(123,47,247,0.1)" },
  { icon:ShoppingCart,title:"E-Commerce Websites",    description:"Full-featured online stores with payment integration, inventory management, and order tracking.", color:"#00C2FF", bg:"rgba(0,194,255,0.1)" },
  { icon:FileText,    title:"Landing Pages",          description:"High-converting landing pages optimized for marketing campaigns and lead generation.", color:"#FF6B35", bg:"rgba(255,107,53,0.1)" },
  { icon:User,        title:"Portfolio Websites",     description:"Showcase your work beautifully with stunning portfolio designs that impress clients.", color:"#28c840", bg:"rgba(40,200,64,0.1)" },
  { icon:RefreshCw,   title:"Website Redesign",       description:"Transform your outdated website into a modern, fast, and user-friendly experience.", color:"#febc2e", bg:"rgba(254,188,46,0.1)" },
  { icon:Search,      title:"SEO Optimized Websites", description:"Websites built with SEO best practices to help you rank higher on Google.", color:"#FF2E93", bg:"rgba(255,46,147,0.1)" },
];

export const ServicesSection = () => (
  <section id="services" style={{ padding:"96px 0", position:"relative" }} data-testid="services-section">
    {/* bg glow */}
    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
      width:600, height:400, background:"radial-gradient(ellipse,rgba(123,47,247,0.08) 0%,transparent 70%)",
      filter:"blur(40px)", pointerEvents:"none" }}/>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

      {/* Header */}
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
        style={{ textAlign:"center", marginBottom:64 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6,
          background:"rgba(123,47,247,0.08)", border:"1px solid rgba(123,47,247,0.2)",
          borderRadius:999, padding:"5px 14px", marginBottom:16 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#9F5BFF", boxShadow:"0 0 8px #9F5BFF", display:"inline-block" }}/>
          <span style={{ fontSize:11, color:"#9F5BFF", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase" }}>
            What We Offer
          </span>
        </div>
        <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:"#fff",
          letterSpacing:"-0.02em", marginBottom:16 }}>
          Our Services
        </h2>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:16, maxWidth:520, margin:"0 auto", lineHeight:1.65 }}>
          From simple business websites to complex e-commerce platforms — we build digital solutions that drive real results.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
              style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:20, padding:"28px 28px 24px", position:"relative", overflow:"hidden",
                transition:"all 0.3s ease", cursor:"pointer" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.045)";
                e.currentTarget.style.borderColor = `${s.color}40`;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.25), 0 0 0 1px ${s.color}20`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              data-testid={`service-card-${i}`}>

              {/* Top glow bar */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                background:`linear-gradient(90deg,transparent,${s.color},transparent)`, opacity:0.6 }}/>

              {/* Icon */}
              <div style={{ width:52, height:52, borderRadius:14, background:s.bg,
                border:`1px solid ${s.color}30`, display:"flex", alignItems:"center",
                justifyContent:"center", marginBottom:20 }}>
                <Icon style={{ width:24, height:24, color:s.color }}/>
              </div>

              <h3 style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:10 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.65, marginBottom:16 }}>{s.description}</p>

              <div style={{ display:"flex", alignItems:"center", gap:4, color:s.color, fontSize:12, fontWeight:600 }}>
                Learn more <ArrowRight size={12}/>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
