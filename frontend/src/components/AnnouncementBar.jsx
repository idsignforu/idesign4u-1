import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";

export const AnnouncementBar = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const savedEndTime = localStorage.getItem("offerEndTime");
    let endTime;
    if (savedEndTime) {
      endTime = parseInt(savedEndTime);
    } else {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("offerEndTime", endTime.toString());
    }

    const updateTimer = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("offerEndTime", newEndTime.toString());
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
        return;
      }
      setTimeLeft({
        hours:   Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (n) => n.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#0F051D] via-[#1a0a35] to-[#0F051D] border-b border-purple-900/30 relative overflow-hidden"
      data-testid="announcement-bar"
      style={{ padding: "10px 0" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Single-row layout that never wraps — scrolls horizontally on tiny screens */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            whiteSpace: "nowrap",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Offer text */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>
              Launch Offer –&nbsp;
              <span style={{ color: "#a78bfa", fontWeight: 700 }}>₹3000 OFF</span>
              &nbsp;on One-Time Plans
            </span>
          </div>

          {/* Divider dot */}
          <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>•</span>

          {/* Countdown */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <Clock className="w-3.5 h-3.5 text-purple-400" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Ends in:</span>
            <div
              style={{ display: "flex", alignItems: "center", gap: 3, fontFamily: "monospace" }}
              data-testid="countdown-timer"
            >
              {[fmt(timeLeft.hours), fmt(timeLeft.minutes), fmt(timeLeft.seconds)].map((v, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{
                    background: "rgba(123,47,247,0.25)",
                    border: "1px solid rgba(123,47,247,0.35)",
                    borderRadius: 5,
                    padding: "2px 7px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#c4b5fd",
                    letterSpacing: "0.04em",
                  }}>
                    {v}
                  </span>
                  {i < 2 && <span style={{ color: "#7B2FF7", fontWeight: 700 }}>:</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
