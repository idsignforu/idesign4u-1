import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";

export const AnnouncementBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Initialize from localStorage or start fresh
    const savedEndTime = localStorage.getItem("offerEndTime");
    let endTime;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime);
    } else {
      // Set 24 hours from now
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("offerEndTime", endTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        // Reset timer for new 24 hour period
        const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("offerEndTime", newEndTime.toString());
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#0F051D] via-[#1a0a35] to-[#0F051D] border-b border-purple-900/30 py-3 relative overflow-hidden"
      data-testid="announcement-bar"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm sm:text-base font-medium text-white">
              Limited Time Launch Offer –{" "}
              <span className="text-purple-400 font-semibold">Flat ₹3000 OFF</span>{" "}
              On One-Time Website Plans
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Offer Ends In:</span>
            <div className="flex items-center gap-1 font-mono" data-testid="countdown-timer">
              <span className="countdown-digit bg-purple-900/30 px-2 py-1 rounded">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-purple-400">:</span>
              <span className="countdown-digit bg-purple-900/30 px-2 py-1 rounded">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-purple-400">:</span>
              <span className="countdown-digit bg-purple-900/30 px-2 py-1 rounded">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
