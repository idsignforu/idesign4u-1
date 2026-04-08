import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

export const AnnouncementBar = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    let endTime = parseInt(localStorage.getItem("offerEndTime") || "0");
    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("offerEndTime", endTime.toString());
    }
    const tick = () => {
      const d = endTime - Date.now();
      if (d <= 0) { endTime = Date.now() + 86400000; localStorage.setItem("offerEndTime", endTime.toString()); return; }
      setTimeLeft({ hours: Math.floor(d/3600000), minutes: Math.floor((d%3600000)/60000), seconds: Math.floor((d%60000)/1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n) => n.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-testid="announcement-bar"
      style={{
        background: "linear-gradient(90deg,#0F051D,#1a0a35,#0F051D)",
        borderBottom: "1px solid rgba(123,47,247,0.25)",
        padding: "7px 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* shimmer */}
      <div style={{
        position:"absolute",inset:0,
        background:"linear-gradient(90deg,transparent 0%,rgba(123,47,247,0.07) 50%,transparent 100%)",
        pointerEvents:"none",
      }}/>

      {/* LINE 1: offer text */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
        <Zap style={{ width:12, height:12, color:"#a78bfa", flexShrink:0 }} />
        <span style={{ fontSize:12, color:"#fff", fontWeight:500, textAlign:"center", lineHeight:1.3 }}>
          Launch Offer:&nbsp;
          <span style={{ color:"#a78bfa", fontWeight:700 }}>₹3000 OFF</span>
          &nbsp;on all One-Time Plans
        </span>
      </div>

      {/* LINE 2: timer */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:4 }}>
        <Clock style={{ width:11, height:11, color:"rgba(167,139,250,0.7)", flexShrink:0 }} />
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)" }}>Ends in:</span>
        <div style={{ display:"flex", alignItems:"center", gap:3, fontFamily:"monospace" }} data-testid="countdown-timer">
          {[fmt(timeLeft.hours), fmt(timeLeft.minutes), fmt(timeLeft.seconds)].map((v, i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:3 }}>
              <span style={{
                background:"rgba(123,47,247,0.3)", border:"1px solid rgba(123,47,247,0.45)",
                borderRadius:5, padding:"1px 6px", fontSize:12, fontWeight:700, color:"#c4b5fd",
              }}>{v}</span>
              {i < 2 && <span style={{ color:"#9F5BFF", fontWeight:700 }}>:</span>}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
