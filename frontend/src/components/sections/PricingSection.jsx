import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const monthlyPlans = [
  {
    name: "Basic",
    setupFee: "₹1,999",
    price: "₹499",
    period: "/month",
    features: [
      "3 Pages",
      "Hosting Included",
      "SSL Certificate",
      "WhatsApp Button Integration",
      "1 Revision Per Page",
      "Mobile Responsive",
      "48 Hour Delivery",
    ],
    popular: false,
  },
  {
    name: "Business",
    setupFee: "₹1,999",
    price: "₹699",
    period: "/month",
    features: [
      "5 Pages",
      "Image Gallery",
      "Basic SEO Optimization",
      "Google Analytics Integration",
      "2 Revisions Per Page",
      "Contact Form",
      "Social Media Integration",
      "Mobile Responsive",
      "48 Hour Delivery",
    ],
    popular: true,
  },
  {
    name: "Pro E-Commerce",
    setupFee: "₹1,999",
    price: "₹999",
    period: "/month",
    features: [
      "7 Pages",
      "Full E-Commerce Setup",
      "Up to 25 Products",
      "Payment Gateway Support (Razorpay)",
      "Customer Login Dashboard",
      "Order Management System",
      "Advanced SEO",
      "Email Notifications",
      "Mobile Responsive",
      "48 Hour Delivery",
    ],
    popular: false,
  },
];

const oneTimePlans = [
  {
    name: "Starter Website",
    originalPrice: "₹8,999",
    price: "₹5,999",
    discount: "₹3,000 OFF",
    features: [
      "3 Pages Website",
      "Premium UI Design",
      "Mobile Responsive",
      "WhatsApp Button Integration",
      "Contact Form",
      "Basic SEO Setup",
      "Free SSL",
      "1 Revision Per Page",
      "48 Hour Delivery",
    ],
    popular: false,
  },
  {
    name: "Business Website",
    originalPrice: "₹10,999",
    price: "₹7,999",
    discount: "₹3,000 OFF",
    features: [
      "5 Pages Website",
      "Image Gallery",
      "Contact Form",
      "Social Media Integration",
      "Google Analytics Setup",
      "Basic SEO Optimization",
      "Mobile Responsive",
      "Premium UI Design",
      "2 Revisions Per Page",
      "48 Hour Delivery",
    ],
    popular: true,
  },
  {
    name: "Pro E-Commerce",
    originalPrice: "₹14,999",
    price: "₹11,999",
    discount: "₹3,000 OFF",
    features: [
      "7 Pages Website",
      "Full E-Commerce Setup",
      "Up to 25 Products",
      "Razorpay Payment Gateway",
      "Customer Login Dashboard",
      "Order Management System",
      "Advanced SEO Setup",
      "Email Notifications",
      "Mobile Responsive",
      "3 Revisions Per Page",
      "48 Hour Delivery",
    ],
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const PricingSection = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const plans = isMonthly ? monthlyPlans : oneTimePlans;

  return (
    <section id="pricing" className="py-24 relative" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Choose the plan that fits your needs.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="pricing-toggle" data-testid="pricing-toggle">
            <div
              className="pricing-toggle-slider"
              style={{
                width: isMonthly ? "140px" : "140px",
                left: isMonthly ? "4px" : "calc(100% - 144px)",
              }}
            />
            <button
              onClick={() => setIsMonthly(true)}
              className={`pricing-toggle-option ${isMonthly ? "active" : ""}`}
              data-testid="toggle-monthly"
            >
              Monthly Plans
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`pricing-toggle-option ${!isMonthly ? "active" : ""}`}
              data-testid="toggle-onetime"
            >
              One-Time Plans
            </button>
          </div>
        </motion.div>

        {/* Setup Fee Notice for Monthly */}
        {isMonthly && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
              <Sparkles className="w-4 h-4" />
              One-time Setup Fee: ₹1,999 (includes hosting setup & configuration)
            </span>
          </motion.div>
        )}

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isMonthly ? "monthly" : "onetime"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={`${plan.name}-${index}`}
                variants={cardVariants}
                className={`relative ${
                  plan.popular ? "premium-card" : "glass-card"
                } p-8 ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
                data-testid={`pricing-card-${index}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    {!isMonthly && plan.originalPrice && (
                      <div className="flex items-center gap-3 mb-2">
                        <span className="price-strike text-lg">
                          {plan.originalPrice}
                        </span>
                        <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded">
                          {plan.discount}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      {isMonthly && (
                        <span className="text-gray-400">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`block text-center py-3 px-6 rounded-full font-medium transition-all duration-300 ${
                      plan.popular
                        ? "btn-neon w-full"
                        : "border border-purple-500/30 text-white hover:bg-purple-500/10 hover:border-purple-500/50"
                    }`}
                    data-testid={`pricing-cta-${index}`}
                  >
                    Get Started
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
