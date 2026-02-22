'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { CheckCircle, Clock, FileText, Send, Trash2, ExternalLink, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
    const supabase = createClient();
    const [profile, setProfile] = useState<any>(null);
    const [pendingPosts, setPendingPosts] = useState<any[]>([]);
    const [stats, setStats] = useState({ requests: 0, published: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch Profile
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(profile);

        // Fetch Stats
        const { count: requests } = await supabase.from('contact_requests').select('*', { count: 'exact', head: true });
        const { count: published } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published');
        const { count: pending } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'pending');

        setStats({
            requests: requests || 0,
            published: published || 0,
            pending: pending || 0
        });

        // Fetch Pending Posts for Admin
        const userRoleCheck = profile?.role?.trim().toLowerCase();
        const isAdminCheck = userRoleCheck === 'admin' || userRoleCheck === 'administrator';
        if (isAdminCheck) {
            const { data: pending } = await supabase
                .from('posts')
                .select('*, profiles:author_id(full_name)')
                .eq('status', 'pending')
                .order('created_at', { ascending: true });
            setPendingPosts(pending || []);
        } else {
            // Fetch Recent Posts for Contributor
            const { data: recent } = await supabase
                .from('posts')
                .select('*')
                .eq('author_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);
            setPendingPosts(recent || []);
        }

        setLoading(false);
    };

    const handlePublish = async (id: string) => {
        const { error } = await supabase
            .from('posts')
            .update({ status: 'published', updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) alert(error.message);
        else fetchData();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) {
            console.error('Delete error:', error);
            alert(`Delete failed: ${error.message} (${error.code || 'No code'})`);
        } else {
            fetchData();
        }
    };

    if (loading) return <div className="text-slate-400">Loading dashboard...</div>;

    const userRoleValue = profile?.role?.trim().toLowerCase();
    const isAdmin = userRoleValue === 'admin' || userRoleValue === 'administrator';

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome back, <span className="text-blue-600">{profile?.full_name?.split(' ')[0]}</span>
                    </h1>
                    <p className="text-slate-500 mt-1">Here's what's happening with the blog today.</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {isAdmin ? (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Send size={20} />
                            </div>
                            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider">New Requests</h3>
                        </div>
                        <p className="text-4xl font-black text-slate-900 mt-4 tracking-tighter">{stats.requests}</p>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <FileText size={20} />
                            </div>
                            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider">My Total Posts</h3>
                        </div>
                        <p className="text-4xl font-black text-slate-900 mt-4 tracking-tighter">{pendingPosts.length}</p>
                    </div>
                )}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <CheckCircle size={20} />
                        </div>
                        <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider">{isAdmin ? 'Total Published' : 'Published'}</h3>
                    </div>
                    <p className="text-4xl font-black text-slate-900 mt-4 tracking-tighter">
                        {isAdmin ? stats.published : pendingPosts.filter(p => p.status === 'published').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider">{isAdmin ? 'Pending Review' : 'In Review'}</h3>
                    </div>
                    <p className="text-4xl font-black text-orange-600 mt-4 tracking-tighter">
                        {isAdmin ? stats.pending : pendingPosts.filter(p => p.status === 'pending').length}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-[1fr_350px] gap-8">
                {/* Review Queue or Recent Work */}
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-slate-900 flex items-center gap-2">
                            {isAdmin ? <Clock size={18} className="text-orange-500" /> : <FileText size={18} className="text-blue-500" />}
                            {isAdmin ? 'Review Queue' : 'My Recent Work'}
                        </h2>
                        <Link href="/admin/posts" className="text-sm text-blue-600 font-semibold hover:underline">View All</Link>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {pendingPosts.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                <FileText size={48} className="mx-auto mb-4 opacity-10" />
                                <p>All caught up! No {isAdmin ? 'pending reviews' : 'posts'} found.</p>
                            </div>
                        ) : (
                            pendingPosts.map(post => (
                                <div key={post.id} className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group">
                                    <div className="flex-1">
                                        <Link href={`/admin/blogs/blog?id=${post.id}`} className="hover:text-blue-600 transition-colors">
                                            <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{post.title}</h3>
                                        </Link>
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                            {isAdmin && <span>By {post.profiles?.full_name} •</span>}
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span className={cn("font-bold text-[10px] uppercase px-2 py-0.5 rounded",
                                                post.status === 'published' ? 'bg-green-100 text-green-700' :
                                                    post.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                                            )}>
                                                {post.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {isAdmin && post.status === 'pending' && (
                                            <button
                                                onClick={() => handlePublish(post.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
                                            >
                                                Publish
                                            </button>
                                        )}
                                        <Link
                                            href={`/admin/blogs/blog?id=${post.id}`}
                                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                                            title="Review Post"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                                            title="Edit Post"
                                        >
                                            <ExternalLink size={16} />
                                        </Link>
                                        {(isAdmin || post.author_id === profile?.id) && (
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Sidebar Info */}
                <aside className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                        <h3 className="font-bold text-lg mb-2">Publishing Tip</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Once a post is published, it becomes live on the blog and is moved from the draft/review queue to the published list.
                        </p>
                        <Link href="/admin/posts/new" className="mt-4 block bg-white/20 hover:bg-white/30 text-center py-2 rounded-xl text-sm font-bold transition-colors">
                            Create New Post
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">Admin Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Global Visibility</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Direct Post</span>
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                    {profile?.can_post_direct ? 'Always' : 'Requires Review'}
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
