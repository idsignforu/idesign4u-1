import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";

export const AnnouncementBar = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const savedEndTime = localStorage.getItem("offerEndTime");
    let endTime = savedEndTime
      ? parseInt(savedEndTime)
      : Date.now() + 24 * 60 * 60 * 1000;
    if (!savedEndTime) localStorage.setItem("offerEndTime", endTime.toString());

    const updateTimer = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        const newEnd = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("offerEndTime", newEnd.toString());
        endTime = newEnd;
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
        return;
      }
      setTimeLeft({
        hours:   Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    updateTimer();
    const id = setInterval(updateTimer, 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n) => n.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#0F051D] via-[#1a0a35] to-[#0F051D] border-b border-purple-900/30 relative overflow-hidden"
      data-testid="announcement-bar"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-3" style={{ padding: "8px 12px" }}>

        {/* Row 1 — Offer text (always full width, centered) */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, flexWrap: "nowrap",
        }}>
          <Sparkles style={{ width: 13, height: 13, color: "#a78bfa", flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#fff", whiteSpace: "nowrap" }}>
            Limited Time Launch Offer —&nbsp;
            <span style={{ color: "#a78bfa", fontWeight: 700 }}>Flat ₹3000 OFF</span>
            &nbsp;on One-Time Website Plans
          </span>
        </div>

        {/* Row 2 — Timer (separate line, centered) */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, marginTop: 5,
        }}>
          <Clock style={{ width: 12, height: 12, color: "#a78bfa", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>
            Offer Ends In:
          </span>
          <div
            style={{ display: "flex", alignItems: "center", gap: 3, fontFamily: "monospace" }}
            data-testid="countdown-timer"
          >
            {[fmt(timeLeft.hours), fmt(timeLeft.minutes), fmt(timeLeft.seconds)].map((v, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{
                  background: "rgba(123,47,247,0.3)",
                  border: "1px solid rgba(123,47,247,0.4)",
                  borderRadius: 5,
                  padding: "2px 7px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#c4b5fd",
                  letterSpacing: "0.05em",
                }}>
                  {v}
                </span>
                {i < 2 && <span style={{ color: "#9F5BFF", fontWeight: 700, fontSize: 13 }}>:</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
