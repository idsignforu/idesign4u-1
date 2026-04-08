import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";

const monthlyPlans = [
  { name:"Basic", setupFee:"₹1,999", price:"₹499", period:"/month", popular:false,
    color:"#7B2FF7", features:["3 Pages","Hosting Included","SSL Certificate","WhatsApp Button Integration","1 Revision Per Page","Mobile Responsive","48 Hour Delivery"] },
  { name:"Business", setupFee:"₹1,999", price:"₹699", period:"/month", popular:true,
    color:"#9F5BFF", features:["5 Pages","Image Gallery","Basic SEO Optimization","Google Analytics Integration","2 Revisions Per Page","Contact Form","Social Media Integration","Mobile Responsive","48 Hour Delivery"] },
  { name:"Pro E-Commerce", setupFee:"₹1,999", price:"₹999", period:"/month", popular:false,
    color:"#00C2FF", features:["7 Pages","Full E-Commerce Setup","Up to 25 Products","Payment Gateway Support (Razorpay)","Customer Login Dashboard","Order Management System","Advanced SEO","Email Notifications","Mobile Responsive","48 Hour Delivery"] },
];

const oneTimePlans = [
  { name:"Starter Website", originalPrice:"₹8,999", price:"₹5,999", discount:"₹3,000 OFF", popular:false,
    color:"#7B2FF7", features:["3 Pages Website","Premium UI Design","Mobile Responsive","WhatsApp Button Integration","Contact Form","Basic SEO Setup","Free SSL","1 Revision Per Page","48 Hour Delivery"] },
  { name:"Business Website", originalPrice:"₹10,999", price:"₹7,999", discount:"₹3,000 OFF", popular:true,
    color:"#9F5BFF", features:["5 Pages Website","Image Gallery","Contact Form","Social Media Integration","Google Analytics Setup","Basic SEO Optimization","Mobile Responsive","Premium UI Design","2 Revisions Per Page","48 Hour Delivery"] },
  { name:"Pro E-Commerce", originalPrice:"₹14,999", price:"₹11,999", discount:"₹3,000 OFF", popular:false,
    color:"#00C2FF", features:["7 Pages Website","Full E-Commerce Setup","Up to 25 Products","Razorpay Payment Gateway","Customer Login Dashboard","Order Management System","Advanced SEO Setup","Email Notifications","Mobile Responsive","3 Revisions Per Page","48 Hour Delivery"] },
];

