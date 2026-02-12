import { notFound } from 'next/navigation';
import { Shield, TrendingUp, ArrowUpRight, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { IMAGES } from '@/lib/assets';

// This would typically come from a database, but bridging for the layout demo
const categoryData: Record<string, any> = {
    'motor-insurance': {
        title: 'Motor Insurance',
        slug: 'motor-insurance',
        subtitle: 'Comprehensive protection for your vehicle against accidents, theft, and liabilities.',
        features: [
            { title: 'Zero Depreciation', desc: 'Full claim amount coverage.' },
            { title: '24/7 Support', desc: 'Roadside assistance anywhere.' },
            { title: 'Cashless Garages', desc: '5000+ network garages.' }
        ]
    },
    'life-insurance': {
        title: 'Life Insurance',
        slug: 'life-insurance',
        subtitle: 'Secure your family’s financial future with our comprehensive life cover plans.',
        features: [
            { title: 'High Settlement Ratio', desc: '98%+ claim settlement partners.' },
            { title: 'Tax Benefits', desc: 'Save tax under Sec 80C.' },
            { title: 'Critical Illness', desc: 'Cover against major illnesses.' }
        ]
    },
    'health-insurance': {
        title: 'Health Insurance',
        slug: 'health-insurance',
        subtitle: 'Medical security for you and your family against rising healthcare costs.',
        features: [
            { title: 'Cashless Hospitals', desc: 'No upfront payment needed.' },
            { title: 'Comprehensive Cover', desc: 'Pre & post hospitalization.' },
            { title: 'No Claim Bonus', desc: 'Rewards for healthy years.' }
        ]
    },
    'mutual-funds-sip': {
        title: 'Mutual Funds & SIP',
        slug: 'mutual-funds-sip',
        subtitle: 'Wealth creation strategies tailored to your risk appetite and time horizon.',
        features: [
            { title: 'Expert Management', desc: 'Curated equity & debt mix.' },
            { title: 'Goal Planning', desc: 'Aligned to your targets.' },
            { title: 'Automated Investing', desc: 'Disciplined monthly SIPs.' }
        ]
    },
    'nri-planning': {
        title: 'NRI Services',
        slug: 'nri-planning',
        subtitle: 'Specialized financial planning for Non-Resident Indians.',
        features: [
            { title: 'Tax Compliance', desc: 'DTAA & Indian tax guidance.' },
            { title: 'Remote Management', desc: 'Manage assets from abroad.' },
            { title: 'Easy Repatriation', desc: 'Smooth fund transfers.' }
        ]
    },
    'retirement-planning': {
        title: 'Retirement Planning',
        slug: 'retirement-planning',
        subtitle: 'Ensure a stress-free retirement with a steady stream of income.',
        features: [
            { title: 'Pension Plans', desc: 'Guaranteed lifetime income.' },
            { title: 'Inflation Protection', desc: 'Grow corpus over time.' },
            { title: 'Legacy Planning', desc: 'Estate structuring made easy.' }
        ]
    }
};

const mockBlogs = [
    {
        id: "1",
        title: "The Future of Family Healthcare in Post-Pandemic India",
        excerpt: "A deep dive into how critical illness coverage is evolving to meet new medical challenges and rising costs.",
        image: IMAGES.INSIGHTS.HEALTHCARE_FUTURE,
        categorySlug: "health-insurance",
        categoryName: "Health Insurance",
        date: "Feb 10, 2026",
        readTime: "8 min read"
    },
    {
        id: "2",
        title: "Wealth Transfer: Navigating Inheritance Complexity",
        excerpt: "How Term Insurance serves as the cornerstone for a modern estate planning strategy for High Net Worth individuals.",
        image: IMAGES.INSIGHTS.WEALTH_TRANSFER,
        categorySlug: "life-insurance",
        categoryName: "Life Insurance",
        date: "Feb 05, 2026",
        readTime: "12 min read"
    },
    {
        id: "3",
        title: "Motor Insurance: Beyond the Mandate",
        excerpt: "Why zero-depreciation and roadside assistance are no longer optional for the modern Indian vehicle owner.",
        image: IMAGES.MOTOR.CAR,
        categorySlug: "motor-insurance",
        categoryName: "Motor Insurance",
        date: "Jan 28, 2026",
        readTime: "6 min read"
    }
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = categoryData[slug];
    if (!category) return { title: 'Not Found' };
    return {
        title: `${category.title} | JivanSecure`,
        description: category.subtitle
    };
}

const getCategoryGradient = (slug: string) => {
    switch (slug) {
        case 'health-insurance': return 'from-cyan-600 to-blue-700';
        case 'life-insurance': return 'from-indigo-900 to-purple-800'; // Changed to sophisticated deep purple/indigo
        case 'motor-insurance': return 'from-slate-700 to-gray-800';
        case 'mutual-funds-sip': return 'from-violet-600 to-indigo-700';
        case 'nri-planning': return 'from-sky-600 to-blue-800';
        case 'retirement-planning': return 'from-emerald-600 to-teal-700';
        default: return 'from-slate-800 to-slate-900';
    }
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = categoryData[slug];

    if (!data) {
        notFound();
    }

    const filteredBlogs = mockBlogs.filter(blog => blog.categorySlug === slug);
    const bgGradient = getCategoryGradient(slug);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Minimal High-Performance Hero */}
            <section className={`pt-32 pb-20 relative overflow-hidden bg-gradient-to-br ${bgGradient}`}>
                {/* Abstract CSS Pattern - Zero Lag */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-white text-center lg:text-left">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            {data.title}
                        </h1>
                        <p className="text-xl text-white/90 font-light leading-relaxed max-w-2xl mb-10 mx-auto lg:mx-0">
                            {data.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link
                                href="/contact"
                                className="px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg hover:translate-y-[-2px]"
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
                        {data.features.map((feature: any, idx: number) => (
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
                            <h2 className="text-3xl font-bold text-slate-900 mt-2">Latest Articles on {data.title}</h2>
                        </div>
                    </div>

                    {filteredBlogs.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog) => (
                                <Link
                                    key={blog.id}
                                    href={`/post/${blog.id}`}
                                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="aspect-[16/9] overflow-hidden relative bg-slate-100">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 rounded-full shadow-sm">
                                                {blog.categoryName}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-4">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                                            <span>•</span>
                                            <span>{blog.date}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                                            {blog.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">
                                            Read Article <ArrowRight size={14} className="text-secondary" />
                                        </span>
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
                                Our experts are crafting in-depth guides for {data.title}. Check back shortly.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
