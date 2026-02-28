'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { getPostUrl } from '@/lib/blogUtils';
import Link from 'next/link';
import { Search, Filter, Clock, ArrowRight, Shield, BookOpen, Layout, Calendar, Sparkles, TrendingUp, Award, Zap, ChevronDown } from 'lucide-react';
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
        <main className="min-h-screen bg-white pt-32 pb-32 selection:bg-[#00a859]/20 selection:text-[#001f54]">
            {/* AMBIENT BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-[#00a859]/3 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -left-[5%] w-[30%] h-[40%] bg-[#001f54]/2 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative">

                {/* PREMIUM INTEL HUB HERO */}
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="h-px w-10 bg-[#b38b2d]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b38b2d]">Intelligence Portal</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-[-0.04em] leading-[0.95] text-[#001f54]"
                    >
                        Advisory <br />
                        <span className="italic font-serif text-[#00a859] pr-4">Insights</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl opacity-80 border-l-2 border-slate-100 pl-8"
                    >
                        Technical analysis and strategic guides curated by Satish Mishra to navigate the complexities of modern protection.
                    </motion.p>
                </div>

                {/* MINIMALIST SEARCH & FILTER STRIP */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col lg:flex-row items-center gap-6 mb-20 sticky top-24 z-40"
                >
                    <div className="w-full lg:flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00a859] transition-colors" size={20} strokeWidth={3} />
                        <input
                            type="text"
                            placeholder="Filter by keyword or topic..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 focus:outline-none focus:border-[#00a859]/30 transition-all font-bold text-[#001f54] placeholder:text-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-base"
                        />
                    </div>

                    <div className="flex w-full lg:w-auto gap-3">
                        <div className="relative flex-1 lg:w-48">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full pl-6 pr-10 py-5 bg-[#001f54] rounded-2xl text-white font-bold text-[10px] uppercase tracking-[0.2em] appearance-none cursor-pointer hover:bg-[#002b70] transition-colors outline-none shadow-xl shadow-[#001f54]/10"
                            >
                                <option value="all">Every Sector</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug} className="text-slate-800 bg-white">{cat.title}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" size={14} />
                        </div>

                        <div className="relative flex-1 lg:w-48">
                            <select
                                value={selectedSubcategory}
                                onChange={(e) => setSelectedSubcategory(e.target.value)}
                                disabled={selectedCategory !== 'all' && availableSubcategories.length === 0}
                                className="w-full pl-6 pr-10 py-5 bg-white rounded-2xl border border-slate-200 text-[#001f54] font-bold text-[10px] uppercase tracking-[0.2em] appearance-none cursor-pointer focus:border-[#00a859]/30 transition-all outline-none disabled:opacity-40 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
                            >
                                <option value="all">Specialization</option>
                                {availableSubcategories.map((sub: any) => (
                                    <option key={sub.id} value={sub.slug}>{sub.title}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                </motion.div>

                {/* ARTICLES LIST - ARCHITECTURAL FLOW */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-slate-50 rounded-[2rem] aspect-[4/5] animate-pulse" />
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
                        {filteredPosts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                            >
                                <Link
                                    href={getPostUrl(post)}
                                    className="group block relative"
                                >
                                    <div className="aspect-[16/11] rounded-3xl overflow-hidden mb-5 relative bg-slate-100 border border-slate-100">
                                        {post.cover_image_url ? (
                                            <img
                                                src={post.cover_image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BookOpen size={32} className="text-slate-200" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#001f54]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-1.5 bg-white/95 backdrop-blur shadow-sm text-[9px] font-black uppercase tracking-[0.2em] text-[#001f54] rounded-lg">
                                                {post.categories?.title || 'Report'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-[#00a859] uppercase tracking-widest bg-[#00a859]/5 px-2 py-1 rounded">Expert Opinion</span>
                                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>

                                        <h3 className="text-lg font-black text-[#001f54] leading-tight tracking-tight group-hover:text-[#00a859] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-slate-500 text-[10px] font-bold leading-relaxed line-clamp-2 opacity-70">
                                            {post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Access comprehensive advisory and technical details...'}
                                        </p>

                                        <div className="pt-4 flex items-center gap-2 text-[9px] font-black text-[#001f54] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                            Read Analysis <ArrowRight size={14} className="text-[#00a859]" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-[3rem]">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No analysis found matching your criteria</p>
                    </div>
                )}

                {/* BOTTOM CTA - SIGNATURE ADVISORY */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 p-12 md:p-24 bg-[#001f54] rounded-[4rem] relative overflow-hidden shadow-2xl shadow-[#001f54]/20"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a859]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">Secure Your Legacy with <span className="italic font-serif text-[#00a859]">Precision</span></h2>
                            <p className="text-blue-100/60 font-medium text-lg leading-relaxed">
                                Get a specialized insurance audit and customized protection strategy directly from Satish Mishra.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                            <Link href="/contact" className="px-10 py-5 bg-[#00a859] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#001f54] transition-all text-center">
                                Book Personal Audit
                            </Link>
                            <Link href="https://wa.me/919588472632" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all text-center">
                                Direct Consultation
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
