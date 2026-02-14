import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-100 text-slate-600 py-24 border-t border-slate-200">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="block">
                            <img src="/logo.png" alt="JivanSecure Logo" className="h-10 w-auto" />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm font-light text-slate-500">
                            Redefining financial protection through strategic planning and unwavering transparency. Based in Mumbai, serving families across India.
                        </p>
                        <div className="flex gap-4">
                            {['LinkedIn', 'Twitter'].map(social => (
                                <Link key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-secondary hover:scale-110 transition-all">
                                    {social}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-5 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Expertise</h4>
                            <ul className="space-y-4 text-xs font-medium tracking-wide">
                                <li><Link href="/category/life-insurance" className="hover:text-secondary transition-colors">Life & Legacy</Link></li>
                                <li><Link href="/category/health-insurance" className="hover:text-secondary transition-colors">Health & Wellness</Link></li>
                                <li><Link href="/category/motor-insurance" className="hover:text-secondary transition-colors">Motor Assets</Link></li>
                                <li><Link href="/category/mutual-funds-sip" className="hover:text-secondary transition-colors">Wealth Creation</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Firm</h4>
                            <ul className="space-y-4 text-xs font-medium tracking-wide">
                                <li><Link href="/about" className="hover:text-secondary transition-colors">Our Perspective</Link></li>
                                <li><Link href="/contact" className="hover:text-secondary transition-colors">Engage Us</Link></li>
                                <li><Link href="/privacy" className="hover:text-secondary transition-colors">Legal & Privacy</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="md:col-span-3 space-y-8">
                        <h4 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Headquarters</h4>
                        <div className="space-y-2 text-xs font-light text-slate-500">
                            <p className="text-slate-600 font-medium">Mumbai Metropolitan Region</p>
                            <p>Maharashtra, India</p>
                        </div>
                        <div className="space-y-2 text-xs font-medium pt-4">
                            <p className="text-primary font-bold text-sm">+91 95884 72632</p>
                            <p className="text-secondary underline underline-offset-4">jivansecure@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] font-light text-slate-400">
                    <span>&copy; {new Date().getFullYear()} JivanSecure</span>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-secondary transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-secondary transition-colors">Terms</Link>
                        <Link href="/disclaimer" className="hover:text-secondary transition-colors">Disclaimer</Link>
                        <Link href="/advertising-policy" className="hover:text-secondary transition-colors">Ad Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
