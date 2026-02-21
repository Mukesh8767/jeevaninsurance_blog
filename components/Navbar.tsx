'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageSquare, Home, Heart, Activity, Car, TrendingUp, Landmark, Shield, ChevronDown, Lock, Megaphone, AlertCircle, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/category/life', label: 'Life', icon: Heart },
    { href: '/category/health', label: 'Health', icon: Activity },
    { href: '/category/motor', label: 'Motor', icon: Car },
    { href: '/category/mutual-fund', label: 'Investments', icon: TrendingUp },
    { href: '/category/loans', label: 'Loans', icon: Landmark },
    {
        href: '/terms',
        label: 'Terms',
        icon: Shield,
        subItems: [
            { href: '/terms/terms', label: 'Terms of Use', icon: Shield },
            { href: '/terms/privacy', label: 'Privacy Policy', icon: Lock },
            { href: '/terms/advertising', label: 'Advertising', icon: Megaphone },
            { href: '/terms/disclaimer', label: 'Disclaimer', icon: AlertCircle },
            { href: '/terms/contact', label: 'Contact & Support', icon: Mail },
        ]
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    // Handle scroll lock when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isAdmin) return null;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
                    (scrolled || isOpen)
                        ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-2"
                        : "bg-white border-transparent py-4"
                )}
            >
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group relative z-50">
                            <img
                                src="/logo.png"
                                alt="JivanSecure Logo"
                                className="h-10 w-auto group-hover:scale-105 transition-transform duration-500"
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                            {links.map(link => (
                                <div key={link.href} className="relative group py-2">
                                    {link.subItems ? (
                                        <>
                                            <button className="flex items-center gap-2 cursor-pointer outline-none">
                                                <link.icon size={16} className={cn(
                                                    "transition-colors duration-300",
                                                    pathname?.startsWith(link.href) ? "text-primary" : "text-slate-400 group-hover:text-primary"
                                                )} />
                                                <span className={cn(
                                                    "text-sm font-medium transition-all duration-300",
                                                    pathname?.startsWith(link.href) ? "text-primary" : "text-slate-500 group-hover:text-primary"
                                                )}>
                                                    {link.label}
                                                </span>
                                                <ChevronDown size={14} className={cn(
                                                    "transition-transform duration-300 text-slate-400 group-hover:text-primary group-hover:rotate-180",
                                                    pathname?.startsWith(link.href) && "text-primary"
                                                )} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    className="w-64 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl p-2"
                                                >
                                                    <div className="grid gap-1">
                                                        {link.subItems.map((subItem) => (
                                                            <Link
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                className={cn(
                                                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group/sub",
                                                                    pathname === subItem.href
                                                                        ? "bg-primary/5 text-primary"
                                                                        : "hover:bg-slate-50 text-slate-600 hover:text-primary"
                                                                )}
                                                            >
                                                                <div className={cn(
                                                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm",
                                                                    pathname === subItem.href ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover/sub:bg-primary/10 group-hover/sub:text-primary"
                                                                )}>
                                                                    <subItem.icon size={14} />
                                                                </div>
                                                                <span className="text-sm font-semibold tracking-tight">{subItem.label}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-2"
                                        >
                                            <link.icon size={16} className={cn(
                                                "transition-colors duration-300",
                                                pathname === link.href ? "text-primary" : "text-slate-400 group-hover:text-primary"
                                            )} />
                                            <span className={cn(
                                                "text-sm font-medium transition-all duration-300",
                                                pathname === link.href ? "text-primary" : "text-slate-500 group-hover:text-primary group-hover:tracking-wide"
                                            )}>
                                                {link.label}
                                            </span>
                                            <span className={cn(
                                                "absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ease-out",
                                                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                            )} />
                                        </Link>
                                    )}
                                </div>
                            ))}

                            <div className="w-px h-6 bg-slate-200 mx-2" />

                            <div className="flex items-center gap-4">
                                <a
                                    href="tel:+919588472632"
                                    className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary border border-slate-100 hover:bg-white hover:shadow-md hover:border-primary/20 transition-all"
                                >
                                    <Phone size={16} />
                                </a>
                                <a
                                    href="https://wa.me/919588472632"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden xl:inline-flex items-center gap-2 px-5 py-2 bg-[#25D366] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#128C7E] transition-all shadow-lg shadow-green-200 hover:-translate-y-0.5"
                                >
                                    <WhatsAppIcon size={16} />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 text-primary z-50 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - Side Sheet (Moved Outside) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[120] lg:hidden shadow-2xl border-l border-slate-100"
                        >
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">J</div>
                                        <span className="text-lg font-bold text-primary">Menu</span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                                    >
                                        <X size={20} className="text-slate-600" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2">
                                    <div className="space-y-1">
                                        {links.map((link, i) => (
                                            <div key={link.href}>
                                                {link.subItems ? (
                                                    <div className="space-y-0.5">
                                                        <div className="flex items-center gap-4 px-4 py-3 text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-4 first:mt-0">
                                                            {link.label}
                                                        </div>
                                                        {link.subItems.map((subItem) => (
                                                            <Link
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                className={cn(
                                                                    "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all border border-transparent",
                                                                    pathname === subItem.href
                                                                        ? "bg-primary/5 text-primary font-bold border-primary/10"
                                                                        : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                                                )}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                <div className={cn(
                                                                    "w-7 h-7 rounded-lg flex items-center justify-center transition-colors shadow-sm",
                                                                    pathname === subItem.href ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                                                                )}>
                                                                    <subItem.icon size={12} />
                                                                </div>
                                                                <span className="font-medium text-[13px]">{subItem.label}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        className={cn(
                                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all border border-transparent",
                                                            pathname === link.href
                                                                ? "bg-primary/5 text-primary font-bold border-primary/10"
                                                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                                        )}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <link.icon size={16} className={pathname === link.href ? "text-secondary" : "text-slate-400"} />
                                                        <span className="font-medium text-[13px]">{link.label}</span>
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-slate-100 my-4" />

                                    <div className="space-y-4 px-4">
                                        <Link
                                            href="/contact"
                                            className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                <MessageSquare size={16} />
                                            </div>
                                            <span className="font-medium">Contact Us</span>
                                        </Link>
                                        <a
                                            href="tel:+919588472632"
                                            className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                <Phone size={16} />
                                            </div>
                                            <span className="font-medium">Call Now</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 border-t border-slate-100">
                                    <p className="text-xs text-slate-400 text-center">
                                        © {new Date().getFullYear()} JivanSecure
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                <motion.a
                    href="https://wa.me/919588472632"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 lg:w-14 lg:h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200 hover:shadow-green-300 transition-all"
                >
                    <WhatsAppIcon size={24} />
                </motion.a>

                <motion.a
                    href="tel:+919588472632"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 lg:w-14 lg:h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                >
                    <Phone size={24} />
                </motion.a>
            </div>
        </>
    );
}
