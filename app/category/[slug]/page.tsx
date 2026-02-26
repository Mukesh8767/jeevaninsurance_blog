import { notFound } from 'next/navigation';
import { Shield, TrendingUp, ArrowUpRight, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
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

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    cover_image_url: string;
    created_at: string;
    profiles: { full_name: string } | null;
    blocks: any[];
}

import { createClient } from '@/lib/supabaseServer';

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

    const supabase = await createClient();

    // 1. Fetch Category or Subcategory from DB
    // We try to find if the slug belongs to a category or a subcategory
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
        { title: 'Expert Analysis', desc: 'In-depth articles from industry veterans.' },
        { title: 'Latest Trends', desc: 'Stay updated with the changing landscape.' },
        { title: 'Practical Guides', desc: 'Step-by-step advice for your financial journey.' }
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
            <section className="pt-40 pb-24 relative overflow-hidden bg-slate-900 border-b border-slate-100">
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
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight text-white drop-shadow-md">
                            {title}
                        </h1>
                        <p className="text-xl text-white/90 font-medium leading-relaxed max-w-2xl mb-12 mx-auto lg:mx-0 drop-shadow-md">
                            {subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/20 hover:-translate-y-1"
                            >
                                Get a Quote <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compressed Features Strip */}
            <div className="bg-white border-b border-slate-200 shadow-sm relative z-20 -mt-8 mx-4 md:mx-12 rounded-xl flex overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <div className="flex min-w-max p-6 md:p-8 divide-x divide-slate-100">
                        {features.map((feature: any, idx: number) => (
                            <div key={idx} className="px-8 first:pl-4 last:pr-4 flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-primary/5 text-primary">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm">{feature.title}</h3>
                                    <p className="text-xs text-slate-500 font-medium">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Priority: Blogs Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-secondary font-bold uppercase tracking-widest text-xs">Expert Insights</span>
                            <h2 className="text-3xl font-bold text-slate-900 mt-2">Latest Articles on {title}</h2>
                        </div>
                    </div>

                    {posts && posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post: any) => (
                                <Link
                                    key={post.id}
                                    href={`/post/${post.slug}`}
                                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                                >
                                    <div className="aspect-[16/9] overflow-hidden relative bg-slate-100">
                                        {post.cover_image_url ? (
                                            <img
                                                src={post.cover_image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50">
                                                <Shield size={64} className="text-slate-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 rounded-full shadow-sm">
                                                {title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-4">
                                            <span className="flex items-center gap-1"><Clock size={12} /> 6 min read</span>
                                            <span>•</span>
                                            <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                                            {post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Read this insightful article to learn more...'}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">
                                                Read Article <ArrowRight size={14} className="text-secondary" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Coming Soon</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Our experts are crafting in-depth guides for {title}. Check back shortly.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
