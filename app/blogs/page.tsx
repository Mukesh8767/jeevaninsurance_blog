'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { getPostUrl } from '@/lib/blogUtils';
import Link from 'next/link';
import { Search, Filter, Clock, ArrowRight, Shield, BookOpen, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <main className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-6 border border-blue-100">
                        <BookOpen size={14} /> Knowledge Center
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Insights & <span className="text-blue-600">Expertise</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-light leading-relaxed">
                        Explore our latest articles, guides, and news updates on insurance, investment, and financial planning.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 flex flex-col md:flex-row gap-6 sticky top-28 z-40 backdrop-blur-md bg-white/90">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles by title or content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-700"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-600 appearance-none min-w-[180px]"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug}>{cat.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            <select
                                value={selectedSubcategory}
                                onChange={(e) => setSelectedSubcategory(e.target.value)}
                                disabled={selectedCategory !== 'all' && availableSubcategories.length === 0}
                                className="pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-600 appearance-none min-w-[200px] disabled:opacity-50"
                            >
                                <option value="all">All Subcategories</option>
                                {availableSubcategories.map((sub: any) => (
                                    <option key={sub.id} value={sub.slug}>{sub.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-8 flex items-center justify-between">
                    <p className="text-slate-500 font-medium">
                        Showing <span className="text-slate-900 font-bold">{filteredPosts.length}</span> articles
                    </p>
                    {(searchQuery || selectedCategory !== 'all' || selectedSubcategory !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                                setSelectedSubcategory('all');
                            }}
                            className="text-blue-600 font-bold text-sm hover:underline"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-3xl h-[450px] animate-pulse border border-slate-100" />
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={getPostUrl(post)}
                                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                                    {post.cover_image_url ? (
                                        <img
                                            src={post.cover_image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 transition-all duration-1000 group-hover:bg-blue-100">
                                            <Shield size={64} className="text-slate-200 group-hover:text-blue-200 transition-colors" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-[9px] font-black uppercase tracking-widest text-blue-600 rounded-lg shadow-sm">
                                            {post.categories?.title || 'Uncategorized'}
                                        </span>
                                        {post.post_type === 'news' && (
                                            <span className="px-3 py-1 bg-purple-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm w-fit">
                                                News Update
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
                                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-blue-500" /> 6 MIN READ</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                                        <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 font-light">
                                        {post.blocks?.[0]?.data?.text?.[0]?.text || post.blocks?.[0]?.props?.text || 'Read this insightful article to learn more about our expert analysis and recommendations...'}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <span className="inline-flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest group-hover:gap-3 transition-all">
                                            Read More <ArrowRight size={14} className="text-blue-400 group-hover:text-blue-600 transition-colors" />
                                        </span>
                                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                                            JivanSecure Insights
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-inner">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                            <Search size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">No articles found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto font-light">
                            We couldn't find any articles matching your search or filters. Try adjusting your criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                                setSelectedSubcategory('all');
                            }}
                            className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
