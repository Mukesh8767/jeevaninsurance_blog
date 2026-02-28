import { createClient } from '@/lib/supabaseServer';
import PostRenderer from '@/components/PostRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, MessageCircle, Share2, ShieldCheck, Bookmark } from 'lucide-react';
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

export async function generateMetadata({ params }: { params: Promise<{ type: string, category: string, subcategory: string, slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    return {
        title: `${post.title} | JivanSecure Insights`,
        description: post.title,
        openGraph: {
            title: post.title,
            images: post.cover_image_url ? [post.cover_image_url] : [],
        }
    };
}

export default async function PostPage({ params }: { params: Promise<{ type: string, category: string, subcategory: string, slug: string }> }) {
    const { type, category, subcategory, slug } = await params;

    // Validate type segment (only 'post' or 'news' allowed)
    if (type !== 'post' && type !== 'news') {
        notFound();
    }

    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-[#fafbfc] selection:bg-[#00a859]/20 selection:text-[#001f54]">
            <ReadingProgressBar />

            {/* HERO SECTION WITH LARGE COVER */}
            <div className="relative w-full h-[65vh] md:h-[85vh] overflow-hidden bg-[#001f54]">
                {post.cover_image_url ? (
                    <>
                        <img
                            src={post.cover_image_url}
                            className="w-full h-full object-cover opacity-70 scale-105"
                            alt={post.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001f54] via-[#001f54]/20 to-transparent" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#001f54] via-[#012a6e] to-[#00a859]/20 opacity-60" />
                )}

                {/* OVERLAY CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-32">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex flex-wrap items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {post.categories && (
                                    <Link
                                        href={`/category/${post.categories.slug}`}
                                        className="px-5 py-2 rounded-xl bg-[#00a859] backdrop-blur-md text-white md:text-xs text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#00a859]/20 hover:bg-[#2eb872] transition-all border border-[#00a859]/30"
                                    >
                                        {post.categories.title}
                                    </Link>
                                )}
                                {post.subcategories && (
                                    <span className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white md:text-xs text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
                                        {post.subcategories.title}
                                    </span>
                                )}
                                <div className="h-4 w-[1px] bg-white/20 mx-2 hidden md:block" />
                                <span className="flex items-center gap-2 text-white/90 text-[10px] md:text-xs font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <Clock size={14} className="text-[#00a859]" /> 6 MIN READ
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-10 tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl border-2 border-white/20 p-1 overflow-hidden shadow-2xl">
                                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#00a859] to-[#012a6e] flex items-center justify-center text-white font-black text-lg">
                                            {(post.profiles?.full_name || 'SM').split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                    </div>
                                    <div className="text-white">
                                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#00a859] mb-1">Author / Consultant</p>
                                        <p className="font-extrabold leading-none text-xl tracking-tight">{post.profiles?.full_name || 'Satish Mishra'}</p>
                                    </div>
                                </div>

                                <div className="h-12 w-[1px] bg-white/20 hidden lg:block" />

                                <div className="hidden md:flex flex-col text-white">
                                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#00a859] mb-1">Published date</p>
                                    <div className="flex items-center gap-2 font-extrabold leading-none text-xl tracking-tight">
                                        <Calendar size={18} className="text-white/60" />
                                        <span>
                                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md ml-auto">
                                    <ShieldCheck size={20} className="text-[#00a859]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white">Verified Analysis</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <section className="relative -mt-16 lg:-mt-24 z-10 pb-40">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

                            {/* SOCIAL SHARING (STICKY SIDEBAR) */}
                            <aside className="lg:col-span-1 hidden lg:block">
                                <SocialShare url={`/blogs/${type}/${category}/${subcategory}/${slug}`} />
                            </aside>

                            {/* ARTICLE BODY - PREMIUM WHITE CONTAINER */}
                            <div className="lg:col-span-11 bg-white rounded-[3rem] md:p-20 p-8 shadow-[0_30px_90px_-20px_rgba(0,31,84,0.12)] border border-slate-50 relative">
                                {/* Reading Progress Bookmark Icon */}
                                <div className="absolute -top-6 right-12 w-16 h-16 bg-[#001f54] text-[#b38b2d] rounded-[1.5rem] hidden md:flex items-center justify-center shadow-2xl border-4 border-white">
                                    <Bookmark size={24} className="fill-[#b38b2d]" />
                                </div>

                                <div className="prose prose-xl prose-slate max-w-none prose-headings:text-[#001f54] prose-headings:font-black prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:font-medium">
                                    <PostRenderer blocks={post.blocks} />
                                </div>

                                {/* FOOTER NAVIGATION & CALL TO ACTION */}
                                <div className="mt-32 pt-20 border-t border-slate-100">
                                    <div className="bg-gradient-to-br from-[#001f54] to-[#012a6e] rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000 rotate-12">
                                            <Share2 size={300} className="text-white" />
                                        </div>
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="w-24 h-24 bg-[#00a859] rounded-[2rem] flex items-center justify-center mb-10 rotate-6 shadow-[0_20px_50px_-10px_rgba(0,168,89,0.5)] border-4 border-white/20">
                                                <MessageCircle size={32} className="text-white" />
                                            </div>
                                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Facing an Insurance <br className="hidden md:block" /> Complexity?</h2>
                                            <p className="text-blue-100/60 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                                Consult with Satish Mishra and the JivanSecure team for a personalized audit of your portfolio and future-proof strategies.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                <Link
                                                    href="/contact"
                                                    className="px-12 py-6 bg-[#00a859] text-white font-black rounded-[2rem] hover:bg-white hover:text-[#001f54] transition-all hover:scale-105 shadow-2xl shadow-[#00a859]/30 text-xs uppercase tracking-widest"
                                                >
                                                    Book Consultation
                                                </Link>
                                                <Link
                                                    href="https://wa.me/919588472632"
                                                    className="px-12 py-6 bg-white/10 text-white backdrop-blur-md font-black rounded-[2rem] hover:bg-white/20 transition-all border border-white/10 text-xs uppercase tracking-widest"
                                                >
                                                    Quick Chat on WhatsApp
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-20 flex flex-col md:flex-row md:items-center justify-between gap-10 group">
                                        <Link
                                            href="/blogs"
                                            className="inline-flex items-center gap-6 text-slate-400 font-black hover:text-[#001f54] transition-all group/back"
                                        >
                                            <div className="w-16 h-16 rounded-[2rem] bg-slate-50 flex items-center justify-center group-hover/back:bg-[#001f54] group-hover/back:text-white transition-all shadow-sm border border-slate-100">
                                                <ArrowLeft size={24} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-1">Return to</p>
                                                <span className="text-xl tracking-tight">Knowledge Hub</span>
                                            </div>
                                        </Link>

                                        <div className="flex items-center gap-4">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mr-2">Certified Publication</p>
                                            <div className="px-6 py-3 bg-[#001f54]/5 text-[#001f54] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-[#001f54]/10">
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
