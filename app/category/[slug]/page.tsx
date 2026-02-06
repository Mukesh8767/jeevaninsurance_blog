import { notFound } from 'next/navigation';
import Hero from '@/components/Hero'; // Reusing layout elements but will customize
import AbstractBackground from '@/components/AbstractBackground';
import CategoryVisual from '@/components/CategoryVisual';
import { Shield, TrendingUp, Users, Heart, Phone, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

// This would typically come from a database, but bridging for the layout demo
const categoryData: Record<string, any> = {
    'motor-insurance': {
        title: 'Motor Insurance',
        subtitle: 'Comprehensive protection for your vehicle against accidents, theft, and liabilities.',
        features: [
            { title: 'Zero Depreciation', desc: 'Get full claim amount without depreciation deduction on parts.' },
            { title: '24/7 Roadside Assistance', desc: 'Breakdown support anywhere, anytime across India.' },
            { title: 'Cashless Garages', desc: 'Network of 5000+ garages for cashless repairs.' }
        ]
    },
    'life-insurance': {
        title: 'Life Insurance',
        subtitle: 'Secure your family’s financial future with our comprehensive life cover plans.',
        features: [
            { title: 'High Claim Settlement', desc: 'Partnering with insurers having 98%+ claim settlement ratio.' },
            { title: 'Tax Benefits', desc: 'Save tax under Section 80C and 10(10D) of Income Tax Act.' },
            { title: 'Critical Illness Cover', desc: 'Additional protection against major illnesses.' }
        ]
    },
    'health-insurance': {
        title: 'Health Insurance',
        subtitle: 'Medical security for you and your family against rising healthcare costs.',
        features: [
            { title: 'Cashless Hospitals', desc: 'Access to top hospitals without paying upfront.' },
            { title: 'Pre/Post Hospitalization', desc: 'Coverage for expenses 60 days before and 180 days after admission.' },
            { title: 'No Claim Bonus', desc: 'Increase in sum insured for every claim-free year.' }
        ]
    },
    'mutual-funds-sip': {
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
    const category = categoryData[slug];
    if (!category) return { title: 'Not Found' };
    return {
        title: `${category.title} | JivanSecure`,
        description: category.subtitle
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = categoryData[slug];

    if (!data) {
        notFound();
    }

    return (
        <main className="flex-1">
            {/* Hero Section for Category */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[60vh] flex items-center">
                {/* Background Visual */}
                <div className="absolute inset-0 -z-10">
                    <CategoryVisual type={slug} className="w-full h-full rounded-none opacity-40" animate={true} />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/80 backdrop-blur border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider shadow-sm">
                            <TrendingUp size={12} />
                            <span>Expert Solutions</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                            {data.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light mb-10 max-w-2xl">
                            {data.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Get a Quote <ArrowUpRight size={18} />
                            </Link>
                            <Link
                                href="#features"
                                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-50 transition-all flex items-center gap-2 border border-slate-200"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features/Insights Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-3 gap-12">
                        {data.features.map((feature: any, idx: number) => (
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

            {/* CTA Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to secure your future?</h2>
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
