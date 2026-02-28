import { notFound } from 'next/navigation';
import { Shield, TrendingUp, ArrowUpRight, Clock, ArrowRight, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { IMAGES } from '@/lib/assets';

export const revalidate = 3600;

export async function generateStaticParams() {
    return [
        { slug: 'health' },
        { slug: 'life' },
        { slug: 'motor' },
        { slug: 'mutual-fund' },
        { slug: 'nri-planning' },
        { slug: 'retirement-planning' },
    ];
}

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

import { createClient, createStatelessClient } from '@/lib/supabaseServer';
import { getPostUrl } from '@/lib/blogUtils';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const staticData = categoryData[slug];

    if (staticData) {
        return {
            title: `${staticData.title} | JivanSecure`,
            description: staticData.subtitle
        };
    }

    // Try fetching from DB if not in static list
    const supabase = createStatelessClient();
    const { data: dbCategory } = await supabase
        .from('categories')
        .select('title')
        .eq('slug', slug)
        .single();

    if (dbCategory) {
        return {
            title: `${dbCategory.title} | JivanSecure Insights`,
            description: `Expert insights and comprehensive guides on ${dbCategory.title}.`
        };
    }

    return { title: 'Not Found' };
}

const getCategoryAssets = (slug: string) => {
    switch (slug) {
        case 'health': return { gradient: 'from-cyan-600/90 to-blue-700/90', image: IMAGES.HEALTH.FAMILY };
        case 'life': return { gradient: 'from-indigo-900/90 to-purple-800/90', image: IMAGES.LIFE.TERM };
        case 'motor': return { gradient: 'from-slate-800/90 to-slate-900/90', image: IMAGES.MOTOR.CAR };
        case 'mutual-fund': return { gradient: 'from-violet-600/90 to-indigo-800/90', image: IMAGES.INSIGHTS.WEALTH_TRANSFER };
        case 'nri-planning': return { gradient: 'from-sky-700/90 to-blue-900/90', image: IMAGES.GENERAL.BUSINESS };
        case 'retirement-planning': return { gradient: 'from-emerald-700/90 to-teal-900/90', image: IMAGES.HEALTH.SENIOR };
        default: return { gradient: 'from-slate-800/90 to-slate-900/90', image: IMAGES.GENERAL.HOME };
    }
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const staticData = categoryData[slug];

    const supabase = createStatelessClient();

    // 1. Fetch Category or Subcategory from DB
    const { data: dbCategory } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

    let dbSubcategory = null;
    let actualCategory = dbCategory;

    if (!dbCategory) {
        // If not a category, check if it's a subcategory
        const { data: sub } = await supabase
            .from('subcategories')
            .select('*, categories(*)')
            .eq('slug', slug)
            .single();

        if (sub) {
            dbSubcategory = sub;
            actualCategory = sub.categories;
        }
    }

    if (!staticData && !actualCategory && !dbSubcategory) {
        notFound();
    }

    const title = dbSubcategory ? dbSubcategory.title : (actualCategory?.title || staticData?.title);
    const subtitle = dbSubcategory
        ? `Expert guides and insights for ${dbSubcategory.title} under ${actualCategory?.title}.`
        : (staticData?.subtitle || `Expert insights and comprehensive guides on ${title}.`);

    const features = staticData?.features || [
        { title: 'Policy Audits', desc: 'Comprehensive review of your existing coverage.' },
        { title: 'Expert Advisory', desc: 'Industry veterans protecting your interests.' },
        { title: 'Quick Settlement', desc: 'Support during the entire claim lifecycle.' }
    ];

    // 2. Fetch Posts for this Category or Subcategory
    let postsQuery = supabase
        .from('posts')
        .select('*, profiles(full_name), categories(title, slug), subcategories(title, slug)')
        .eq('status', 'published');

    if (dbSubcategory) {
        postsQuery = postsQuery.eq('subcategory_id', dbSubcategory.id);
    } else if (actualCategory) {
        postsQuery = postsQuery.eq('category_id', actualCategory.id);
    }

    const { data: posts } = await postsQuery.order('created_at', { ascending: false });

    // For better UI, we might want to know the category gradient from the actual category
    const categorySlugForAsset = actualCategory?.slug || slug;
    const { gradient: bgGradient, image: heroImage } = getCategoryAssets(categorySlugForAsset);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Immersive Image + Gradient Hero */}
            <section className="pt-32 pb-20 relative overflow-hidden bg-slate-900 border-b border-slate-100">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt={`${title} Insurance Background`}
                        className="w-full h-full object-cover opacity-60"
                        loading="eager"
                    />
                </div>

                {/* Gradient Overlay Layer */}
                <div className={`absolute inset-0 z-0 bg-gradient-to-r ${bgGradient}`} />

                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center lg:text-left">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-8 shadow-2xl">
                            Insurance Portfolio
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-tight text-white drop-shadow-sm">
                            {title}
                        </h1>
                        <p className="text-lg text-white/90 font-medium leading-relaxed max-w-2xl mb-10 mx-auto lg:mx-0">
                            {subtitle}
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <Link
                                href="/contact"
                                className="px-6 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 text-sm"
                            >
                                Get Expert Audit <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* MINIMALISTIC FEATURE STRIP */}
            <div className="container mx-auto px-6 lg:px-12 -mt-8 relative z-30 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,31,84,0.12)] p-2">
                    <div className="flex flex-col md:flex-row items-stretch gap-1">
                        {features.map((feature: any, idx: number) => (
                            <div key={idx} className="flex-1 p-6 md:p-8 flex items-start gap-5 group rounded-2xl hover:bg-white/50 transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-[#00a859] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#00a859]/20 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={18} strokeWidth={3} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-black text-[#001f54] text-sm tracking-tight">{feature.title}</h3>
                                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed opacity-80">{feature.desc}</p>
                                </div>
                                {idx < features.length - 1 && (
                                    <div className="hidden md:block w-px bg-slate-200/50 h-8 self-center ml-auto" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB SECTION */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00a859]/10 text-[#00a859] font-bold text-[9px] uppercase tracking-widest mb-4">
                                <Sparkles size={12} /> Knowledge Hub
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#001f54] tracking-tight">Latest from {title}</h2>
                        </div>
                        <Link href="/blogs" className="font-bold text-[10px] uppercase tracking-widest text-[#00a859] hover:text-[#001f54] transition-colors flex items-center gap-2">
                            Explore All Blogs <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    {posts && posts.length > 0 ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {posts.map((post: any) => (
                                <Link
                                    key={post.id}
                                    href={getPostUrl(post)}
                                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[6px] bg-[#00a859] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                                        {post.cover_image_url ? (
                                            <img
                                                src={post.cover_image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                                                <Shield size={32} className="text-slate-200 group-hover:text-[#00a859]/20 transition-all duration-700 group-hover:rotate-12" />
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-white/95 backdrop-blur text-[9px] font-black uppercase tracking-[0.2em] text-[#001f54] rounded-xl shadow-lg border border-slate-50">
                                                {title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#00a859]" /> 6 MIN</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-[#001f54] mb-2 group-hover:text-[#00a859] transition-colors line-clamp-2 leading-tight tracking-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2 mb-4 font-medium opacity-70">
                                            {post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Read this professional analysis...'}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-50">
                                            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#00a859] uppercase tracking-widest group-hover:gap-3 transition-all">
                                                Read Analysis <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#001f54]/10">
                                <Bookmark size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#001f54] mb-2 tracking-tight">Insights Pending</h3>
                            <p className="text-slate-500 max-w-xs mx-auto text-xs font-medium leading-relaxed">
                                Our experts are currently drafting new guides and analysis for the {title} sector.
                            </p>
                            <Link href="/contact" className="mt-8 inline-block px-8 py-3 bg-[#001f54] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#00a859] transition-all">
                                Book Personal Audit
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