export const PricingSection = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const plans = isMonthly ? monthlyPlans : oneTimePlans;

  return (
    <section id="pricing" style={{ padding:"96px 0", position:"relative" }} data-testid="pricing-section">
      <div style={{ position:"absolute", top:"20%", right:"-8%", width:400, height:400,
        background:"radial-gradient(circle,rgba(0,194,255,0.08) 0%,transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6 }} style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6,
            background:"rgba(123,47,247,0.08)", border:"1px solid rgba(123,47,247,0.2)",
            borderRadius:999, padding:"5px 14px", marginBottom:16 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#9F5BFF", display:"inline-block", boxShadow:"0 0 8px #9F5BFF" }}/>
            <span style={{ fontSize:11, color:"#9F5BFF", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase" }}>Pricing</span>
          </div>
          <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", marginBottom:16 }}>
            Choose Your Plan
          </h2>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:16, maxWidth:480, margin:"0 auto" }}>
            Transparent pricing with no hidden fees. Choose the plan that fits your needs.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.1 }} style={{ display:"flex", justifyContent:"center", marginBottom:40 }}>
          <div style={{ position:"relative", display:"flex", alignItems:"center",
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:999, padding:4, gap:0 }} data-testid="pricing-toggle">
            {/* sliding bg */}
            <motion.div animate={{ x: isMonthly ? 0 : "100%" }} transition={{ type:"spring", stiffness:400, damping:35 }}
              style={{ position:"absolute", left:4, top:4, bottom:4, width:"calc(50% - 4px)",
                background:"linear-gradient(135deg,#7B2FF7,#9F5BFF)", borderRadius:999,
                boxShadow:"0 0 16px rgba(123,47,247,0.5)" }}/>
            {[{label:"Monthly Plans", val:true}, {label:"One-Time Plans", val:false}].map(o => (
              <button key={o.label} onClick={() => setIsMonthly(o.val)}
                style={{ position:"relative", zIndex:1, padding:"10px 20px", borderRadius:999,
                  background:"transparent", border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
                  color: isMonthly === o.val ? "#fff" : "rgba(255,255,255,0.45)",
                  transition:"color 0.2s", minWidth:140 }}
                data-testid={o.val ? "toggle-monthly" : "toggle-onetime"}>
                {o.label}
              </button>
            ))}
          </div>
        </motion.div>

        {isMonthly && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
            style={{ textAlign:"center", marginBottom:28 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:6,
              background:"rgba(123,47,247,0.1)", border:"1px solid rgba(123,47,247,0.2)",
              borderRadius:999, padding:"6px 16px", fontSize:13, color:"#c4b5fd" }}>
              <Sparkles style={{ width:13, height:13 }}/>
              One-time Setup Fee: ₹1,999 (includes hosting setup &amp; configuration)
            </span>
          </motion.div>
        )}

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={isMonthly?"monthly":"onetime"}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.4 }}
            style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20, alignItems:"start" }}>
            {plans.map((plan, i) => (
              <motion.div key={`${plan.name}-${i}`}
                initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.45, delay:i*0.1 }}
                style={{ position:"relative",
                  background: plan.popular
                    ? "linear-gradient(160deg,rgba(123,47,247,0.15),rgba(159,91,255,0.08))"
                    : "rgba(255,255,255,0.025)",
                  border: plan.popular
                    ? "1.5px solid rgba(159,91,255,0.45)"
                    : "1px solid rgba(255,255,255,0.07)",
                  borderRadius:24, padding:"32px 28px",
                  marginTop: plan.popular ? 0 : 0,
                  boxShadow: plan.popular ? "0 0 48px rgba(123,47,247,0.2)" : "none" }}
                data-testid={`pricing-card-${i}`}>

                {plan.popular && (
                  <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)",
                    background:"linear-gradient(135deg,#7B2FF7,#9F5BFF)", borderRadius:999,
                    padding:"4px 16px", fontSize:12, fontWeight:700, color:"#fff",
                    boxShadow:"0 4px 16px rgba(123,47,247,0.5)", whiteSpace:"nowrap",
                    display:"flex", alignItems:"center", gap:4 }}>
                    <Zap style={{ width:12, height:12 }}/> Most Popular
                  </div>
                )}

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                  <h3 style={{ fontSize:18, fontWeight:700, color:"#fff" }}>{plan.name}</h3>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:plan.color,
                    boxShadow:`0 0 8px ${plan.color}` }}/>
                </div>

                <div style={{ marginBottom:24 }}>
                  {!isMonthly && plan.originalPrice && (
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                      <span style={{ fontSize:15, color:"rgba(255,255,255,0.3)", textDecoration:"line-through" }}>
                        {plan.originalPrice}
                      </span>
                      <span style={{ fontSize:11, fontWeight:700, color:"#28c840",
                        background:"rgba(40,200,64,0.1)", border:"1px solid rgba(40,200,64,0.2)",
                        borderRadius:5, padding:"2px 8px" }}>
                        {plan.discount}
                      </span>
                    </div>
                  )}
                  <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                    <span style={{ fontSize:40, fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>
                      {plan.price}
                    </span>
                    {isMonthly && <span style={{ fontSize:14, color:"rgba(255,255,255,0.4)" }}>{plan.period}</span>}
                  </div>
                </div>

                <div style={{ height:1, background:"rgba(255,255,255,0.06)", marginBottom:24 }}/>

                <ul style={{ listStyle:"none", padding:0, margin:"0 0 28px 0", display:"flex", flexDirection:"column", gap:10 }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <div style={{ width:18, height:18, borderRadius:999, background:`${plan.color}20`,
                        border:`1px solid ${plan.color}40`, display:"flex", alignItems:"center",
                        justifyContent:"center", flexShrink:0, marginTop:1 }}>
                        <Check style={{ width:10, height:10, color:plan.color }}/>
                      </div>
                      <span style={{ fontSize:13.5, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact"
                  style={{ display:"block", textAlign:"center", padding:"13px 24px", borderRadius:14,
                    fontSize:14, fontWeight:600, textDecoration:"none", transition:"all 0.25s ease",
                    ...(plan.popular
                      ? { background:"linear-gradient(135deg,#7B2FF7,#9F5BFF)", color:"#fff",
                          boxShadow:"0 8px 24px rgba(123,47,247,0.4)" }
                      : { background:"rgba(255,255,255,0.04)", border:`1px solid ${plan.color}40`,
                          color:"rgba(255,255,255,0.8)" }) }}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
                  data-testid={`pricing-cta-${i}`}>
                  Get Started
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
