import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_3b9058a0-7844-4852-8656-1f94a27f5842/artifacts/wtv9ay46_WhatsApp%20Image%202026-03-06%20at%203.51.44%20PM-Photoroom.png";

const floatA = { animate:{y:[0,-18,0]}, transition:{duration:6, repeat:Infinity, ease:"easeInOut"} };
const floatB = { animate:{y:[0,14,0]},  transition:{duration:8, repeat:Infinity, ease:"easeInOut"} };
const floatC = { animate:{y:[0,-12,0]}, transition:{duration:7, repeat:Infinity, ease:"easeInOut"} };

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop:160, paddingBottom:60 }} data-testid="hero-section">

    {/* ── Grid background ── */}
    <div style={{ position:"absolute", inset:0, pointerEvents:"none",
      backgroundImage:"linear-gradient(rgba(123,47,247,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(123,47,247,0.05) 1px,transparent 1px)",
      backgroundSize:"48px 48px" }}/>

    {/* ── Radial glows ── */}
    <div style={{ position:"absolute", top:"-10%", left:"-5%", width:500, height:500,
      background:"radial-gradient(circle,rgba(123,47,247,0.22) 0%,transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }}/>
    <div style={{ position:"absolute", bottom:"10%", right:"-5%", width:400, height:400,
      background:"radial-gradient(circle,rgba(0,194,255,0.12) 0%,transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }}/>

    {/* ── Floating shapes ── */}
    <motion.div {...floatA} style={{ position:"absolute", top:"22%", left:"6%", width:64, height:64,
      background:"linear-gradient(135deg,rgba(123,47,247,0.25),rgba(0,194,255,0.1))",
      borderRadius:16, border:"1px solid rgba(123,47,247,0.2)", backdropFilter:"blur(4px)", pointerEvents:"none" }}/>
    <motion.div {...floatB} style={{ position:"absolute", top:"35%", right:"8%", width:48, height:48,
      background:"linear-gradient(135deg,rgba(0,194,255,0.2),transparent)",
      borderRadius:"50%", border:"1px solid rgba(0,194,255,0.2)", pointerEvents:"none" }}/>
    <motion.div {...floatC} style={{ position:"absolute", bottom:"28%", left:"14%", width:40, height:40,
      background:"linear-gradient(135deg,rgba(255,46,147,0.15),transparent)",
      borderRadius:10, border:"1px solid rgba(255,46,147,0.15)", pointerEvents:"none" }}/>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="text-center max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(123,47,247,0.1)", border:"1px solid rgba(123,47,247,0.25)",
            borderRadius:999, padding:"6px 16px", marginBottom:32 }}>
          <Sparkles style={{ width:14, height:14, color:"#a78bfa" }}/>
          <span style={{ fontSize:13, color:"#c4b5fd", fontWeight:500, letterSpacing:"0.04em" }}>
            Premium Web Design Studio
          </span>
        </motion.div>

        {/* Logo circle */}
        <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          style={{ display:"flex", justifyContent:"center", marginBottom:36 }}>
          <div style={{ position:"relative", width:176, height:176, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {/* glow */}
            <div style={{ position:"absolute", inset:0, background:"rgba(123,47,247,0.25)", borderRadius:"50%", filter:"blur(28px)" }}/>
            {/* ring 1 */}
            <motion.div animate={{ rotate:360 }} transition={{ duration:20, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", inset:0, border:"1px solid rgba(123,47,247,0.3)", borderRadius:"50%" }}/>
            {/* ring 2 */}
            <motion.div animate={{ rotate:-360 }} transition={{ duration:32, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", inset:12, border:"1px dashed rgba(159,91,255,0.15)", borderRadius:"50%" }}/>
            {/* logo */}
            <motion.img src={LOGO_URL} alt="iDesign4U"
              animate={{ y:[0,-8,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
              style={{ position:"relative", width:112, height:112, objectFit:"contain",
                filter:"drop-shadow(0 0 20px rgba(168,85,247,0.8))" }}/>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.15 }}>
          <h1 style={{ fontSize:"clamp(34px,7vw,72px)", fontWeight:800, lineHeight:1.1,
            letterSpacing:"-0.02em", color:"#fff", marginBottom:8 }}>
            Launch Your Business
          </h1>
          <h1 style={{ fontSize:"clamp(34px,7vw,72px)", fontWeight:800, lineHeight:1.1,
            letterSpacing:"-0.02em", color:"#fff", marginBottom:4 }}>
            Website
          </h1>
          <h2 style={{ fontSize:"clamp(22px,4.5vw,48px)", fontWeight:700, lineHeight:1.2,
            background:"linear-gradient(135deg,#9F5BFF,#00C2FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            marginBottom:24 }}>
            With One-Time Or Monthly Plans
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.3 }}
          style={{ fontSize:"clamp(14px,2.2vw,18px)", color:"rgba(255,255,255,0.5)",
            maxWidth:560, margin:"0 auto 40px", lineHeight:1.7 }}>
          Launch a professional high-converting website for your business. Choose from flexible pricing plans designed for every budget.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.4 }}
          style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:12, marginBottom:52 }}>
          <a href="/#pricing"
            style={{ display:"inline-flex", alignItems:"center", gap:8,
              background:"linear-gradient(135deg,#7B2FF7,#9F5BFF)", color:"#fff",
              borderRadius:999, padding:"13px 28px", fontSize:15, fontWeight:600,
              textDecoration:"none", boxShadow:"0 0 24px rgba(123,47,247,0.45)",
              transition:"all 0.25s ease" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            View Pricing <ArrowRight size={16}/>
          </a>
          <Link to="/portfolio"
            style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#c4b5fd",
              background:"rgba(123,47,247,0.08)", border:"1px solid rgba(123,47,247,0.25)",
              borderRadius:999, padding:"13px 28px", fontSize:15, fontWeight:500,
              textDecoration:"none", transition:"all 0.25s ease" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(123,47,247,0.15)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(123,47,247,0.08)"}>
            View Portfolio
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.55 }}
          style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16 }}>
          {[
            { icon:Star, text:"5★ Rated Service" },
            { icon:Zap,  text:"48 Hour Delivery" },
            { icon:Shield, text:"Premium UI Design" },
          ].map(({ icon:Icon, text }) => (
            <div key={text} style={{ display:"flex", alignItems:"center", gap:6,
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:999, padding:"6px 14px" }}>
              <Icon style={{ width:13, height:13, color:"#a78bfa" }}/>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </div>

    {/* scroll indicator */}
    <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
      style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
        width:26, height:42, border:"2px solid rgba(123,47,247,0.35)", borderRadius:13,
        display:"flex", justifyContent:"center", paddingTop:6 }}>
      <motion.div animate={{ opacity:[1,0,1], y:[0,12,0] }} transition={{ duration:2, repeat:Infinity }}
        style={{ width:4, height:8, background:"rgba(159,91,255,0.7)", borderRadius:2 }}/>
    </motion.div>
  </section>
);
