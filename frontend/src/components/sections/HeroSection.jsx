import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Floating UI Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl border border-purple-500/20 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[15%] w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full border border-cyan-500/20 blur-sm"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[20%] w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-xl border border-purple-500/20 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-[10%] w-28 h-28 bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl border border-pink-500/10 blur-sm"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Premium Web Design Studio</span>
          </motion.div>

         {/* Logo with Glow Effect */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex justify-center mb-10 relative"
>

  {/* Glow Background */}
  <div className="absolute w-56 h-56 bg-purple-600/30 rounded-full blur-3xl opacity-60"></div>

  {/* Animated Light Ring */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="absolute w-48 h-48 border border-purple-500/30 rounded-full"
  ></motion.div>

  {/* Logo */}
  <motion.img
    src="https://customer-assets.emergentagent.com/job_3b9058a0-7844-4852-8656-1f94a27f5842/artifacts/wtv9ay46_WhatsApp%20Image%202026-03-06%20at%203.51.44%20PM-Photoroom.png"
    alt="I Design 4 U"
    className="relative w-32 sm:w-36 md:w-40 lg:w-44 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]"
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 4, repeat: Infinity }}
  />

</motion.div>

          {/* Headline */}
          <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-tight text-center max-w-4xl mx-auto px-4"
>
 <span className="block text-white">
Launch Your Business Website
</span>

<span className="block text-gradient-purple text-2xl sm:text-3xl md:text-4xl">
With One-Time Or Monthly Plans
</span>
</motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Launch a professional high-converting website for your business.
Choose between affordable monthly plans or a one-time website build.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/portfolio"
              className="btn-outline-neon flex items-center gap-2 group"
              data-testid="view-portfolio-btn"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#contact"
              className="btn-neon flex items-center gap-2"
              data-testid="start-project-hero-btn"
            >
              Start Your Project
              <Sparkles className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-xl mx-auto"
          >
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "48hr", label: "Quick Delivery" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-500/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-purple-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
