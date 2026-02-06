import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-500 py-24 border-t border-slate-900">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="text-white text-2xl font-bold tracking-tighter">
                            Jivan<span className="text-blue-500">Secure</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm font-light">
                            Redefining financial protection through strategic planning and unwavering transparency. Based in Mumbai, serving families across India.
                        </p>
                        <div className="flex gap-4">
                            {['LinkedIn', 'Twitter', 'Insights'].map(social => (
                                <Link key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                                    {social}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-5 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Expertise</h4>
                            <ul className="space-y-4 text-xs font-medium tracking-wide">
                                <li><Link href="/category/life-insurance" className="hover:text-blue-400 transition-colors">Life & Legacy</Link></li>
                                <li><Link href="/category/health-insurance" className="hover:text-blue-400 transition-colors">Health & Wellness</Link></li>
                                <li><Link href="/category/motor-insurance" className="hover:text-blue-400 transition-colors">Motor Assets</Link></li>
                                <li><Link href="/category/mutual-funds-sip" className="hover:text-blue-400 transition-colors">Wealth Creation</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Firm</h4>
                            <ul className="space-y-4 text-xs font-medium tracking-wide">
                                <li><Link href="/about" className="hover:text-blue-400 transition-colors">Our Perspective</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Engage Us</Link></li>
                                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Legal & Privacy</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="md:col-span-3 space-y-8">
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Headquarters</h4>
                        <div className="space-y-2 text-xs font-light">
                            <p className="text-slate-300">Mumbai Metropolitan Region</p>
                            <p>Maharashtra, India</p>
                        </div>
                        <div className="space-y-2 text-xs font-medium pt-4">
                            <p className="text-white">+91 98765 43210</p>
                            <p className="text-blue-500 underline underline-offset-4">advisory@jivansecure.com</p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] font-light">
                    <span>&copy; {new Date().getFullYear()} JivanSecure Advisory</span>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
