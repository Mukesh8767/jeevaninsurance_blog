import { createClient } from '@/lib/supabaseServer';
import PostRenderer from '@/components/PostRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import SocialShare from '@/components/SocialShare';
import ReadingProgressBar from '@/components/ReadingProgressBar';

async function getPost(slug: string) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('*, categories(title, slug), subcategories(title, slug), profiles(full_name)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
    return post;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string, subcategory: string, slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    return {
        title: `${post.title} | JivanSecure`,
        description: post.title,
        openGraph: {
            title: post.title,
            images: post.cover_image_url ? [post.cover_image_url] : [],
        }
    };
}

export default async function PostPage({ params }: { params: Promise<{ category: string, subcategory: string, slug: string }> }) {
    const { category, subcategory, slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    // Optional: Verify that category and subcategory slugs match
    const categorySlug = post.categories?.slug;
    const subcategorySlug = post.subcategories?.slug || 'none';

    if (category !== categorySlug || subcategory !== subcategorySlug) {
        // You could redirect here if they don't match, but for now we just show the post
        // or 404 if you want strict URLs.
        // notFound();
    }

    return (
        <article className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            <ReadingProgressBar />

            {/* HERO SECTION WITH LARGE COVER */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-slate-900">
                {post.cover_image_url ? (
                    <>
                        <img
                            src={post.cover_image_url}
                            className="w-full h-full object-cover opacity-80"
                            alt={post.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 opacity-50" />
                )}

                {/* OVERLAY CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-24">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex flex-wrap items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {post.categories && (
                                    <Link
                                        href={`/category/${post.categories.slug}`}
                                        className="px-4 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white md:text-sm text-xs font-bold uppercase tracking-widest border border-blue-400/30 hover:bg-blue-500 transition-all"
                                    >
                                        {post.categories.title}
                                    </Link>
                                )}
                                {post.subcategories && (
                                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white md:text-sm text-xs font-bold uppercase tracking-widest border border-white/20">
                                        {post.subcategories.title}
                                    </span>
                                )}
                                <span className="flex items-center gap-2 text-white/80 text-xs md:text-sm font-medium">
                                    <Clock size={16} /> 6 min read
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full border-2 border-white/30 p-0.5 overflow-hidden">
                                        <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white font-black">
                                            {(post.profiles?.full_name || 'SM').split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                    </div>
                                    <div className="text-white">
                                        <p className="text-sm font-bold opacity-70 mb-0.5">Written by</p>
                                        <p className="font-bold leading-none text-lg">{post.profiles?.full_name || 'Expert Advisor'}</p>
                                    </div>
                                </div>
                                <div className="h-10 w-[1px] bg-white/20 hidden md:block" />
                                <div className="hidden md:flex flex-col text-white">
                                    <p className="text-sm font-bold opacity-70 mb-0.5">Published on</p>
                                    <div className="flex items-center gap-2 font-bold leading-none text-lg">
                                        <Calendar size={18} className="text-blue-400" />
                                        <span>
                                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <section className="relative -mt-10 lg:-mt-20 z-10 pb-32">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

                            {/* SOCIAL SHARING (CLIENT COMPONENT) */}
                            <aside className="lg:col-span-1 hidden lg:block">
                                <SocialShare url="" />
                            </aside>

                            {/* ARTICLE BODY */}
                            <div className="lg:col-span-11 bg-white rounded-[2.5rem] md:p-16 p-8 shadow-2xl shadow-slate-200/50 border border-slate-50">

                                <div className="prose prose-lg prose-slate max-w-none">
                                    <PostRenderer blocks={post.blocks} />
                                </div>

                                {/* FOOTER NAVIGATION & CALL TO ACTION */}
                                <div className="mt-24 pt-16 border-t border-slate-100">
                                    <div className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                                            <Share2 size={200} className="text-white" />
                                        </div>
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 rotate-3 shadow-2xl shadow-blue-500/40">
                                                <MessageCircle size={32} className="text-white" />
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Need Expert Guidance?</h2>
                                            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
                                                Our consultants are ready to help you navigate through complex insurance and financial strategies.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <Link
                                                    href="/contact"
                                                    className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all hover:scale-105 shadow-xl shadow-blue-500/20 text-lg"
                                                >
                                                    Schedule a Callback
                                                </Link>
                                                <Link
                                                    href="https://wa.me/919588472632"
                                                    className="px-10 py-5 bg-white/10 text-white backdrop-blur font-black rounded-2xl hover:bg-white/20 transition-all border border-white/10 text-lg"
                                                >
                                                    Chat on WhatsApp
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                                        <Link
                                            href="/"
                                            className="inline-flex items-center gap-4 text-slate-400 font-bold hover:text-slate-900 transition-all"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                                <ArrowLeft size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Go back</p>
                                                <span className="text-lg">Back to Home</span>
                                            </div>
                                        </Link>

                                        <div className="flex items-center gap-3">
                                            <p className="text-xs font-black text-slate-300 uppercase tracking-widest mr-2">Certified Expert</p>
                                            <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest border border-blue-100">
                                                JivanSecure Advisor
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
