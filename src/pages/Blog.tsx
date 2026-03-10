import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "./landing/components/Header";
import Footer from "./landing/components/Footer";
import { blogArticles, blogCategories } from "@/data/blogArticles";

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "QR Studio Blog",
  "description": "Expert guides, tutorials, and tips on QR codes — creation, design, analytics, and use cases for business.",
  "url": "https://qr-craft-studio.vercel.app/blog",
  "publisher": {
    "@type": "Organization",
    "name": "QR Studio",
    "logo": "https://qr-craft-studio.vercel.app/logo.png"
  },
  "blogPost": blogArticles.map(article => ({
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.metaDescription,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": { "@type": "Organization", "name": "QR Studio" },
    "url": `https://qr-craft-studio.vercel.app/blog/${article.slug}`,
  })),
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="QR Code Blog - Guides, Tips & Tutorials"
        description="Learn everything about QR codes. Expert guides on QR code creation, custom design, scan analytics, business use cases, and best practices."
        path="/blog"
        keywords="QR code blog, QR code guides, QR code tutorials, QR code tips, how to use QR codes"
        structuredData={blogStructuredData}
      />
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              QR Code <span className="text-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Expert guides, tutorials, and tips to master QR codes for your business.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {blogCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map(article => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Cover */}
                <div className={`h-36 bg-gradient-to-br ${article.coverColor} flex items-center justify-center`}>
                  <span className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">📱</span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      <Tag className="w-2.5 h-2.5" />
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm mt-12">
              No articles in this category yet. Check back soon!
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
