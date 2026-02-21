'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have this utility

export default function PostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch Profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        let query = supabase
            .from('posts')
            .select('*, categories(title), subcategories(title)')
            .order('created_at', { ascending: false });

        if (profile?.role === 'contributor') {
            query = query.eq('author_id', user.id);
        }

        const { data } = await query;
        if (data) setPosts(data);
        if (profile) setUserRole(profile.role);
        setLoading(false);
    };

    const deletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (!error) {
            fetchPosts();
        } else {
            console.error('Delete error:', error);
            alert(`Error deleting post: ${error.message}`);
        }
    };

    const publishPost = async (id: string) => {
        if (!confirm('Publish this post?')) return;
        const { error } = await supabase.from('posts').update({ status: 'published' }).eq('id', id);
        if (!error) fetchPosts();
        else alert('Error publishing post');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
                <Link
                    href="/admin/posts/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
                >
                    <Plus size={18} /> New Post
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Title</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Category / Subcategory</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Type</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center text-slate-500">Loading...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-slate-500">No posts found.</td></tr>
                        ) : (
                            posts.map(post => (
                                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <Link href={`/post/${post.slug}`} target="_blank" className="hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-800">{post.categories?.title}</span>
                                            {post.subcategories && (
                                                <span className="text-xs text-slate-400">{post.subcategories.title}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest",
                                            post.post_type === 'news' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                                        )}>
                                            {post.post_type || 'blog'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-2 py-1 rounded-full text-xs font-semibold uppercase",
                                            post.status === 'published' ? 'bg-green-100 text-green-700' :
                                                post.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-slate-100 text-slate-600'
                                        )}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <Link href={`/admin/posts/${post.id}/edit`} className="p-2 text-slate-400 hover:text-blue-600">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 hover:text-red-500">
                                            <Trash2 size={18} />
                                        </button>
                                        <Link href={`/post/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-green-600" title="Preview Post">
                                            <Eye size={18} />
                                        </Link>
                                        {userRole === 'admin' && post.status !== 'published' && (
                                            <button
                                                onClick={() => publishPost(post.id)}
                                                className="p-2 text-slate-400 hover:text-blue-600"
                                                title="Publish Post"
                                            >
                                                <CheckCircle2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
