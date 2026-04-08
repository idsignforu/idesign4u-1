import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag, Search } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categories = [
  "All",
  "Affordable Websites",
  "Small Business Websites",
  "Website Design Tips",
  "Startup Websites",
  "Online Business Growth",
  "SEO Tips",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/blog-data.json");
      console.log("Blog data:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

  // Seed blog posts if empty
  useEffect(() => {
    const seedPosts = async () => {
      if (!loading && posts.length === 0) {
        try {
          await axios.get(`${API}/seed-blog`);
          const response = await axios.get(`${API}/blog`);
          setPosts(Array.isArray(response.data) ? response.data : response.data.posts || []);
        } catch (error) {
          console.error("Error seeding blog posts:", error);
        }
      }
    };
    seedPosts();
  }, [loading, posts.length]);

 const filteredPosts = posts.filter((post) => {
  const matchesCategory =
    selectedCategory === "All" || post.category === selectedCategory;

  const matchesSearch =
    (post.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.description || "").toLowerCase().includes(searchQuery.toLowerCase());

  return matchesCategory && matchesSearch;
});

  return (
    <div className="pt-40 pb-24" data-testid="blog-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">
            Insights & Resources
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4">
            Our Blog
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Tips, guides, and insights to help you build a successful online presence.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                data-testid="blog-search"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-purple-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
                data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="aspect-[16/9] bg-white/5 rounded-xl mb-6" />
                <div className="h-4 bg-white/5 rounded mb-4 w-1/3" />
                <div className="h-6 bg-white/5 rounded mb-3" />
                <div className="h-4 bg-white/5 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="glass-card overflow-hidden group blog-card"
                data-testid={`blog-card-${post.slug}`}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover blog-card-img"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {post.read_time}
                      </div>
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {post.published_date}
                      </div>
                      <span className="flex items-center gap-1 text-purple-400 text-sm font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Tag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </motion.div>
        )}

        {/* Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 glass-card p-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "cheap website",
              "affordable website",
              "low cost website",
              "website design india",
              "small business website",
              "startup website",
              "budget website",
              "professional website",
              "SEO optimization",
              "mobile responsive",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/30 hover:text-purple-400 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
