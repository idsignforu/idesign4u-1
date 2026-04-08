import { motion } from "framer-motion";
import { 
  Globe, 
  ShoppingCart, 
  FileText, 
  User, 
  RefreshCw, 
  Search 
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "Professional websites that establish your brand presence and convert visitors into customers.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    description: "Full-featured online stores with payment integration, inventory management, and order tracking.",
  },
  {
    icon: FileText,
    title: "Landing Pages",
    description: "High-converting landing pages optimized for marketing campaigns and lead generation.",
  },
  {
    icon: User,
    title: "Portfolio Websites",
    description: "Showcase your work beautifully with stunning portfolio designs that impress clients.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description: "Transform your outdated website into a modern, fast, and user-friendly experience.",
  },
  {
    icon: Search,
    title: "SEO Optimized Websites",
    description: "Websites built with SEO best practices to help you rank higher on Google.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Our Services
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From simple business websites to complex e-commerce platforms, we build digital solutions that drive results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 group cursor-pointer"
                data-testid={`service-card-${index}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
