'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Megaphone, AlertCircle, Mail, ChevronRight, Menu, X, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Section {
    id: string;
    title: string;
    icon: React.ElementType;
    summary: string;
    content: React.ReactNode;
}

export default function LegalLayout({ initialSection = 'terms' }: { initialSection?: string }) {
    const [activeSection, setActiveSection] = useState(initialSection);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Dynamic Title based on active section
    const currentSectionTitle = sections.find(s => s.id === activeSection)?.title || 'Legal';

    // Scroll Progress Handler
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (initialSection && initialSection !== 'terms') {
            const element = document.getElementById(initialSection);
            if (element) {
                const yOffset = -120;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }, [initialSection]);

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
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Trust Center & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-emerald-400">
                                Legal Framework
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg lg:text-xl font-light max-w-2xl leading-relaxed">
                            A clear, transparent guide to our relationship. We believe in open standards and protecting your interests at every step.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 max-w-7xl -mt-10 mb-24 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Navigation</h3>
                                <div className="space-y-1">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                                                activeSection === section.id
                                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            )}
                                        >
                                            <section.icon size={18} className={cn("transition-colors", activeSection === section.id ? "text-secondary" : "text-slate-400 group-hover:text-primary")} />
                                            <span className="font-medium text-sm">{section.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-primary to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                                <Shield className="w-8 h-8 text-secondary mb-4" />
                                <h4 className="font-bold text-lg mb-2">Need help?</h4>
                                <p className="text-sm text-slate-300 mb-4 font-light">
                                    Can't find what you're looking for? direct line to our legal team.
                                </p>
                                <a href="mailto:jivansecure@gmail.com" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors">Contact Support →</a>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Floating Menu Button */}
                    <div className="lg:hidden fixed bottom-6 right-6 z-50">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/30 flex items-center gap-2 pr-6"
                        >
                            <Menu size={20} />
                            <span className="font-bold text-sm">Contents</span>
                        </button>
                    </div>

                    {/* Mobile Menu Sheet */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                                />
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[70] lg:hidden max-h-[85vh] overflow-y-auto"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-lg font-bold text-primary">Content Guide</span>
                                            <button
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="p-2 bg-slate-100 rounded-full text-slate-500"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {sections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={cn(
                                                        "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                                                        activeSection === section.id
                                                            ? "bg-primary text-white border-primary"
                                                            : "bg-white border-slate-100 text-slate-600"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                                        activeSection === section.id ? "bg-white/10" : "bg-slate-50"
                                                    )}>
                                                        <section.icon size={20} className={activeSection === section.id ? "text-secondary" : "text-slate-400"} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm">{section.title}</div>
                                                        <div className={cn("text-xs mt-0.5 opacity-80", activeSection === section.id ? "text-slate-300" : "text-slate-400")}>Tap to read</div>
                                                    </div>
                                                    {activeSection === section.id && <CheckCircle2 size={18} className="ml-auto text-secondary" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Main Content Area */}
                    <main className="lg:w-3/4 space-y-16">
                        {sections.map((section, index) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="scroll-mt-32"
                            >
                                {/* Section Header */}
                                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 relative overflow-hidden group hover:border-slate-300 transition-colors">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                                <section.icon size={28} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Section 0{index + 1}</span>
                                                    <div className="h-px w-8 bg-slate-200" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-primary">{section.title}</h2>
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
                                        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80 prose-li:marker:text-secondary">
                                            {section.content}
                                        </div>

                                        <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                            <span>Last reviewed: <span className="text-slate-600 font-medium">Feb 12, 2026</span></span>
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
