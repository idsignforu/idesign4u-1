import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, Tag, Share2 } from "lucide-react";
import { toast } from "sonner";


export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
      const response = await fetch("/blog-data.json");
const posts = await response.json();

const foundPost = posts.find((p) => p.slug === slug);
setPost(foundPost);

if (foundPost) {
  const related = posts
    .filter((p) => p.category === foundPost.category && p.slug !== slug)
    .slice(0, 3);

  setRelatedPosts(related);
}
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white/5 rounded mb-4 w-1/4" />
            <div className="h-12 bg-white/5 rounded mb-6" />
            <div className="aspect-[2/1] bg-white/5 rounded-2xl mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-white/5 rounded" />
              <div className="h-4 bg-white/5 rounded" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog" className="btn-neon inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24" data-testid="blog-post-page">
      {/* SEO Meta (would be handled by helmet in production) */}
      <title>{post.seo_title}</title>
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            data-testid="back-to-blog"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {post.read_time}
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {post.published_date}
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              data-testid="share-button"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-10"
        >
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full aspect-[2/1] object-cover rounded-2xl"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-outfit prose-headings:font-bold prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-300 prose-li:marker:text-purple-500
            prose-code:text-purple-400 prose-code:bg-purple-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content }}
          data-testid="blog-content"
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 font-medium">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-gray-400 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 glass-card p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Get Your Website?
          </h3>
          <p className="text-gray-400 mb-6">
            Let us help you build a professional website that grows your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/#pricing" className="btn-neon">
              View Pricing
            </Link>
            <Link to="/portfolio" className="btn-outline-neon">
              See Our Work
            </Link>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="glass-card overflow-hidden group"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">{relatedPost.read_time}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
}
