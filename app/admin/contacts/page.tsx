'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Mail, Phone, Trash2, Loader2, ArrowRight, User, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactsPage() {
    const supabase = createClient();
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentUserProfile, setCurrentUserProfile] = useState<any>(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            setCurrentUserProfile(profile);
        }
        await fetchRequests();
    };

    const fetchRequests = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setRequests(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this request?')) return;
        const { error } = await supabase.from('contact_requests').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchRequests();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    if (currentUserProfile?.role !== 'admin') {
        return (
            <div className="p-8 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3">
                <Mail size={24} />
                <p className="font-bold">Access Denied: Only administrators can view contact requests.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact Requests</h1>
                <p className="text-slate-500 mt-1">Manage and respond to consultation requests from visitors.</p>
            </header>

            <div className="grid gap-6">
                {loading ? (
                    <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-100 italic">
                        Loading requests...
                    </div>
                ) : requests.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
                        <Mail size={48} className="mx-auto mb-4 opacity-10" />
                        <p>No contact requests yet.</p>
                    </div>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                                {req.full_name?.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg">{req.full_name}</h3>
                                                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">{new Date(req.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="md:hidden">
                                            <button
                                                onClick={() => handleDelete(req.id)}
                                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail size={16} className="text-slate-400" />
                                            <a href={`mailto:${req.email}`} className="hover:text-blue-600 underline-offset-2 hover:underline">
                                                {req.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone size={16} className="text-slate-400" />
                                            <a href={`tel:${req.phone}`} className="hover:text-blue-600 underline-offset-2 hover:underline">
                                                {req.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                                {req.service}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                                            {req.message || <span className="italic text-slate-400">No message provided.</span>}
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-col justify-between items-end border-l border-slate-100 pl-6 min-w-[120px]">
                                    <button
                                        onClick={() => handleDelete(req.id)}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                        title="Delete Request"
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                    <a
                                        href={`mailto:${req.email}?subject=Regarding your ${req.service} query`}
                                        className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                                    >
                                        Reply <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
