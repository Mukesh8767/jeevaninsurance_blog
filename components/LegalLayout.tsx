'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Megaphone, AlertCircle, Mail, ChevronRight, Menu, X, ArrowRight, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Section {
    id: string;
    title: string;
    icon: React.ElementType;
    summary: string;
    content: React.ReactNode;
}

export default function LegalLayout({ initialSection = 'terms' }: { initialSection?: string }) {
    const params = useParams();
    const slug = params?.slug as string || initialSection;
    const [activeSection, setActiveSection] = useState(slug);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Sync active section with URL slug
    useEffect(() => {
        if (slug) {
            setActiveSection(slug);
        }
    }, [slug]);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    // Scroll Spy
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 180;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-secondary/20">
            {/* ProgressBar */}
            <div className="fixed top-0 left-0 h-1 bg-secondary z-[60]" style={{ width: `${scrollProgress * 100}%` }} />

            {/* Premium Hero Section */}
            <div className="bg-[#0B1120] text-white pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
                {/* Abstract Background Design */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.02" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl"
                    >

                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 leading-[1.2] md:leading-[1.1]">
                            {sections.find(s => s.id === activeSection)?.title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-emerald-400">
                                JivanSecure Policy
                            </span>
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg lg:text-xl font-light max-w-2xl leading-relaxed">
                            {sections.find(s => s.id === activeSection)?.summary}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 max-w-5xl -mt-10 mb-24 relative z-20">
                <div className="flex justify-center">
                    {/* Main Content Area - Full Width & Centered */}
                    <main className="w-full">
                        {sections.filter(s => s.id === activeSection).map((section, index) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="scroll-mt-32"
                            >
                                {/* Section Header */}
                                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 relative overflow-hidden group hover:border-slate-300 transition-colors min-h-[600px]">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                                    <section.icon size={28} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Official Document</span>
                                                        <div className="h-px w-8 bg-slate-200" />
                                                    </div>
                                                    <h2 className="text-2xl md:text-3xl font-bold text-primary">{section.title}</h2>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Key Takeaway Box */}
                                        <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100 mb-8 flex items-start gap-3">
                                            <FileText size={20} className="text-secondary shrink-0 mt-0.5" />
                                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                                <span className="text-primary font-bold">In Brief:</span> {section.summary}
                                            </p>
                                        </div>

                                        {/* Content */}
                                        <div className="prose prose-slate prose-base md:prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80 prose-li:marker:text-secondary">
                                            {section.content}
                                        </div>

                                        <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                            <span>Last reviewed: <span className="text-slate-600 font-medium">Feb 14, 2026</span></span>
                                            <span>JivanSecure Framework v2.0</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

const sections: Section[] = [
    {
        id: 'terms',
        title: 'Terms of Use',
        icon: Shield,
        summary: "By using JivanSecure, you agree to treat our content as informational guidance, not binding financial advice. Always verify details with a certified professional.",
        content: (
            <div className="space-y-6 text-slate-600 font-light">
                <p>
                    Welcome to <strong>JivanSecure</strong>. By accessing our platform, you agree to these terms, which are designed to ensure a safe, transparent, and trusted environment for all users.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8">1. Advisory Limit</h3>
                <p>
                    While we strive for accuracy, the financial landscape changes rapidly. Content on this site serves as educational material. <strong className="text-slate-800 font-medium">No algorithm or article replaces a personalized consultation</strong> with Satish Mishra.
                </p>

                <h3 className="text-xl font-bold text-primary mt-8">2. Intellectual Property</h3>
                <p>
                    The methodology, calculators, and content structure are proprietary to JivanSecure. You may share our insights with credit, but reproducing our tools for commercial use is prohibited without license.
                </p>

                <div className="bg-amber-50 p-4 border-l-2 border-amber-400 rounded-r-lg my-6">
                    <p className="text-sm text-amber-900 m-0">
                        <strong>Note:</strong> We reserve the right to modify these terms as regulations evolve. Continued use implies acceptance of updated terms.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'privacy',
        title: 'Privacy Policy',
        icon: Lock,
        summary: "We collect only what is necessary to generate your insurance quote. Your data is encrypted and never sold to third-party marketing aggregators.",
        content: (
            <div className="space-y-6 text-slate-600 font-light">
                <p>
                    Your trust is our currency. We adhere to a strict <strong className="text-slate-800 font-medium">"Client-First" Data Policy</strong>.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 my-6">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="font-bold text-primary text-sm mb-2">What We Collect</h4>
                        <ul className="text-sm space-y-2">
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-secondary" /> Basic Identity (Name, Age)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-secondary" /> Contact Details (Email, Phone)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-secondary" /> Financial Goals</li>
                        </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="font-bold text-primary text-sm mb-2">What We Don't Do</h4>
                        <ul className="text-sm space-y-2">
                            <li className="flex items-center gap-2"><X size={14} className="text-red-400" /> Sell data to spammers</li>
                            <li className="flex items-center gap-2"><X size={14} className="text-red-400" /> Hidden background tracking</li>
                            <li className="flex items-center gap-2"><X size={14} className="text-red-400" /> Store payment credentials</li>
                        </ul>
                    </div>
                </div>

                <p>
                    We use industry-standard encryption (AES-256) to store your consultation records. Access is strictly limited to your assigned financial advisor.
                </p>
            </div>
        )
    },
    {
        id: 'advertising',
        title: 'Advertising Policy',
        icon: Megaphone,
        summary: "We may display relevant financial products, but our advisory remains independent. Paid placements are clearly marked.",
        content: (
            <div className="space-y-6 text-slate-600 font-light">
                <p>
                    JivanSecure remains an <strong className="text-slate-800 font-medium">Independent Financial Advisory</strong>.
                </p>
                <p>
                    We may occasionally display network advertisements (like Google AdSense) to maintain our free educational resources. However, these ads are automated and do not influence our strategic recommendations for your portfolio.
                </p>
                <blockquote className="pl-4 border-l-2 border-primary italic text-slate-600">
                    "Our loyalty is to your financial health, not to any insurance provider."
                </blockquote>
            </div>
        )
    },
    {
        id: 'disclaimer',
        title: 'Disclaimer',
        icon: AlertCircle,
        summary: "Investments are subject to market risk. Past performance guarantees nothing. Read all scheme documents carefully.",
        content: (
            <div className="space-y-6 text-slate-600 font-light">
                <p>
                    <strong>Risk Warning:</strong> Insurance and Mutual Funds are vehicles for risk management and wealth creation, but they carry inherent risks.
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-red-400">
                    <li>Market-linked plans (ULIPs) fluctuate with indices.</li>
                    <li>Claim settlement is subject to the insurer's terms and accurate disclosure of facts.</li>
                    <li>Projections on this site are illustrative based on current rates.</li>
                </ul>
                <p>
                    We urge you to read the <strong>policy wording (fine print)</strong> before signing any contract.
                </p>
            </div>
        )
    },
    {
        id: 'contact',
        title: 'Contact Us',
        icon: Mail,
        summary: "Reach out specifically for legal inquiries, data removal requests, or policy clarifications.",
        content: (
            <div className="space-y-6 text-slate-600 font-light">
                <p className="mb-6">
                    <strong>Have a specific concern?</strong> Direct channels for faster resolution.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="mailto:jivansecure@gmail.com" className="group flex-1 p-6 bg-slate-900 text-white rounded-2xl hover:bg-primary transition-colors">
                        <Mail className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                        <div className="font-bold text-lg mb-1">Legal Compliance</div>
                        <div className="text-slate-400 text-sm group-hover:text-white/80">jivansecure@gmail.com</div>
                    </a>

                    <a href="tel:+919890384077" className="group flex-1 p-6 bg-white border border-slate-200 rounded-2xl hover:border-secondary transition-colors">
                        <Shield className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <div className="font-bold text-lg mb-1 text-primary">Direct Advisory</div>
                        <div className="text-slate-400 text-sm font-medoum">+91-9890384077</div>
                    </a>
                </div>
            </div>
        )
    }
];
