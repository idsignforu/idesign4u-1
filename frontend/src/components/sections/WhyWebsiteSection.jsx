import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Clock, Globe, ShieldCheck, Users, Star,
  XCircle, EyeOff, TrendingDown, AlertTriangle, PhoneOff, Frown
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "24/7 Online Presence",
    desc: "Your website works while you sleep. Customers can find you, read about your services, and even place orders at 3 AM — without you lifting a finger.",
    stat: "76%",
    statLabel: "customers check website before visiting",
    color: "#7B2FF7",
  },
  {
    icon: TrendingUp,
    title: "More Sales & Leads",
    desc: "A professional website turns visitors into paying customers. With the right design and call-to-actions, your website becomes your best salesperson.",
    stat: "3x",
    statLabel: "more leads compared to no website",
    color: "#00C2FF",
  },
  {
    icon: ShieldCheck,
    title: "Instant Credibility",
    desc: "Customers trust businesses with a website 5x more. No website = no trust. A premium design makes you look established, serious, and professional.",
    stat: "5x",
    statLabel: "more trust with a professional site",
    color: "#28c840",
  },
  {
    icon: Users,
    title: "Reach More Customers",
    desc: "Break geographical limits. A website lets you reach customers in Nirmal, Hyderabad, and beyond — people who would never find you otherwise.",
    stat: "2Bn+",
    statLabel: "people search Google daily",
    color: "#febc2e",
  },
  {
    icon: Star,
    title: "Beat Your Competition",
    desc: "Most local businesses still don't have a good website. Be the one that does. Own your category online before your competitors do.",
    stat: "50%",
    statLabel: "of small businesses have no website",
    color: "#FF2E93",
  },
  {
    icon: Clock,
    title: "Save Time with Automation",
    desc: "Online booking, WhatsApp inquiries, FAQ pages — let your website handle repetitive questions so you can focus on growing your business.",
    stat: "10+ hrs",
    statLabel: "saved per week on avg",
    color: "#9F5BFF",
  },
];

const drawbacks = [
  {
    icon: EyeOff,
    title: "Invisible to Customers",
    desc: "If you're not online, you simply don't exist for 90% of modern customers. They Google first — if you're not there, your competitor gets the sale.",
    stat: "90%",
    statLabel: "of buyers research online first",
    color: "#ff5f57",
  },
  {
    icon: TrendingDown,
    title: "Losing Revenue Daily",
    desc: "Every day without a website is money left on the table. Customers who can't find you online will find someone who has a website.",
    stat: "50K+",
    statLabel: "lost per year on average (Rs)",
    color: "#ff5f57",
  },
  {
    icon: AlertTriangle,
    title: "Zero Credibility",
    desc: "Customers are suspicious of businesses without websites. If they're legit, why don't they have a site? — this thought kills sales before they start.",
    stat: "81%",
    statLabel: "people distrust businesses without sites",
    color: "#febc2e",
  },
  {
    icon: PhoneOff,
    title: "Wasting Time on Calls",
    desc: "Without a website, you manually answer the same questions every day — location, prices, hours. A website answers them automatically, 24/7.",
    stat: "4 hrs",
    statLabel: "wasted on repetitive queries daily",
    color: "#febc2e",
  },
  {
    icon: XCircle,
    title: "Competitor Takes Your Spot",
    desc: "Your competitor with a website is ranking on Google, getting WhatsApp inquiries, and closing deals — while you wait for word-of-mouth alone.",
    stat: "3x",
    statLabel: "more leads your competitor is getting",
    color: "#ff5f57",
  },
  {
    icon: Frown,
    title: "Outdated and Forgettable",
    desc: "An old or no website signals neglect. Customers think: Are they even still open? First impressions are made online — make yours count.",
    stat: "0.05s",
    statLabel: "for users to form an opinion",
    color: "#FF2E93",
  },
];

function SliderPanel({ items, type }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const isBenefit = type === "benefit";
  const item = items[current];
  const Icon = item.icon;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [paused, current, items.length]);

  const handlePrev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const handleNext = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <div
      className="relative rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(15,5,29,0.6)",
        border: isBenefit ? "1px solid rgba(123,47,247,0.25)" : "1px solid rgba(255,80,80,0.2)",
        minHeight: "380px",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tab header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: isBenefit ? "rgba(123,47,247,0.2)" : "rgba(255,60,60,0.15)",
            color: isBenefit ? "#9F5BFF" : "#ff7070",
            fontFamily: "'Barlow Condensed',sans-serif",
          }}
        >
          {isBenefit ? "WITH A WEBSITE" : "WITHOUT A WEBSITE"}
        </span>
        {/* Dots */}
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? item.color : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            {/* Icon + stat */}
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: item.color + "22",
                  border: "1px solid " + item.color + "44",
                }}
              >
                <Icon size={26} style={{ color: item.color }} />
              </div>
              <div className="text-right">
                <div
                  className="text-3xl font-black"
                  style={{ color: item.color, fontFamily: "'Barlow Condensed',sans-serif" }}
                >
                  {item.stat}
                </div>
                <div className="text-xs text-gray-500 max-w-[130px] text-right leading-tight">
                  {item.statLabel}
                </div>
              </div>
            </div>

            <h3
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.02em" }}
            >
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      <div className="flex gap-2 px-6 pb-5">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <span className="ml-auto text-xs text-gray-600 self-center">
          {current + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}

export default function WhyWebsiteSection() {
  return (
    <section className="py-24 relative" id="why-website">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            top: "-20%", left: "10%",
            width: "500px", height: "500px",
            background: "rgba(123,47,247,0.12)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            bottom: "-20%", right: "10%",
            width: "400px", height: "400px",
            background: "rgba(99,60,180,0.1)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            className="text-purple-400 text-sm font-bold uppercase tracking-widest"
            style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
          >
            The Real Difference
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-3 mb-4"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.02em" }}
          >
            Website hai toh{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#7B2FF7,#9F5BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              business hai
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See exactly what you gain with a professional website and what you lose every day without one.
          </p>
        </motion.div>

        {/* Two panel slider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SliderPanel items={benefits} type="benefit" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SliderPanel items={drawbacks} type="drawback" />
          </motion.div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-3xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg,rgba(123,47,247,0.15) 0%,rgba(15,5,29,0.9) 100%)",
            border: "1px solid rgba(123,47,247,0.25)",
          }}
        >
          <p
            className="text-2xl sm:text-3xl font-black text-white mb-2"
            style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
          >
            Starting at just{" "}
            <span style={{ color: "#9F5BFF" }}>Rs.5,999</span> — One-time payment.
          </p>
          <p className="text-gray-400 mb-6">
            Get a premium website that works harder than any employee.
          </p>
          <a href="#contact" className="btn-neon inline-flex items-center gap-2 text-base">
            Get My Website Today
          </a>
        </motion.div>

      </div>
    </section>
  );
}
