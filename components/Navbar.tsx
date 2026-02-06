'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
    { href: '/category/motor-insurance', label: 'Motor' },
    { href: '/category/life-insurance', label: 'Life' },
    { href: '/category/health-insurance', label: 'Health' },
    { href: '/category/mutual-funds-sip', label: 'Mutual Funds' },
    { href: '/category/nri-planning', label: 'NRI Services' },
    { href: '/category/retirement-planning', label: 'Retirement' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

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
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-slate-200 shadow-sm py-2"
                    : "bg-white border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative z-50">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
                            <ShieldCheck size={22} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                            Jivan<span className="text-blue-500">Secure</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group py-2"
                            >
                                <span className={cn(
                                    "text-sm font-medium transition-colors duration-300",
                                    pathname === link.href ? "text-slate-900" : "text-slate-500 group-hover:text-slate-900"
                                )}>
                                    {link.label}
                                </span>
                                <span className={cn(
                                    "absolute bottom-0 left-0 h-[2px] bg-slate-900 transition-all duration-300 ease-out",
                                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                )} />
                            </Link>
                        ))}

                        <div className="pl-4 border-l border-slate-200 flex items-center gap-4">
                            <Link
                                href="/contact"
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Contact
                            </Link>
                            <Link
                                href="/admin"
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 text-slate-900 z-50 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AnimatePresence mode='wait'>
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-white z-40 lg:hidden pt-24 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-4">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="block text-2xl font-bold text-slate-800 py-3 border-b border-slate-100"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: links.length * 0.1 + 0.1 }}
                                className="pt-8 flex flex-col gap-4"
                            >
                                <Link
                                    href="/contact"
                                    className="block text-xl font-medium text-slate-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="/admin"
                                    className="block w-full text-center py-4 bg-slate-900 text-white font-bold rounded-xl text-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard Login
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
