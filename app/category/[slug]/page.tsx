
import Link from 'next/link';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabaseServer';
import { notFound } from 'next/navigation';
import CategoryVisual from '@/components/CategoryVisual';
import { Shield, TrendingUp, Phone, ArrowUpRight } from 'lucide-react';

// This would typically come from a database, but bridging for the layout demo
const categoryData: Record<string, any> = {
    'motor': {
        title: 'Motor Insurance',
        subtitle: 'Comprehensive protection for your vehicle against accidents, theft, and liabilities.',
        features: [
            { title: 'Zero Depreciation', desc: 'Get full claim amount without depreciation deduction on parts.' },
            { title: '24/7 Roadside Assistance', desc: 'Breakdown support anywhere, anytime across India.' },
            { title: 'Cashless Garages', desc: 'Network of 5000+ garages for cashless repairs.' }
        ]
    },
    'life': {
        title: 'Life Insurance',
        subtitle: 'Secure your family’s financial future with our comprehensive life cover plans.',
        features: [
            { title: 'High Claim Settlement', desc: 'Partnering with insurers having 98%+ claim settlement ratio.' },
            { title: 'Tax Benefits', desc: 'Save tax under Section 80C and 10(10D) of Income Tax Act.' },
            { title: 'Critical Illness Cover', desc: 'Additional protection against major illnesses.' }
        ]
    },
    'health': {
        title: 'Health Insurance',
        subtitle: 'Medical security for you and your family against rising healthcare costs.',
        features: [
            { title: 'Cashless Hospitals', desc: 'Access to top hospitals without paying upfront.' },
            { title: 'Pre/Post Hospitalization', desc: 'Coverage for expenses 60 days before and 180 days after admission.' },
            { title: 'No Claim Bonus', desc: 'Increase in sum insured for every claim-free year.' }
        ]
    },
    'mutual-fund': {
        title: 'Mutual Funds & SIP',
        subtitle: 'Wealth creation strategies tailored to your risk appetite and time horizon.',
        features: [
            { title: 'Expert Portfolio Management', desc: 'Curated mix of equity and debt funds.' },
            { title: 'Goal Based Planning', desc: 'Align investments to goals like home, education, or retirement.' },
            { title: 'Automated Investing', desc: 'Disciplined savings through monthly SIPs.' }
        ]
    },
    'nri-planning': {
        title: 'NRI Services',
        subtitle: 'Specialized financial planning for Non-Resident Indians.',
        features: [
            { title: 'Tax Compliance', desc: 'Guidance on DTAA and Indian tax laws.' },
            { title: 'Investment Management', desc: 'Remote management of Indian assets and portfolio.' },
            { title: 'Repatriation Services', desc: 'Smooth transfer of funds back to your country of residence.' }
        ]
    },
    'retirement-planning': {
        title: 'Retirement Planning',
        subtitle: 'Ensure a stress-free retirement with a steady stream of income.',
        features: [
            { title: 'Pension Plans', desc: 'Guaranteed lifetime income options.' },
            { title: 'Inflation Beating Returns', desc: 'Strategies to grow your corpus faster than inflation.' },
            { title: 'Legacy Planning', desc: 'Structuring your estate for the next generation.' }
        ]
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    // Try static data first
    const category = categoryData[slug];
    if (category) {
        return {
            title: `${category.title} | JivanSecure`,
            description: category.subtitle
        };
    }

    // Try fetching from DB
    const supabase = await createClient();
    const { data: dbCategory } = await supabase
        .from('categories')
        .select('title')
        .eq('slug', slug)
        .single();

    if (dbCategory) {
        return {
            title: `${dbCategory.title} | JivanSecure`,
            description: `Expert insights and comprehensive guides on ${dbCategory.title}.`
        };
    }

    return { title: 'Not Found' };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const staticData = categoryData[slug];

    const supabase = await createClient();

    // 1. Fetch Category from DB to ensure it exists and get ID
    const { data: dbCategory } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

    // If not in static config AND not in DB, 404
    if (!staticData && !dbCategory) {
        return notFound();
    }

    const title = staticData?.title || dbCategory?.title;
    const subtitle = staticData?.subtitle || `Expert insights and comprehensive guides on ${title}.`;
    const features = staticData?.features || [
        { title: 'Expert Analysis', desc: 'In-depth articles from industry veterans.' },
        { title: 'Latest Trends', desc: 'Stay updated with the changing landscape.' },
        { title: 'Practical Guides', desc: 'Step-by-step advice for your financial journey.' }
    ];

    // 2. Fetch Posts for this Category
    const { data: posts } = await supabase
        .from('posts')
        .select('*, profiles(full_name)')
        .eq('category_id', dbCategory?.id) // Use DB ID if available
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    return (
        <main className="flex-1">
            {/* Hero Section for Category */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex items-center">
                {/* Background Visual */}
                <div className="absolute inset-0 -z-10">
                    <CategoryVisual type={slug} className="w-full h-full rounded-none opacity-40" animate={true} />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/80 backdrop-blur border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider shadow-sm">
                            <TrendingUp size={12} />
                            <span>Category Focus</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                            {title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light mb-10 max-w-2xl">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features/Insights Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-3 gap-12">
                        {features.map((feature: any, idx: number) => (
                            <div key={idx} className="group">
                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors duration-300">
                                    <Shield className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-light">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOG POSTS SECTION */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="mb-12">
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">EXPERT INSIGHTS</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Latest Articles on {title}</h2>
                    </div>

                    {posts && posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post: any) => (
                                <Link key={post.id} href={`/post/${post.slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-2xl transition-all duration-300">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 relative overflow-hidden">
                                        {post.cover_image_url ? (
                                            <img
                                                src={post.cover_image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50">
                                                <Shield size={64} className="text-slate-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-lg">
                                            {title}
                                        </div>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                6 min read
                                            </span>
                                            <span>•</span>
                                            <time>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                                            {/* Extract first text from blocks if available */}
                                            {post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Read this insightful article to learn more...'}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-2">
                                                Read Article
                                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <Shield size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 text-lg font-medium">No articles published yet in this category.</p>
                            <p className="text-slate-400 text-sm mt-2">Check back soon for expert insights!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Need personalized advice?</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        Talk to our experts today and get a personalized plan that suits your needs.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-200"
                    >
                        <Phone size={18} />
                        Contact Consultant
                    </Link>
                </div>
            </section>
        </main>
    );
}
