import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Instagram, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const businessTypes = ["Small Business","Startup","E-Commerce","Personal Brand","Agency","Restaurant/Cafe","Gym/Fitness","Salon/Spa","Healthcare","Education","Real Estate","Other"];

const contactInfo = [
  { icon:Mail,      label:"Email",     value:"hello@idesign4u.in",      href:"mailto:hello@idesign4u.in",                          color:"#7B2FF7" },
  { icon:Phone,     label:"WhatsApp",  value:"+91 92814 10305",          href:"https://wa.me/919281410305",                         color:"#25D366" },
  { icon:Instagram, label:"Instagram", value:"@i_design4.u",             href:"https://www.instagram.com/i_design4.u",              color:"#E1306C" },
  { icon:MapPin,    label:"Location",  value:"Hyderabad, India",         href:null,                                                  color:"#febc2e" },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", business_type:"", message:"" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("https://formspree.io/f/xpqywwjg", formData);
      toast.success("Message sent successfully!");
      setFormData({ name:"", email:"", phone:"", business_type:"", message:"" });
    } catch { toast.error("Failed to send message"); }
    finally { setIsSubmitting(false); }
  };

  const inputStyle = {
    width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
    borderRadius:12, padding:"12px 16px", color:"#fff", fontSize:14, outline:"none",
    transition:"all 0.2s ease", boxSizing:"border-box",
  };

  return (
    <section id="contact" style={{ padding:"96px 0", position:"relative" }} data-testid="contact-section">
      <div style={{ position:"absolute", bottom:"10%", left:"-5%", width:400, height:400,
        background:"radial-gradient(circle,rgba(123,47,247,0.1) 0%,transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6 }} style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6,
            background:"rgba(123,47,247,0.08)", border:"1px solid rgba(123,47,247,0.2)",
            borderRadius:999, padding:"5px 14px", marginBottom:16 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#9F5BFF", display:"inline-block", boxShadow:"0 0 8px #9F5BFF" }}/>
            <span style={{ fontSize:11, color:"#9F5BFF", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase" }}>Get In Touch</span>
          </div>
          <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", marginBottom:16 }}>
            Start Your Project
          </h2>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:16, maxWidth:500, margin:"0 auto", lineHeight:1.65 }}>
            Ready to take your business online? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:32 }} className="lg:grid-cols-contact">
          <div style={{ display:"grid", gap:32 }} className="grid-cols-1 lg:grid-cols-2">

            {/* Form */}
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5 }}>
              <form onSubmit={handleSubmit}
                style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:24, padding:"32px 28px" }}
                data-testid="contact-form">

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                  {[{name:"name",placeholder:"Your name",type:"text",label:"Name"},{name:"email",placeholder:"your@email.com",type:"email",label:"Email"}].map(f => (
                    <div key={f.name}>
                      <label style={{ fontSize:13, color:"rgba(255,255,255,0.5)", display:"block", marginBottom:6, fontWeight:500 }}>{f.label}</label>
                      <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} required
                        placeholder={f.placeholder} style={inputStyle}
                        onFocus={e=>{e.target.style.borderColor="rgba(123,47,247,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(123,47,247,0.1)";}}
                        onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none";}}
                        data-testid={`contact-${f.name}`}/>
                    </div>
                  ))}
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                  <div>
                    <label style={{ fontSize:13, color:"rgba(255,255,255,0.5)", display:"block", marginBottom:6, fontWeight:500 }}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                      placeholder="+91 98765 43210" style={inputStyle}
                      onFocus={e=>{e.target.style.borderColor="rgba(123,47,247,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(123,47,247,0.1)";}}
                      onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none";}}
                      data-testid="contact-phone"/>
                  </div>
                  <div>
                    <label style={{ fontSize:13, color:"rgba(255,255,255,0.5)", display:"block", marginBottom:6, fontWeight:500 }}>Business Type</label>
                    <select name="business_type" value={formData.business_type} onChange={handleChange} required
                      style={{ ...inputStyle, appearance:"none", cursor:"pointer" }}
                      onFocus={e=>{e.target.style.borderColor="rgba(123,47,247,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(123,47,247,0.1)";}}
                      onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none";}}
                      data-testid="contact-business-type">
                      <option value="" style={{ background:"#0F051D" }}>Select type</option>
                      {businessTypes.map(t => <option key={t} value={t} style={{ background:"#0F051D" }}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom:24 }}>
                  <label style={{ fontSize:13, color:"rgba(255,255,255,0.5)", display:"block", marginBottom:6, fontWeight:500 }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4}
                    placeholder="Tell us about your project..."
                    style={{ ...inputStyle, resize:"none", fontFamily:"inherit" }}
                    onFocus={e=>{e.target.style.borderColor="rgba(123,47,247,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(123,47,247,0.1)";}}
                    onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none";}}
                    data-testid="contact-message"/>
                </div>

                <button type="submit" disabled={isSubmitting}
                  style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    background:"linear-gradient(135deg,#7B2FF7,#9F5BFF)", color:"#fff", border:"none",
                    borderRadius:12, padding:"14px 24px", fontSize:15, fontWeight:600, cursor:"pointer",
                    boxShadow:"0 8px 24px rgba(123,47,247,0.4)", transition:"all 0.25s ease",
                    opacity: isSubmitting ? 0.6 : 1 }}
                  onMouseEnter={e=>!isSubmitting && (e.currentTarget.style.transform="translateY(-2px)")}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
                  data-testid="contact-submit">
                  {isSubmitting ? <><Loader2 style={{ width:18, height:18, animation:"spin 1s linear infinite" }}/> Sending...</>
                    : <><Send style={{ width:16, height:16 }}/> Send Message</>}
                </button>
              </form>
            </motion.div>

            {/* Info panel */}
            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5 }}
              style={{ display:"flex", flexDirection:"column", gap:16 }}>

              {/* Contact cards */}
              <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:24, padding:"28px 24px" }}>
                <h3 style={{ fontSize:17, fontWeight:700, color:"#fff", marginBottom:20 }}>Contact Information</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {contactInfo.map((item, i) => {
                    const Icon = item.icon;
                    const wrap = { display:"flex", alignItems:"center", gap:14, padding:"12px 14px",
                      background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)",
                      borderRadius:12, transition:"all 0.2s ease", cursor: item.href ? "pointer" : "default",
                      textDecoration:"none" };
                    const inner = <>
                      <div style={{ width:40, height:40, borderRadius:10, background:`${item.color}15`,
                        border:`1px solid ${item.color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon style={{ width:17, height:17, color:item.color }}/>
                      </div>
                      <div>
                        <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginBottom:2, textTransform:"uppercase", letterSpacing:"0.08em" }}>{item.label}</div>
                        <div style={{ fontSize:14, color:"rgba(255,255,255,0.85)", fontWeight:500 }}>{item.value}</div>
                      </div>
                    </>;
                    return item.href
                      ? <a key={i} href={item.href} target={item.href.startsWith("http")?"_blank":undefined}
                          rel="noopener noreferrer" style={wrap}
                          onMouseEnter={e=>{e.currentTarget.style.background=`${item.color}10`; e.currentTarget.style.borderColor=`${item.color}30`;}}
                          onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.05)";}}>
                          {inner}</a>
                      : <div key={i} style={wrap}>{inner}</div>;
                  })}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/919281410305?text=Hi%2C%20I%27m%20interested%20in%20your%20web%20design%20services"
                target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                  background:"linear-gradient(135deg,#1fbe57,#25D366)", color:"#fff", borderRadius:14,
                  padding:"16px 24px", fontSize:15, fontWeight:600, textDecoration:"none",
                  boxShadow:"0 8px 24px rgba(37,211,102,0.3)", transition:"all 0.25s ease" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
                data-testid="whatsapp-cta">
                <MessageCircle style={{ width:20, height:20 }}/> Chat on WhatsApp
              </a>

              {/* Service area */}
              <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:16, padding:"20px 22px" }}>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", lineHeight:1.65, margin:0 }}>
                  📍 Based in <span style={{ color:"#a78bfa" }}>Hyderabad, India</span> — serving clients worldwide. No matter where you are, we can help you build your dream website.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
