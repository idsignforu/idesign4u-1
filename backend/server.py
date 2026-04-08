from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

# Try to import resend
try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'i.dsignfor.u@gmail.com')

if RESEND_AVAILABLE and RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ===================== MODELS =====================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Blog Post Models
class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    description: str
    content: str
    featured_image: str
    category: str
    tags: List[str]
    seo_title: str
    meta_description: str
    author: str = "I Design 4 U Team"
    published_date: str
    read_time: str
    is_published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    slug: str
    title: str
    description: str
    content: str
    featured_image: str
    category: str
    tags: List[str]
    seo_title: str
    meta_description: str
    author: str = "I Design 4 U Team"
    published_date: str
    read_time: str
    is_published: bool = True

class BlogPostUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    seo_title: Optional[str] = None
    meta_description: Optional[str] = None
    author: Optional[str] = None
    published_date: Optional[str] = None
    read_time: Optional[str] = None
    is_published: Optional[bool] = None

# Contact Form Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    business_type: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    business_type: str
    message: str

# ===================== ROUTES =====================

@api_router.get("/")
async def root():
    return {"message": "I Design 4 U API - Premium Web Design Studio"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    doc['created_at'] = doc.get('created_at', datetime.now(timezone.utc)).isoformat() if isinstance(doc.get('created_at'), datetime) else doc.get('created_at')
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# ===================== BLOG ROUTES =====================

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(category: Optional[str] = None, tag: Optional[str] = None):
    """Get all published blog posts with optional filtering"""
    query = {"is_published": True}
    if category:
        query["category"] = category
    if tag:
        query["tags"] = tag
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    for post in posts:
        if isinstance(post.get('created_at'), str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    """Get a single blog post by slug"""
    post = await db.blog_posts.find_one({"slug": slug, "is_published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    return post

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    """Create a new blog post (admin)"""
    # Check if slug already exists
    existing = await db.blog_posts.find_one({"slug": input.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Blog post with this slug already exists")
    
    post_obj = BlogPost(**input.model_dump())
    doc = post_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.blog_posts.insert_one(doc)
    return post_obj

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, input: BlogPostUpdate):
    """Update a blog post (admin)"""
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.blog_posts.update_one(
        {"id": post_id},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    updated_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if isinstance(updated_post.get('created_at'), str):
        updated_post['created_at'] = datetime.fromisoformat(updated_post['created_at'])
    return updated_post

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post (admin)"""
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

@api_router.get("/blog-categories")
async def get_blog_categories():
    """Get all unique blog categories"""
    categories = await db.blog_posts.distinct("category", {"is_published": True})
    return categories

@api_router.get("/blog-tags")
async def get_blog_tags():
    """Get all unique blog tags"""
    tags = await db.blog_posts.distinct("tags", {"is_published": True})
    return tags

# ===================== CONTACT ROUTES =====================

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(input: ContactSubmissionCreate):
    """Submit contact form and send email notification"""
    submission_obj = ContactSubmission(**input.model_dump())
    doc = submission_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    # Save to database
    await db.contact_submissions.insert_one(doc)
    
    # Send email notification
    if RESEND_AVAILABLE and RESEND_API_KEY:
        try:
            html_content = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a2e; color: #ffffff;">
                <h1 style="color: #9F5BFF; border-bottom: 2px solid #7B2FF7; padding-bottom: 10px;">New Contact Form Submission</h1>
                <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 20px; border-radius: 10px; border: 1px solid #7B2FF7;">
                    <p><strong style="color: #9F5BFF;">Name:</strong> {input.name}</p>
                    <p><strong style="color: #9F5BFF;">Email:</strong> {input.email}</p>
                    <p><strong style="color: #9F5BFF;">Phone:</strong> {input.phone}</p>
                    <p><strong style="color: #9F5BFF;">Business Type:</strong> {input.business_type}</p>
                    <p><strong style="color: #9F5BFF;">Message:</strong></p>
                    <p style="background: rgba(123, 47, 247, 0.1); padding: 15px; border-radius: 5px; border-left: 3px solid #7B2FF7;">{input.message}</p>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #888;">Submitted via I Design 4 U Website</p>
            </div>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [RECIPIENT_EMAIL],
                "subject": f"New Website Inquiry from {input.name} - {input.business_type}",
                "html": html_content
            }
            
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Email sent successfully to {RECIPIENT_EMAIL}")
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            # Don't fail the request if email fails
    
    return submission_obj

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact submissions (admin)"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for sub in submissions:
        if isinstance(sub.get('created_at'), str):
            sub['created_at'] = datetime.fromisoformat(sub['created_at'])
    return submissions

# ===================== SEED DATA =====================

@api_router.post("/seed-blog")
async def seed_blog_posts():
    """Seed initial blog posts for SEO"""
    # Check if already seeded
    count = await db.blog_posts.count_documents({})
    if count > 0:
        return {"message": f"Blog already has {count} posts. Skipping seed."}
    
    blog_posts = [
        {
            "slug": "professional-website-under-10000",
            "title": "How to Get a Professional Website for Under ₹10,000",
            "description": "Discover how small businesses can get a stunning, professional website without breaking the bank. Learn about affordable web design options in India.",
            "content": """<h2>Why Every Business Needs a Professional Website</h2>
<p>In today's digital age, having a professional website is not a luxury—it's a necessity. Whether you're a small business owner, freelancer, or startup founder, your website is often the first impression potential customers have of your brand.</p>

<h2>The Myth of Expensive Web Design</h2>
<p>Many business owners believe that a quality website requires a massive investment. This couldn't be further from the truth. With the right approach and the right partner, you can get a stunning, functional website for under ₹10,000.</p>

<h3>What You Can Get for Under ₹10,000</h3>
<ul>
<li>3-5 professionally designed pages</li>
<li>Mobile-responsive design</li>
<li>Basic SEO optimization</li>
<li>Contact form integration</li>
<li>Social media integration</li>
<li>WhatsApp button</li>
</ul>

<h2>Choosing the Right Web Design Partner</h2>
<p>When selecting a web design agency, look for:</p>
<ul>
<li>Portfolio of previous work</li>
<li>Transparent pricing</li>
<li>Good communication</li>
<li>After-sales support</li>
</ul>

<h2>Start Your Digital Journey Today</h2>
<p>At I Design 4 U, we specialize in creating premium websites at affordable prices. Our starter packages begin at just ₹5,999, giving you everything you need to establish a strong online presence.</p>

<p><a href="/pricing">View our pricing plans</a> and take the first step towards your professional website today!</p>""",
            "featured_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
            "category": "Affordable Websites",
            "tags": ["cheap website", "affordable website", "budget website", "website design india"],
            "seo_title": "Professional Website Under ₹10,000 | Affordable Web Design India",
            "meta_description": "Get a professional business website for under ₹10,000. Premium design, mobile-responsive, SEO-optimized. Affordable web design services in India.",
            "published_date": "January 15, 2025",
            "read_time": "5 min read"
        },
        {
            "slug": "small-business-website-2025",
            "title": "Why Every Small Business Needs a Website in 2025",
            "description": "In 2025, not having a website is like not existing. Learn why small businesses must invest in their online presence to survive and thrive.",
            "content": """<h2>The Digital Revolution is Here</h2>
<p>2025 marks a turning point for small businesses. With over 700 million internet users in India alone, your customers are online—and they're looking for you.</p>

<h2>5 Reasons Your Small Business Needs a Website</h2>

<h3>1. Credibility and Trust</h3>
<p>A professional website instantly establishes credibility. When potential customers search for your business, they expect to find a website. Not having one raises red flags.</p>

<h3>2. 24/7 Availability</h3>
<p>Unlike a physical store, your website never closes. Customers can learn about your products or services, make inquiries, or even purchase anytime, anywhere.</p>

<h3>3. Cost-Effective Marketing</h3>
<p>Compared to traditional advertising, digital marketing through your website offers incredible ROI. SEO, content marketing, and social media all drive traffic to your site.</p>

<h3>4. Compete with Bigger Players</h3>
<p>A well-designed website levels the playing field. A small bakery with a stunning website can compete with large chains for local customers.</p>

<h3>5. Customer Insights</h3>
<p>With analytics tools, you can understand your customers better—what they're looking for, how they found you, and what makes them convert.</p>

<h2>Getting Started</h2>
<p>Starting your website journey doesn't have to be complicated or expensive. At I Design 4 U, we've helped hundreds of small businesses launch their digital presence with our affordable packages.</p>

<p><a href="/portfolio">See our work</a> and imagine what we can create for your business!</p>""",
            "featured_image": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
            "category": "Small Business Websites",
            "tags": ["small business website", "startup website", "online business growth"],
            "seo_title": "Why Small Business Needs Website 2025 | Digital Presence Guide",
            "meta_description": "Discover why every small business needs a website in 2025. Learn about credibility, 24/7 availability, and cost-effective marketing for your business.",
            "published_date": "January 20, 2025",
            "read_time": "6 min read"
        },
        {
            "slug": "affordable-website-design-startups",
            "title": "Affordable Website Design for Startups: A Complete Guide",
            "description": "Startups need to be smart with their budget. Here's how to get a professional website without draining your funds.",
            "content": """<h2>The Startup Dilemma</h2>
<p>As a startup founder, you face a constant challenge: doing more with less. Your website is crucial for growth, but you can't afford to overspend. Here's how to balance quality and cost.</p>

<h2>What Startups Really Need</h2>
<p>Not every startup needs a complex, feature-rich website from day one. Focus on what matters:</p>

<h3>Essential Features</h3>
<ul>
<li>Clear value proposition</li>
<li>Professional design that reflects your brand</li>
<li>Mobile responsiveness (over 60% of traffic is mobile)</li>
<li>Contact information and forms</li>
<li>Fast loading speed</li>
<li>Basic SEO setup</li>
</ul>

<h3>Nice-to-Have Features</h3>
<ul>
<li>Blog section</li>
<li>Customer testimonials</li>
<li>Portfolio/case studies</li>
<li>Newsletter signup</li>
<li>Live chat</li>
</ul>

<h2>Budget Allocation Tips</h2>
<p>Here's how smart startups allocate their web design budget:</p>
<ul>
<li>60% - Design and development</li>
<li>20% - Content creation</li>
<li>10% - SEO optimization</li>
<li>10% - Maintenance buffer</li>
</ul>

<h2>Why Choose I Design 4 U</h2>
<p>We understand startups. That's why our Business Website package at ₹7,999 (after launch discount) includes everything a startup needs to launch and grow.</p>

<p><a href="/pricing">Check our startup-friendly pricing</a></p>""",
            "featured_image": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
            "category": "Startup Websites",
            "tags": ["startup website", "affordable website", "low cost website"],
            "seo_title": "Affordable Website Design for Startups India | Complete Guide",
            "meta_description": "Complete guide to affordable website design for startups. Learn what features you need, budget allocation tips, and how to get started.",
            "published_date": "January 25, 2025",
            "read_time": "7 min read"
        },
        {
            "slug": "website-cost-india",
            "title": "How Much Does a Website Cost in India? 2025 Pricing Guide",
            "description": "Complete breakdown of website costs in India. From budget options to premium solutions, understand what you should pay for your business website.",
            "content": """<h2>Website Pricing in India: The Full Picture</h2>
<p>The cost of a website in India can range from ₹5,000 to ₹5,00,000+. But what do you actually get at different price points? Let's break it down.</p>

<h2>Budget Category: ₹5,000 - ₹15,000</h2>
<h3>What You Get:</h3>
<ul>
<li>3-5 page website</li>
<li>Template-based or semi-custom design</li>
<li>Mobile responsive</li>
<li>Basic contact form</li>
<li>Social media links</li>
</ul>
<p><strong>Best For:</strong> Small businesses, freelancers, personal portfolios</p>

<h2>Mid-Range: ₹15,000 - ₹50,000</h2>
<h3>What You Get:</h3>
<ul>
<li>5-10 page website</li>
<li>Custom design</li>
<li>Advanced features (galleries, blogs, booking systems)</li>
<li>SEO optimization</li>
<li>CMS integration</li>
</ul>
<p><strong>Best For:</strong> Growing businesses, service providers, small e-commerce</p>

<h2>Premium: ₹50,000 - ₹2,00,000</h2>
<h3>What You Get:</h3>
<ul>
<li>10+ pages</li>
<li>Fully custom design</li>
<li>E-commerce functionality</li>
<li>Custom features and integrations</li>
<li>Advanced SEO</li>
<li>Performance optimization</li>
</ul>
<p><strong>Best For:</strong> Established businesses, large e-commerce, enterprises</p>

<h2>What Affects the Price?</h2>
<ul>
<li>Number of pages</li>
<li>Design complexity</li>
<li>Custom features</li>
<li>E-commerce functionality</li>
<li>Content creation</li>
<li>Ongoing maintenance</li>
</ul>

<h2>Our Recommendation</h2>
<p>For most small to medium businesses, our Business Website package at ₹7,999 offers the best value—premium design, essential features, and everything you need to grow online.</p>

<p><a href="/pricing">Compare our packages</a></p>""",
            "featured_image": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800",
            "category": "Website Design Tips",
            "tags": ["website cost india", "website design india", "web development pricing"],
            "seo_title": "Website Cost India 2025 | Complete Pricing Guide",
            "meta_description": "How much does a website cost in India? Complete 2025 pricing guide covering budget to premium options. Find out what you should pay for your business website.",
            "published_date": "February 1, 2025",
            "read_time": "8 min read"
        },
        {
            "slug": "business-website-features",
            "title": "Top 10 Features Every Business Website Must Have",
            "description": "Don't launch your website without these essential features. Learn what makes a business website effective and conversion-focused.",
            "content": """<h2>Essential Website Features for Business Success</h2>
<p>A beautiful website is useless if it doesn't convert visitors into customers. Here are the 10 must-have features for any business website.</p>

<h2>1. Clear Value Proposition</h2>
<p>Within 5 seconds, visitors should understand what you do and why they should care. Your headline should be clear, compelling, and customer-focused.</p>

<h2>2. Mobile Responsiveness</h2>
<p>Over 60% of web traffic comes from mobile devices. A mobile-responsive design isn't optional—it's essential.</p>

<h2>3. Fast Loading Speed</h2>
<p>53% of visitors leave if a page takes more than 3 seconds to load. Optimize your images, use efficient code, and choose good hosting.</p>

<h2>4. Easy Navigation</h2>
<p>Visitors should find what they're looking for in 3 clicks or less. Keep your menu simple and intuitive.</p>

<h2>5. Strong Call-to-Actions</h2>
<p>Every page should have a clear CTA telling visitors what to do next—contact us, get a quote, buy now, etc.</p>

<h2>6. Contact Information</h2>
<p>Make it incredibly easy for customers to reach you. Display phone, email, WhatsApp, and address prominently.</p>

<h2>7. Social Proof</h2>
<p>Testimonials, reviews, client logos, and case studies build trust and credibility.</p>

<h2>8. SSL Certificate</h2>
<p>Security matters. An SSL certificate (https) protects data and improves SEO rankings.</p>

<h2>9. SEO Optimization</h2>
<p>What's the point of a great website if no one can find it? Basic SEO helps you rank in search results.</p>

<h2>10. Analytics Integration</h2>
<p>You can't improve what you don't measure. Google Analytics helps you understand visitor behavior.</p>

<h2>Get All These Features</h2>
<p>Our website packages include all these essential features and more. We don't compromise on what matters.</p>

<p><a href="/pricing">View our feature-rich packages</a></p>""",
            "featured_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
            "category": "Website Design Tips",
            "tags": ["website features", "business website", "web design tips"],
            "seo_title": "10 Must-Have Business Website Features | Essential Guide",
            "meta_description": "Discover the 10 essential features every business website needs. From mobile responsiveness to SEO, learn what makes websites convert visitors to customers.",
            "published_date": "February 5, 2025",
            "read_time": "6 min read"
        },
        {
            "slug": "website-design-gyms-salons-local-business",
            "title": "Best Website Design for Gyms, Salons, and Local Businesses",
            "description": "Local businesses have unique website needs. Learn the best practices for gym, salon, restaurant, and other local business websites.",
            "content": """<h2>Why Local Businesses Need Specialized Websites</h2>
<p>A gym website has different needs than an accounting firm's website. Local service businesses require features that drive foot traffic and bookings.</p>

<h2>Essential Features for Local Business Websites</h2>

<h3>For Gyms & Fitness Studios</h3>
<ul>
<li>Class schedule display</li>
<li>Membership plans and pricing</li>
<li>Trainer profiles</li>
<li>Photo gallery of facilities</li>
<li>Online class booking</li>
<li>Trial session signup</li>
</ul>

<h3>For Salons & Spas</h3>
<ul>
<li>Service menu with pricing</li>
<li>Online booking system</li>
<li>Before/after gallery</li>
<li>Stylist profiles</li>
<li>Product showcase</li>
<li>Gift card options</li>
</ul>

<h3>For Restaurants & Cafes</h3>
<ul>
<li>Menu display (with photos!)</li>
<li>Online ordering</li>
<li>Table reservation</li>
<li>Location and hours</li>
<li>Customer reviews</li>
<li>Event announcements</li>
</ul>

<h2>Local SEO is Critical</h2>
<p>For local businesses, showing up in "near me" searches is crucial. Your website should include:</p>
<ul>
<li>City/area keywords</li>
<li>Google Maps integration</li>
<li>NAP (Name, Address, Phone) consistency</li>
<li>Local business schema markup</li>
<li>Google Business Profile integration</li>
</ul>

<h2>Mobile-First Design</h2>
<p>Most local business searches happen on mobile. Your website must be:</p>
<ul>
<li>Fast loading on 4G/5G</li>
<li>Easy to navigate with thumbs</li>
<li>Click-to-call enabled</li>
<li>One-tap directions</li>
</ul>

<h2>We Specialize in Local Business Websites</h2>
<p>At I Design 4 U, we've created websites for gyms, salons, restaurants, and many other local businesses. We understand your unique needs.</p>

<p><a href="/portfolio">See our local business portfolio</a></p>""",
            "featured_image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
            "category": "Small Business Websites",
            "tags": ["local business website", "gym website", "salon website", "small business website"],
            "seo_title": "Website Design for Gyms Salons Local Business | Best Practices",
            "meta_description": "Best website design practices for gyms, salons, restaurants, and local businesses. Features, local SEO tips, and mobile-first design guide.",
            "published_date": "February 10, 2025",
            "read_time": "7 min read"
        },
        {
            "slug": "cheap-vs-professional-website",
            "title": "Cheap Website vs Professional Website: What's the Difference?",
            "description": "Understanding the difference between a cheap template website and a professional custom website. Make an informed decision for your business.",
            "content": """<h2>The Price vs Value Debate</h2>
<p>You can get a website for ₹2,000 or ₹2,00,000. But what's the real difference? Let's break down what separates cheap websites from professional ones.</p>

<h2>Cheap Websites: What You're Getting</h2>

<h3>The Good:</h3>
<ul>
<li>Low initial cost</li>
<li>Quick setup</li>
<li>Basic online presence</li>
</ul>

<h3>The Reality:</h3>
<ul>
<li>Cookie-cutter templates (your site looks like thousands of others)</li>
<li>Limited customization</li>
<li>Poor mobile experience</li>
<li>Slow loading times</li>
<li>No SEO optimization</li>
<li>Little to no support</li>
<li>Hidden costs for essential features</li>
</ul>

<h2>Professional Websites: The Investment</h2>

<h3>What You Get:</h3>
<ul>
<li>Custom design reflecting your brand</li>
<li>Optimized for conversions</li>
<li>Fast, reliable performance</li>
<li>Mobile-first approach</li>
<li>SEO-ready structure</li>
<li>Ongoing support</li>
<li>Scalability for growth</li>
</ul>

<h2>The Hidden Costs of Cheap</h2>
<p>A cheap website can cost you more in the long run:</p>
<ul>
<li><strong>Lost customers:</strong> 75% of people judge credibility based on website design</li>
<li><strong>Lost rankings:</strong> Poor SEO means you're invisible on Google</li>
<li><strong>Rebuilding costs:</strong> You'll eventually need to redo everything</li>
<li><strong>Opportunity cost:</strong> Time spent on a bad website is time wasted</li>
</ul>

<h2>The Sweet Spot</h2>
<p>Here's the secret: professional doesn't have to mean expensive. At I Design 4 U, we offer professional-quality websites at affordable prices because we've streamlined our process without compromising on quality.</p>

<p>Our Business Website package at ₹7,999 gives you everything a "premium" agency charges ₹50,000+ for.</p>

<p><a href="/pricing">Compare and decide for yourself</a></p>""",
            "featured_image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
            "category": "Website Design Tips",
            "tags": ["cheap website", "professional website", "website comparison"],
            "seo_title": "Cheap vs Professional Website | What's the Real Difference?",
            "meta_description": "Cheap website vs professional website comparison. Understand the real differences, hidden costs of cheap websites, and how to get professional quality affordably.",
            "published_date": "February 15, 2025",
            "read_time": "6 min read"
        }
    ]
    
    for post_data in blog_posts:
        post = BlogPost(**post_data)
        doc = post.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.blog_posts.insert_one(doc)
    
    return {"message": f"Successfully seeded {len(blog_posts)} blog posts"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
