import { createClient } from '@/lib/supabaseServer';
import PostRenderer from '@/components/PostRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

// Helper to fetch data
async function getPost(slug: string) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('*, categories(title, slug), profiles(full_name)')
        .eq('slug', slug)
        .single();
    return post;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white">
            {/* CLEAN WHITE HEADER */}
            <header className="pt-32 pb-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
                            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                            <span>/</span>
                            {post.categories && (
                                <>
                                    <Link href={`/category/${post.categories.slug}`} className="hover:text-slate-900 transition-colors">
                                        {post.categories.title}
                                    </Link>
                                    <span>/</span>
                                </>
                            )}
                            <span className="text-slate-900 font-medium">Article</span>
                        </div>

                        {/* Category Badge */}
                        {post.categories && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                                {post.categories.title}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8 tracking-tight text-slate-900">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-8 text-sm text-slate-500 border-b border-slate-100 pb-8">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs uppercase">
                                    {(post.profiles?.full_name || 'SM').split(' ').map((n: string) => n[0]).join('')}
                                </div>
                                <span className="font-semibold text-slate-900">{post.profiles?.full_name || 'Satish Mishra'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-slate-400" />
                                <time dateTime={post.created_at}>
                                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-slate-400" />
                                <span>6 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <section className="pb-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-12 gap-12">
                            {/* SOCIAL SHARING (STICKY) */}
                            <aside className="lg:col-span-1">
                                <div className="lg:sticky lg:top-32 flex lg:flex-col gap-4">
                                    <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 flex items-center justify-center transition-all group">
                                        <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-sky-500 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-50 flex items-center justify-center transition-all group">
                                        <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-700 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 flex items-center justify-center transition-all group">
                                        <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-50 flex items-center justify-center transition-all group">
                                        <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </aside>

                            {/* ARTICLE BODY */}
                            <div className="lg:col-span-11">
                                {/* FEATURED IMAGE (INSET) */}
                                {post.cover_image_url && (
                                    <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 ring-1 ring-slate-100">
                                        <img
                                            src={post.cover_image_url}
                                            className="w-full h-auto object-cover max-h-[600px]"
                                            alt={post.title}
                                        />
                                    </div>
                                )}

                                <div className="prose prose-lg prose-slate max-w-none">
                                    <PostRenderer blocks={post.blocks} />
                                </div>

                                {/* FOOTER NAVIGATION */}
                                <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    {post.categories && (
                                        <Link
                                            href={`/category/${post.categories.slug}`}
                                            className="inline-flex items-center gap-3 text-slate-900 font-bold hover:text-blue-600 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                                <ArrowLeft size={18} />
                                            </div>
                                            <span>Back to {post.categories.title}</span>
                                        </Link>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Connect</p>
                                        <Link
                                            href="/contact"
                                            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                                        >
                                            Get Expert Advice
                                        </Link>
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
