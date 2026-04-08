import { motion } from "framer-motion";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Fitness Studio Website",
    description: "A modern, energetic website for a premium fitness studio featuring class schedules, trainer profiles, and membership options.",
    category: "Fitness & Health",
    url: "https://femme-strength-club.preview.emergentagent.com/",
    screenshot: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Event Organising Services",
    description: "Elegant website for a luxury event planning company showcasing their portfolio of high-end celebrations and corporate events.",
    category: "Events & Services",
    url: "https://luxury-celebrations-2.preview.emergentagent.com/",
    screenshot: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Real Estate Website",
    description: "Feature-rich real estate platform with property listings, EMI calculator, and advanced search functionality for approved plots.",
    category: "Real Estate",
    url: "https://approved-plots-hyd.preview.emergentagent.com/",
    screenshot: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Car Detailing Services",
    description: "Sleek and professional website for premium car detailing services with booking system and service packages showcase.",
    category: "Automotive",
    url: "https://shine-elite.preview.emergentagent.com/",
    screenshot: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Interior Design Website",
    description: "Modern interior design company website showcasing premium interior services and project portfolio.",
    category: "Interior Design",
    url: "https://interior.idesign4u.in/",
    screenshot: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: 6,
    title: "IT Services Website",
    description: "Professional IT services website showcasing technology solutions, support services, and digital expertise.",
    category: "Technology & IT",
    url: "https://smile-tech-hub-1.preview.emergentagent.com/",
    screenshot: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Beauty & Skincare Website",
    description: "Elegant beauty and skincare brand website showcasing services, products, and client experiences.",
    category: "Beauty & Skincare",
    url: "https://modest-elegance-24.preview.emergentagent.com/",
    screenshot: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=800&fit=crop&q=80",
  },
];

// Mobile screenshots - portrait crops from same images
const getMobileShot = (url) => url.replace("w=1200&h=800", "w=400&h=860").replace("fit=crop", "fit=crop&crop=top");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function MacbookMockup({ project }) {
  return (
    <div className="macbook-wrapper" style={{ perspective: "1200px" }}>
      {/* Macbook lid + screen */}
      <div className="relative" style={{
        background: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 40%, #2a2a2a 100%)",
        borderRadius: "12px 12px 0 0",
        padding: "10px 10px 0 10px",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 25px 60px rgba(0,0,0,0.7)",
      }}>
        {/* Camera notch */}
        <div style={{
          width: "6px", height: "6px", background: "#333", borderRadius: "50%",
          margin: "0 auto 6px auto", boxShadow: "0 0 0 1px rgba(255,255,255,0.1)"
        }} />
        {/* Screen bezel */}
        <div style={{
          background: "#000",
          borderRadius: "6px 6px 0 0",
          overflow: "hidden",
          position: "relative",
        }}>
          {/* Browser chrome */}
          <div style={{
            background: "#1c1c1e",
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            borderBottom: "1px solid #2a2a2a",
          }}>
            <div style={{ display: "flex", gap: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28c840" }} />
            </div>
            {/* URL bar */}
            <div style={{
              flex: 1, background: "#2c2c2e", borderRadius: "4px", padding: "3px 8px",
              fontSize: "9px", color: "#888", fontFamily: "monospace", marginLeft: "6px",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
            }}>
              {project.url.replace("https://", "")}
            </div>
          </div>
          {/* Website screenshot */}
          <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
            <img
              src={project.screenshot}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
            />
          </div>
        </div>
      </div>
      {/* Macbook base/hinge */}
      <div style={{
        background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #333 100%)",
        height: "16px",
        borderRadius: "0 0 6px 6px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        position: "relative",
      }}>
        {/* Hinge line */}
        <div style={{
          position: "absolute", top: "2px", left: "50%", transform: "translateX(-50%)",
          width: "40%", height: "3px", background: "#111", borderRadius: "0 0 4px 4px"
        }} />
      </div>
      {/* Desk surface reflection */}
      <div style={{
        background: "linear-gradient(180deg, rgba(123,47,247,0.06) 0%, transparent 100%)",
        height: "8px",
        borderRadius: "0 0 50% 50%",
        margin: "0 4px",
      }} />
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
        <Monitor className="w-3 h-3" />
        <span>Desktop View</span>
      </div>
    </div>
  );
}

function PhoneMockup({ project }) {
  return (
    <div className="phone-wrapper">
      <div style={{
        width: "90px",
        background: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 60%, #2a2a2a 100%)",
        borderRadius: "20px",
        padding: "10px 5px",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 4px 8px 30px rgba(0,0,0,0.8), -2px 0 8px rgba(0,0,0,0.3)",
        position: "relative",
      }}>
        {/* Side buttons */}
        <div style={{
          position: "absolute", right: "-3px", top: "30px",
          width: "3px", height: "20px", background: "#222", borderRadius: "0 2px 2px 0"
        }} />
        <div style={{
          position: "absolute", left: "-3px", top: "25px",
          width: "3px", height: "14px", background: "#222", borderRadius: "2px 0 0 2px"
        }} />
        <div style={{
          position: "absolute", left: "-3px", top: "44px",
          width: "3px", height: "14px", background: "#222", borderRadius: "2px 0 0 2px"
        }} />
        {/* Dynamic island */}
        <div style={{
          width: "30px", height: "7px", background: "#000", borderRadius: "4px",
          margin: "0 auto 6px auto",
        }} />
        {/* Screen */}
        <div style={{
          background: "#000", borderRadius: "12px", overflow: "hidden",
          aspectRatio: "9/19.5",
        }}>
          <img
            src={getMobileShot(project.screenshot)}
            alt={`${project.title} mobile`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
          />
        </div>
        {/* Home indicator */}
        <div style={{
          width: "28px", height: "3px", background: "#444", borderRadius: "2px",
          margin: "6px auto 0 auto"
        }} />
      </div>
      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-500">
        <Smartphone className="w-3 h-3" />
        <span>Mobile</span>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="pt-40 pb-24" data-testid="portfolio-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4">
            Portfolio
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Explore our latest projects. Each website is crafted with attention to detail,
            performance optimization, and stunning design.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-32"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 lg:gap-16 items-center`}
              data-testid={`portfolio-item-${project.id}`}
            >
              {/* Device Mockups */}
              <div className="flex-1 relative flex items-end justify-center gap-6">
                {/* Laptop */}
                <div className="w-full max-w-sm lg:max-w-md relative z-10">
                  <MacbookMockup project={project} />
                </div>
                {/* Phone - overlapping bottom right */}
                <div className="absolute -bottom-2 right-0 lg:right-4 z-20">
                  <PhoneMockup project={project} />
                </div>
                {/* Glow under devices */}
                <div style={{
                  position: "absolute", bottom: "-20px", left: "20%", right: "20%",
                  height: "40px", background: "rgba(123,47,247,0.2)",
                  filter: "blur(20px)", borderRadius: "50%", zIndex: 0
                }} />
              </div>

              {/* Project Info */}
              <div className="flex-1 max-w-lg">
                <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                  {project.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon inline-flex items-center gap-2"
                  data-testid={`portfolio-live-preview-${project.id}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Preview
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-32 text-center glass-card p-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Build Your Website?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let's create something amazing together. Start your project today and
            join our portfolio of successful businesses.
          </p>
          <a href="/#contact" className="btn-neon inline-flex items-center gap-2" data-testid="portfolio-cta">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </div>
  );
}
