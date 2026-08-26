import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import { generateBreadcrumbSchema } from '../utils/seoData';
import { publicAsset } from '../utils/pathHelpers';

// ─── Static mock blog posts (no backend needed) ───────────────────────────────
const MOCK_BLOGS = [
  {
    _id: '1',
    slug: 'how-to-prepare-for-bond-cleaning',
    title: 'How to Prepare for Your Bond Clean — A Complete Checklist',
    excerpt: 'Moving out soon? Here\'s everything you need to do before your bond cleaning appointment to maximise your chances of getting your full bond back.',
    tags: ['Bond Cleaning', 'Moving Tips'],
    createdAt: '2025-03-10T00:00:00Z',
    views: 142,
    featuredImage: null,
  },
  {
    _id: '2',
    slug: 'carpet-cleaning-tips-brisbane',
    title: 'Top 5 Carpet Cleaning Tips for Brisbane Homeowners',
    excerpt: 'Brisbane\'s humidity can make carpet maintenance tricky. Learn the best practices to keep your carpets fresh, clean and free from mould all year round.',
    tags: ['Carpet Cleaning', 'Home Tips'],
    createdAt: '2025-04-18T00:00:00Z',
    views: 98,
    featuredImage: null,
  },
  {
    _id: '3',
    slug: 'roof-cleaning-why-it-matters',
    title: 'Why Roof Cleaning Should Be Part of Your Annual Home Maintenance',
    excerpt: 'Lichen, moss and grime build-up can shorten your roof\'s lifespan significantly. Discover why regular professional roof cleaning saves you money long-term.',
    tags: ['Roof Cleaning', 'Maintenance'],
    createdAt: '2025-05-22T00:00:00Z',
    views: 74,
    featuredImage: null,
  },
];

// Map blog tags to local images
const getBlogImage = (blog) => {
  if (blog.featuredImage?.url) return blog.featuredImage.url;
  const tags = (blog.tags || []).map(t => t.toLowerCase()).join(' ');
  if (tags.includes('carpet')) return publicAsset('/images/Carpet cleaning/PHOTO-2026-02-09-16-12-53.jpg');
  if (tags.includes('bond') || tags.includes('lease') || tags.includes('moving')) return publicAsset('/images/BondEnd of lease/IMG_3067.jpg');
  if (tags.includes('roof')) return publicAsset('/images/Exterior Roof/IMG_2788.PNG');
  if (tags.includes('gutter')) return publicAsset('/images/Exterior Gutter/29768303-e678-4624-aba9-ed2acb7d2dd7.JPG');
  if (tags.includes('solar')) return publicAsset('/images/Exterior Solar/05a118f6-76ce-4a1e-a0c6-5aa514cca7e3.JPG');
  if (tags.includes('pressure') || tags.includes('driveway')) return publicAsset('/images/Exterior Drivwway/80fff1e8-5098-4dde-ad47-45b979652525.JPG');
  return publicAsset('/images/BondEnd of lease/IMG_2811.jpg');
};

const BlogPage = () => {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);

  return (
    <>
      <SEOHead
        title="Blog - Cleaning Duck Australia"
        description="Read our latest articles on cleaning tips, property maintenance, and industry news from the experts at Cleaning Duck Australia."
        canonical="/blog"
        structuredData={[breadcrumb]}
      />

      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Cleaning Duck Australia Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto text-lg"
          >
            Expert advice, cleaning guides, and updates from the Cleaning Duck team.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section bg-neutral-50 min-h-screen">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_BLOGS.map((blog, idx) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow border border-neutral-100 flex flex-col h-full"
              >
                <Link to={`/blog/${blog.slug}`} className="block relative h-48 overflow-hidden group">
                  <img
                    src={getBlogImage(blog)}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  {blog.tags?.[0] && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {blog.tags[0]}
                    </span>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-neutral-400 font-medium mb-3 flex items-center gap-2">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{blog.views} Views</span>
                  </div>
                  <Link to={`/blog/${blog.slug}`}>
                    <h2 className="text-xl font-bold text-neutral-800 mb-3 hover:text-orange-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="text-neutral-500 text-sm mb-5 line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-bold group hover:text-orange-600 transition-colors"
                  >
                    Read Article
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
