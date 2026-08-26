import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import { generateBreadcrumbSchema, generateBlogPostingSchema } from '../utils/seoData';
import { BRAND } from '../utils/constants';
import { publicAsset } from '../utils/pathHelpers';

// ─── Static mock blog data ────────────────────────────────────────────────────
const MOCK_BLOGS = [
  {
    _id: '1',
    slug: 'how-to-prepare-for-bond-cleaning',
    title: 'How to Prepare for Your Bond Clean — A Complete Checklist',
    excerpt: "Moving out soon? Here's everything you need to do before your bond cleaning appointment to maximise your chances of getting your full bond back.",
    tags: ['Bond Cleaning', 'Moving Tips'],
    createdAt: '2025-03-10T00:00:00Z',
    updatedAt: '2025-03-10T00:00:00Z',
    views: 142,
    author: { name: 'Cleaning Duck Team' },
    featuredImage: null,
    content: `
      <h2>Why Bond Cleaning Matters</h2>
      <p>End of lease cleaning — also called bond cleaning — is one of the most important steps when moving out of a rental property. Your landlord or property manager will inspect the property thoroughly, and if it's not up to standard, they can claim from your bond to cover cleaning costs.</p>
      <h2>What to Do Before the Cleaner Arrives</h2>
      <ul>
        <li><strong>Remove all your belongings</strong> — the property should be completely empty.</li>
        <li><strong>Defrost the freezer</strong> at least 24 hours before the clean.</li>
        <li><strong>Ensure access</strong> — make sure power and water are still connected.</li>
        <li><strong>Inform about pets</strong> — let the cleaning company know if pets were kept at the property.</li>
      </ul>
      <h2>What's Included in a Bond Clean?</h2>
      <p>A professional bond clean typically includes cleaning of all rooms, kitchen (oven, rangehood, cupboards), bathrooms, windows (internal), light fittings, skirting boards, and more. Carpet steam cleaning is usually an add-on.</p>
      <h2>Final Tips</h2>
      <p>Book your bond clean at least 3–5 days before your final inspection date, and keep your receipt as proof of professional cleaning — most real estate agents require it.</p>
    `,
  },
  {
    _id: '2',
    slug: 'carpet-cleaning-tips-brisbane',
    title: 'Top 5 Carpet Cleaning Tips for Brisbane Homeowners',
    excerpt: "Brisbane's humidity can make carpet maintenance tricky. Learn the best practices to keep your carpets fresh, clean and free from mould all year round.",
    tags: ['Carpet Cleaning', 'Home Tips'],
    createdAt: '2025-04-18T00:00:00Z',
    updatedAt: '2025-04-18T00:00:00Z',
    views: 98,
    author: { name: 'Cleaning Duck Team' },
    featuredImage: null,
    content: `
      <h2>Why Brisbane Carpets Need Special Attention</h2>
      <p>Brisbane's subtropical climate — with its high humidity and warm temperatures — creates the perfect environment for dust mites, mould spores and bacteria to thrive in carpets. Regular vacuuming helps, but it's not enough on its own.</p>
      <h2>5 Expert Tips</h2>
      <ol>
        <li><strong>Vacuum at least twice a week</strong> using a HEPA-filter vacuum to trap allergens.</li>
        <li><strong>Act fast on spills</strong> — blot (don't rub) immediately with a clean cloth.</li>
        <li><strong>Use rugs in high-traffic areas</strong> to protect your carpet underneath.</li>
        <li><strong>Keep humidity low</strong> — use air conditioning or a dehumidifier in wet months.</li>
        <li><strong>Professional steam clean every 12 months</strong> — this kills bacteria and removes deep-set dirt that vacuums can't reach.</li>
      </ol>
      <h2>When to Call the Professionals</h2>
      <p>If you notice persistent odours, visible staining, or allergy symptoms worsening at home, it's time to book a professional carpet steam clean. Our team services Brisbane, Logan, Ipswich, Gold Coast and Sunshine Coast.</p>
    `,
  },
  {
    _id: '3',
    slug: 'roof-cleaning-why-it-matters',
    title: 'Why Roof Cleaning Should Be Part of Your Annual Home Maintenance',
    excerpt: "Lichen, moss and grime build-up can shorten your roof's lifespan significantly. Discover why regular professional roof cleaning saves you money long-term.",
    tags: ['Roof Cleaning', 'Maintenance'],
    createdAt: '2025-05-22T00:00:00Z',
    updatedAt: '2025-05-22T00:00:00Z',
    views: 74,
    author: { name: 'Cleaning Duck Team' },
    featuredImage: null,
    content: `
      <h2>The Hidden Cost of a Dirty Roof</h2>
      <p>Most homeowners don't think about their roof until there's a leak. But by then, the damage — caused by years of lichen, moss, and algae growth — can already be extensive and expensive to repair.</p>
      <h2>What Grows on Your Roof?</h2>
      <p>In Queensland's climate, roofs are particularly susceptible to:</p>
      <ul>
        <li><strong>Lichen</strong> — deeply embedded organisms that etch into roof tiles</li>
        <li><strong>Moss</strong> — holds moisture against tiles, accelerating deterioration</li>
        <li><strong>Black algae</strong> — causes unsightly staining and reduces reflectivity</li>
      </ul>
      <h2>Benefits of Annual Roof Cleaning</h2>
      <p>Regular professional roof cleaning extends your roof's lifespan, maintains your home's curb appeal, helps maintain your insurance coverage, and can improve energy efficiency by restoring your roof's reflective properties.</p>
      <h2>Professional vs DIY</h2>
      <p>Roof cleaning involves working at height with pressure equipment — always best left to professionals with the right safety gear and insurance. Our team is fully insured and uses soft-wash techniques that clean thoroughly without damaging tiles.</p>
    `,
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

const BlogDetailPage = () => {
  const { slug } = useParams();

  const blog = MOCK_BLOGS.find(b => b.slug === slug);
  const recentBlogs = MOCK_BLOGS.filter(b => b.slug !== slug).slice(0, 3);

  if (!blog) return <Navigate to="/blog" replace />;

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: blog.title, path: `/blog/${blog.slug}` },
  ]);

  const blogImage = getBlogImage(blog);
  const blogPosting = generateBlogPostingSchema(blog, blogImage);

  return (
    <>
      <SEOHead
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.tags}
        ogImage={blogImage}
        canonical={`/blog/${blog.slug}`}
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt}
        structuredData={[breadcrumb, blogPosting]}
        type="article"
      />

      {/* Hero Section */}
      <div className="relative min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blogImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <div className="container-custom relative z-10 pb-16 pt-24">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-orange-300 line-clamp-1">{blog.title}</li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {blog.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {blog.tags.map(tag => (
                  <span key={tag} className="bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {blog.author?.name?.charAt(0) || 'C'}
                </span>
                <span>{blog.author?.name || 'Cleaning Duck'}</span>
              </div>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span>{blog.views} Views</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left - Article */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-soft border border-neutral-100">
                <div
                  className="prose prose-lg md:prose-xl max-w-none prose-headings:text-neutral-800 prose-a:text-orange-600 hover:prose-a:text-orange-500 prose-img:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Share block */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-bold text-neutral-700">Share this article:</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                  f
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                  t
                </a>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-8">
              {/* Quick Quote Widget */}
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #7c3200, #c05411)' }}>
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-3">Need Professional Cleaning?</h3>
                  <p className="text-white/80 text-sm mb-6">Get your home or business looking pristine with our expert team.</p>
                  <Link to="/request-quote" className="block w-full text-center bg-white text-orange-700 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
                    Request Free Quote
                  </Link>
                  <a href={BRAND.phoneHref.primary} className="block w-full text-center text-white border border-white/30 font-bold py-3 rounded-xl mt-3 hover:bg-white/10 transition-colors">
                    📞 {BRAND.phone.primary}
                  </a>
                </div>
              </div>

              {/* Recent Posts */}
              {recentBlogs.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-soft border border-neutral-100">
                  <h3 className="font-bold text-lg text-neutral-800 mb-5">Recent Articles</h3>
                  <div className="space-y-5">
                    {recentBlogs.map(rb => (
                      <Link key={rb._id} to={`/blog/${rb.slug}`} className="group flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={getBlogImage(rb)}
                            alt={rb.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-neutral-800 group-hover:text-orange-600 transition-colors line-clamp-2 mb-1">
                            {rb.title}
                          </h4>
                          <p className="text-xs text-neutral-400">
                            {new Date(rb.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
