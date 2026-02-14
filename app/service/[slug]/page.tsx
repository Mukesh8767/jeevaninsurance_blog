'use client';

import { useParams, notFound } from 'next/navigation';
import { SERVICES_DATA } from '@/lib/services';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicePage() {
    const params = useParams();
    const slug = params.slug as string;
    const data = SERVICES_DATA[slug];

    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Fading effect for the hero image
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 1.1]);
    const translateY = useTransform(scrollY, [0, 400], [0, 100]);

    if (!data) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white" ref={containerRef}>
            {/* Hero Section - The "Big Image" with fading effect */}
            <div className="relative h-[70vh] w-full overflow-hidden bg-slate-900">
                <motion.div
                    style={{ opacity, scale, y: translateY }}
                    className="absolute inset-0"
                >
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                </motion.div>

                {/* Back Link */}
                <div className="absolute top-10 left-6 lg:left-12 z-20">
                    <Link
                        href="/#solutions"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all"
                    >
                        <ArrowLeft size={14} /> Back to Solutions
                    </Link>
                </div>

                {/* Hero Content Overlay */}
                <div className="absolute bottom-20 left-6 lg:left-12 z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-8 bg-blue-500"></span>
                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">{data.category}</span>
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
                            {data.title}
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/80 font-light max-w-2xl leading-relaxed">
                            {data.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section - "Blogging Format" */}
            <div className="container mx-auto px-6 lg:px-12 py-24">
                <div className="grid lg:grid-cols-12 gap-20">

                    {/* Main Blog Body */}
                    <article className="lg:col-span-8 space-y-16">
                        {/* Introduction */}
                        <section className="space-y-8">
                            <p className="text-xl lg:text-xl text-slate-800 font-serif italic leading-relaxed text-balance">
                                "{data.fullContent.intro}"
                            </p>
                        </section>

                        {/* Benefits Grid */}
                        <section className="bg-slate-50 p-10 lg:p-16 rounded-[40px] border border-slate-100">
                            <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">✓</span>
                                Core Strategic Benefits
                            </h2>
                            <div className="grid md:grid-cols-1 gap-10">
                                {data.fullContent.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                                            <CheckCircle2 size={24} className="text-blue-600 group-hover:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                                            <p className="text-slate-500 leading-relaxed font-light ">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Analysis Section */}
                        <section className="space-y-8 prose prose-slate prose-xl max-w-none">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Technical Analysis</h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                {data.fullContent.analysis}
                            </p>
                            <div className="h-0.5 w-full bg-gradient-to-r from-blue-600/20 via-slate-200 to-transparent my-12" />
                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                {data.fullContent.conclusion}
                            </p>
                        </section>

                        {/* CTA within blog */}
                        <div className="pt-12 border-t border-slate-100">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all duration-500 rounded-none shadow-2xl"
                            >
                                Get a Personalized Quote
                                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar / Advisory Portal */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-32">
                            <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 space-y-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Advisory Package</p>
                                    <p className="text-2xl font-bold text-slate-900">{data.price}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-slate-600">
                                        <div className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center">
                                            <Phone size={18} />
                                        </div>
                                        <span className="text-sm font-medium">+91 91705 51000</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600">
                                        <div className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center">
                                            <Mail size={18} />
                                        </div>
                                        <span className="text-sm font-medium">care@jivansecure.com</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-200">
                                    <h4 className="font-bold text-slate-900 mb-4">Why JivanSecure?</h4>
                                    <ul className="space-y-3">
                                        {[
                                            'Radical Transparency',
                                            'Conflict-Free Advice',
                                            'Legacy Planning',
                                            '98%+ Claim Support'
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider font-bold">
                                                <ShieldCheck size={14} className="text-blue-600" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-8 p-8 rounded-[32px] bg-blue-600 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                                <p className="text-sm font-light mb-4 relative z-10 opacity-90">
                                    "We don't sell products. We architect legacies. Every plan is a commitment to your family's future."
                                </p>
                                <p className="text-xs font-bold uppercase tracking-widest relative z-10">Satish Mishra, Founder</p>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
