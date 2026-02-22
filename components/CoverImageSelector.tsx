'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, X, UploadCloud, Loader2, Link as LinkIcon } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';

interface CoverImageSelectorProps {
    url: string;
    onChange: (url: string) => void;
}

export default function CoverImageSelector({ url, onChange }: CoverImageSelectorProps) {
    const [uploading, setUploading] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [showUrlInput, setShowUrlInput] = useState(false);
    const supabase = createClient();

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `cover-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `post-covers/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('public-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('public-media')
                .getPublicUrl(filePath);

            onChange(publicUrl);
            setShowUrlInput(false);
        } catch (error: any) {
            alert('Error uploading cover image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (urlInput.trim()) {
            onChange(urlInput.trim());
            setUrlInput('');
            setShowUrlInput(false);
        }
    };

    if (url) {
        return (
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden group border border-slate-200 shadow-sm mb-8">
                <img
                    src={url}
                    alt="Cover preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <button
                        onClick={() => onChange('')}
                        className="p-3 bg-white/90 hover:bg-white rounded-full text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 flex items-center gap-2 font-bold text-sm"
                    >
                        <X size={20} />
                        Remove Cover
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mb-8">
            {!showUrlInput ? (
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="flex-1 flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                        {uploading ? (
                            <Loader2 size={24} className="text-blue-600 animate-spin" />
                        ) : (
                            <UploadCloud size={24} className="text-slate-400 group-hover:text-blue-600" />
                        )}
                        <span className="font-semibold text-slate-600 group-hover:text-blue-600">
                            {uploading ? 'Uploading...' : 'Upload Cover Image'}
                        </span>
                    </label>

                    <button
                        onClick={() => setShowUrlInput(true)}
                        className="md:w-48 flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-slate-400 hover:bg-slate-50 transition-all text-slate-500 font-semibold"
                    >
                        <LinkIcon size={24} />
                        Paste URL
                    </button>
                </div>
            ) : (
                <div className="p-8 border-2 border-blue-100 bg-blue-50/20 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleUrlSubmit} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                                Image URL
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowUrlInput(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <input
                                autoFocus
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md active:scale-95"
                            >
                                Set Cover
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">
                            Make sure the URL is public and ends with an image extension (jpg, png, webp).
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
}
