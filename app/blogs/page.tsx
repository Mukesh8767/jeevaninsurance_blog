'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { getPostUrl } from '@/lib/blogUtils';
import Link from 'next/link';
import { Search, Filter, Clock, ArrowRight, Shield, BookOpen, Layout, Calendar, Sparkles, TrendingUp, Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function BlogsListingPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');

    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Fetch Categories & Subcategories
            const { data: cats } = await supabase
                .from('categories')
                .select('*, subcategories(*)');

            if (cats) {
                setCategories(cats);
                const allSubs = cats.flatMap(c => c.subcategories || []);
                setSubcategories(allSubs);
            }

            // Fetch All Published Posts
            const { data: allPosts } = await supabase
                .from('posts')
                .select('*, categories(title, slug), subcategories(title, slug)')
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            if (allPosts) {
                setPosts(allPosts);
                setFilteredPosts(allPosts);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = posts;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(post =>
                post.title.toLowerCase().includes(query) ||
                (post.blocks?.[0]?.data?.text?.[0]?.text || '').toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(post => post.categories?.slug === selectedCategory);
        }

        // Subcategory filter
        if (selectedSubcategory !== 'all') {
            result = result.filter(post => post.subcategories?.slug === selectedSubcategory);
        }

        setFilteredPosts(result);
    }, [searchQuery, selectedCategory, selectedSubcategory, posts]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory('all'); // Reset subcategory when category changes
    };

    const availableSubcategories = selectedCategory === 'all'
        ? subcategories
        : categories.find(c => c.slug === selectedCategory)?.subcategories || [];

    return (
        <main className="min-h-screen bg-[#fcfdfe] pt-32 pb-32 selection:bg-[#00a859]/20 selection:text-[#001f54]">
            {/* Professional Background Ornaments */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-[#00a859]/5 to-transparent blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-[#001f54]/5 to-transparent blur-[120px]" />
                <div className="absolute top-[20%] left-[10%] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                <div className="absolute top-[15%] right-[15%] w-[1px] h-[70%] bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                {/* HERO SECTION - REFINED ADVISORY FOCUS */}
                <div className="max-w-5xl mx-auto mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-[#001f54] text-white font-black text-[10px] uppercase tracking-[0.3em] mb-10 shadow-2xl shadow-[#001f54]/20"
                    >
                        <Award size={14} className="text-[#b38b2d]" /> Certified Advisory Intelligence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl lg:text-[110px] font-black mb-10 tracking-tighter leading-[0.9] text-[#001f54]"
                    >
                        Strategic <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a859] via-[#2eb872] to-[#b38b2d]">
                            Protection Hub
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto opacity-80"
                    >
                        Navigating complex insurance landscapes with expert technical analysis and tailored advisory insights for a secure tomorrow.
                    </motion.p>

                    <div className="flex justify-center gap-8 mt-12 opacity-40">
                        <div className="flex items-center gap-2">
                            <Zap size={16} className="text-[#00a859]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Real-time Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="text-[#00a859]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Market Trends</span>
                        </div>
                    </div>
                </div>

                {/* SEARCH & FILTERS - PROFESSIONAL GLASS UI */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/40 backdrop-blur-3xl rounded-[3rem] p-5 md:p-8 shadow-[0_40px_100px_-20px_rgba(0,31,84,0.1)] border border-white mb-16 flex flex-col lg:flex-row gap-5 sticky top-28 z-40"
                >
                    <div className="flex-1 relative group">
                        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00a859] transition-colors" size={22} />
                        <input
                            type="text"
                            placeholder="Explore technical guides, policy reviews, or risk analysis..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-6 bg-white rounded-[2rem] border border-slate-100/50 focus:outline-none focus:ring-4 focus:ring-[#00a859]/5 focus:border-[#00a859]/20 transition-all font-bold text-[#001f54] placeholder:text-slate-300 shadow-inner text-lg"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 lg:min-w-[500px]">
                        <div className="relative flex-1">
                            <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full pl-14 pr-12 py-6 bg-white rounded-[2rem] border border-slate-100/50 focus:outline-none focus:ring-4 focus:ring-[#00a859]/5 transition-all font-black text-[#001f54] appearance-none shadow-inner text-xs uppercase tracking-[0.2em] cursor-pointer"
                            >
                                <option value="all">Sectors: All</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug}>{cat.title}</option>
                                ))}
                            </select>
                            <Layout className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={14} />
                        </div>

                        <div className="relative flex-1">
                            <BookOpen className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                            <select
                                value={selectedSubcategory}
                                onChange={(e) => setSelectedSubcategory(e.target.value)}
                                disabled={selectedCategory !== 'all' && availableSubcategories.length === 0}
                                className="w-full pl-14 pr-12 py-6 bg-white rounded-[2rem] border border-slate-100/50 focus:outline-none focus:ring-4 focus:ring-[#00a859]/5 transition-all font-black text-[#001f54] appearance-none shadow-inner text-xs uppercase tracking-[0.2em] cursor-pointer disabled:opacity-40"
                            >
                                <option value="all">Technical Area: All</option>
                                {availableSubcategories.map((sub: any) => (
                                    <option key={sub.id} value={sub.slug}>{sub.title}</option>
                                ))}
                            </select>
                            <Layout className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={14} />
                        </div>
                    </div>
                </motion.div>

                {/* POSTS GRID - TECHNICAL ARCHITECTURE */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-[3rem] h-[550px] animate-pulse border border-slate-50 shadow-sm" />
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredPosts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                            >
                                <Link
                                    href={getPostUrl(post)}
                                    className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,31,84,0.06)] hover:shadow-[0_40px_100px_-15px_rgba(0,31,84,0.12)] transition-all duration-700 hover:-translate-y-4 flex flex-col h-full relative"
                                >
                                    {/* Gold Accent Corner */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#b38b2d]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        {post.cover_image_url ? (
                                            <img
                                                src={post.cover_image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-50">
                                                <Shield size={64} className="text-slate-100 group-hover:text-[#00a859]/20 transition-all duration-700" />
                                            </div>
                                        )}

                                        <div className="absolute top-8 left-8">
                                            <span className="px-5 py-2 bg-[#001f54]/90 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-[#b38b2d] rounded-xl shadow-2xl">
                                                {post.categories?.title || 'Sector Analysis'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-12 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mb-8">
                                            <span className="flex items-center gap-2 text-[#00a859]"><Zap size={12} fill="#00a859" /> Technical</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                                            <span className="flex items-center gap-2"><Calendar size={12} /> {new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-[#001f54] mb-8 group-hover:text-[#00a859] transition-colors line-clamp-2 leading-[1.2] tracking-tighter">
                                            {post.title}
                                        </h3>

                                        <p className="text-slate-500 text-lg leading-relaxed line-clamp-3 mb-10 font-medium opacity-70 italic">
                                            "{post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Explore this specialized advisory report curated for strategic protection planning...'}"
                                        </p>

                                        <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3 group/btn">
                                                <div className="w-12 h-12 rounded-2xl bg-[#00a859]/5 flex items-center justify-center text-[#00a859] group-hover:bg-[#001f54] group-hover:text-white transition-all shadow-sm">
                                                    <ArrowRight size={18} />
                                                </div>
                                                <span className="text-[12px] font-black text-[#00a859] uppercase tracking-[0.2em] group-hover:text-[#001f54] transition-all">
                                                    Access Report
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-48 bg-white rounded-[5rem] border border-slate-100 shadow-2xl">
                        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-200">
                            <Search size={64} />
                        </div>
                        <h3 className="text-4xl font-black text-[#001f54] mb-4">Assessment Not Found</h3>
                        <p className="text-slate-400 max-w-sm mx-auto font-medium text-lg leading-relaxed mb-12">
                            Our database currently doesn't reflect any technical guides matching your specific query.
                        </p>
                        <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedSubcategory('all'); }} className="bg-[#001f54] text-white px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-[#b38b2d] transition-all shadow-2xl active:scale-95">
                            Reset Filters
                        </button>
                    </motion.div>
                )}

                {/* FOOTER CTA - ADVISORY AUDIT */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 p-16 md:p-32 bg-[#001f54] rounded-[5rem] relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,31,84,0.5)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00a859]/20 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#b38b2d] border border-white/10 font-black text-[10px] uppercase tracking-[0.4em] mb-12">
                            Professional Audit
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">Master Your Risk <br className="hidden md:block" /> Landscape</h2>
                        <p className="text-blue-100/60 text-xl md:text-2xl font-medium mb-16 max-w-2xl mx-auto">
                            Connect with Satish Mishra for a comprehensive technical audit of your insurance portfolio and financial protection structure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center">
                            <Link href="/contact" className="bg-[#b38b2d] text-white px-16 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-white hover:text-[#001f54] transition-all shadow-2xl">
                                Request Audit
                            </Link>
                            <Link href="https://wa.me/919588472632" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-16 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-white/20 transition-all">
                                Advisor Connect
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
