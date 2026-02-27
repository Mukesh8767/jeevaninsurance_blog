import { notFound } from 'next/navigation';
import { Shield, TrendingUp, ArrowUpRight, Clock, ArrowRight, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

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

import { createClient } from '@/lib/supabaseServer';
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
    const supabase = await createClient();
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

    return { title: 'Category | JivanSecure' };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const staticData = categoryData[slug];

    const supabase = await createClient();

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

    return (
        <main className="min-h-screen bg-[#f8fafc] selection:bg-[#00a859]/20 selection:text-[#001f54]">
            {/* BRANDED PREMIUM HERO */}
            <section className="pt-40 pb-32 relative overflow-hidden bg-[#001f54]">
                {/* Visual Elements */}
                <div className="absolute inset-0 bg-[#00a859]/5" />
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#00a859]/10 to-transparent" />
                <div className="absolute -bottom-40 -left-20 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[120px]" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-[#00a859] flex items-center justify-center text-white shadow-xl shadow-[#00a859]/20">
                                <Shield size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00a859]">JivanSecure Ecosystem</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
                            {title}
                        </h1>

                        <p className="text-xl md:text-2xl text-blue-100/70 font-medium leading-relaxed max-w-2xl mb-12">
                            {subtitle}
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <Link
                                href="/contact"
                                className="px-10 py-5 bg-[#00a859] text-white font-black rounded-2xl hover:bg-white hover:text-[#001f54] transition-all flex items-center gap-3 shadow-2xl shadow-[#00a859]/20 group uppercase text-xs tracking-widest"
                            >
                                Get Expert Audit <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHITE DIVIDER CARD STRIP */}
            <div className="container mx-auto px-6 lg:px-12 -mt-16 relative z-30">
                <div className="bg-white rounded-[2.5rem] shadow-[0_25px_80px_-20px_rgba(0,31,84,0.15)] border border-slate-50 overflow-hidden">
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-50">
                        {features.map((feature: any, idx: number) => (
                            <div key={idx} className="p-10 flex flex-col gap-4 group hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#00a859]/5 text-[#00a859] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-[#001f54] text-lg mb-2 tracking-tight">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB SECTION */}
            <section className="py-32">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00a859]/10 text-[#00a859] font-black text-[10px] uppercase tracking-widest mb-6">
                                <Sparkles size={14} /> Knowledge Hub
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-[#001f54] tracking-tighter">Latest from {title}</h2>
                        </div>
                        <Link href="/blogs" className="font-black text-xs uppercase tracking-widest text-[#00a859] hover:text-[#001f54] transition-colors flex items-center gap-2">
                            Explore All Blogs <ArrowUpRight size={18} />
                        </Link>
                    </div>

                    {posts && posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post: any) => (
                                <Link
                                    key={post.id}
                                    href={getPostUrl(post)}
                                    className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col h-full relative"
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
                                                <Shield size={64} className="text-slate-200 group-hover:text-[#00a859]/20 transition-all duration-700 group-hover:rotate-12" />
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-white/95 backdrop-blur text-[9px] font-black uppercase tracking-[0.2em] text-[#001f54] rounded-xl shadow-lg border border-slate-50">
                                                {title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">
                                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#00a859]" /> 6 MIN</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-[#001f54] mb-4 group-hover:text-[#00a859] transition-colors line-clamp-2 leading-tight tracking-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">
                                            {post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Read this professional analysis from JivanSecure on why this topic matters for your financial future...'}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-slate-50">
                                            <span className="inline-flex items-center gap-2 text-xs font-black text-[#00a859] uppercase tracking-widest group-hover:gap-3 transition-all">
                                                Read Analysis <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 shadow-inner">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#001f54]/10">
                                <Bookmark size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-[#001f54] mb-3">Insights Pending</h3>
                            <p className="text-slate-500 max-w-sm mx-auto font-medium">
                                Our experts are currently drafting new guides and analysis for the {title} sector.
                                Request a consultation for direct advice.
                            </p>
                            <Link href="/contact" className="mt-10 inline-block px-10 py-4 bg-[#001f54] text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-[#00a859] transition-all">
                                Book Personal Audit
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
