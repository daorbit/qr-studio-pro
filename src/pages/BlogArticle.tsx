import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Header from "./landing/components/Header";
import Footer from "./landing/components/Footer";
import { blogArticles } from "@/data/blogArticles";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 text-center">
          <SEOHead title="Article Not Found" description="This blog article doesn't exist." noindex />
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button variant="outline" size="sm">Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const articleStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.metaDescription,
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt,
      "author": {
        "@type": "Organization",
        "name": "QR Studio",
        "url": "https://qr-craft-studio.vercel.app/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "QR Studio",
        "logo": {
          "@type": "ImageObject",
          "url": "https://qr-craft-studio.vercel.app/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://qr-craft-studio.vercel.app/blog/${article.slug}`
      },
      "url": `https://qr-craft-studio.vercel.app/blog/${article.slug}`,
      "keywords": article.keywords,
      "articleSection": article.category,
      "wordCount": article.content.split(/\s+/).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://qr-craft-studio.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://qr-craft-studio.vercel.app/blog" },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://qr-craft-studio.vercel.app/blog/${article.slug}` },
      ]
    }
  ];

  // Simple markdown-to-html for rendering
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        // Headings
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-foreground">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-foreground">{line.slice(4)}</h3>;
        }
        // Code blocks
        if (line.startsWith('```')) {
          return null; // Skip code fences, handled inline
        }
        // Horizontal rule
        if (line.startsWith('---')) {
          return <hr key={i} className="my-8 border-border" />;
        }
        // Table handling
        if (line.startsWith('|')) {
          const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
          if (cells.every(c => c.match(/^[-:]+$/))) return null; // separator row
          const isHeader = i > 0; // simplified check
          return (
            <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-px text-xs">
              {cells.map((cell, ci) => (
                <div key={ci} className={`px-3 py-2 ${isHeader ? 'bg-muted/50' : 'bg-muted/30'}`}>
                  {renderInlineMarkdown(cell)}
                </div>
              ))}
            </div>
          );
        }
        // List items
        if (line.startsWith('- ')) {
          return (
            <li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-disc">
              {renderInlineMarkdown(line.slice(2))}
            </li>
          );
        }
        // Numbered items
        const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
        if (numberedMatch) {
          return (
            <li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-decimal">
              {renderInlineMarkdown(numberedMatch[2])}
            </li>
          );
        }
        // Empty line
        if (line.trim() === '') {
          return <div key={i} className="h-2" />;
        }
        // Code line (indented)
        if (line.startsWith('  ') && line.trim().length > 0 && !line.startsWith('  -')) {
          return (
            <code key={i} className="block text-xs bg-muted/60 px-3 py-1 font-mono text-muted-foreground">
              {line.trim()}
            </code>
          );
        }
        // Regular paragraph
        return (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">
            {renderInlineMarkdown(line)}
          </p>
        );
      });
  };

  const renderInlineMarkdown = (text: string) => {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      // Inline code
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, ci) => {
        if (cp.startsWith('`') && cp.endsWith('`')) {
          return <code key={`${i}-${ci}`} className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-primary">{cp.slice(1, -1)}</code>;
        }
        // Links
        const linkParts = cp.split(/(\[[^\]]+\]\([^)]+\))/g);
        return linkParts.map((lp, li) => {
          const linkMatch = lp.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            return (
              <Link key={`${i}-${ci}-${li}`} to={linkMatch[2]} className="text-primary hover:underline">
                {linkMatch[1]}
              </Link>
            );
          }
          // Emoji checkboxes
          return <span key={`${i}-${ci}-${li}`}>{lp}</span>;
        });
      });
    });
  };

  const shareUrl = `https://qr-craft-studio.vercel.app/blog/${article.slug}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  // Related articles (same category, excluding current)
  const related = blogArticles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        path={`/blog/${article.slug}`}
        type="article"
        keywords={article.keywords}
        structuredData={articleStructuredData}
      />
      <Header />

      <main className="pt-20 pb-16">
        <article className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                <Tag className="w-2.5 h-2.5" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-2.5 h-2.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {article.author}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1" onClick={handleShare}>
                <Share2 className="w-3 h-3" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-content">
            {renderContent(article.content)}
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 text-center">
            <h3 className="font-semibold text-lg mb-2">Ready to Create Your QR Code?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join thousands of businesses using QR Studio to create custom QR codes with analytics.
            </p>
            <Link to="/signup">
              <Button size="sm" className="text-xs">Get Started Free</Button>
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-16">
            <h2 className="text-lg font-semibold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group p-4 rounded-lg border border-border hover:border-primary/40 transition-colors"
                >
                  <span className="text-[10px] text-primary font-medium">{r.category}</span>
                  <h3 className="text-sm font-medium mt-1 group-hover:text-primary transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  <span className="text-[10px] text-muted-foreground mt-2 block">{r.readTime}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticle;
