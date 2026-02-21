'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, MessageCircle, Share2 } from 'lucide-react';

interface SocialShareProps {
    url: string;
}

export default function SocialShare({ url }: SocialShareProps) {
    const handleCopy = () => {
        if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(url || window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <div className="sticky top-32 flex flex-col gap-5 items-center">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] [writing-mode:vertical-lr] mb-2">Share Story</p>
            <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-blue-500/10 border border-slate-100 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-blue-500/20 group"
            >
                <Facebook size={20} className="text-[#1877F2] fill-[#1877F2]" />
            </Link>
            <Link
                href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                target="_blank"
                className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-sky-500/10 border border-slate-100 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-sky-500/20 group"
            >
                <Twitter size={20} className="text-[#1DA1F2] fill-[#1DA1F2]" />
            </Link>
            <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-blue-700/10 border border-slate-100 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-blue-700/20 group"
            >
                <Linkedin size={20} className="text-[#0A66C2] fill-[#0A66C2]" />
            </Link>
            <Link
                href={`https://wa.me/?text=${shareUrl}`}
                target="_blank"
                className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-green-500/10 border border-slate-100 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-green-500/20 group"
            >
                <MessageCircle size={20} className="text-[#25D366] fill-[#25D366]" />
            </Link>
            <button
                onClick={handleCopy}
                className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200 border border-slate-100 flex items-center justify-center transition-all hover:bg-slate-900 hover:text-white group"
            >
                <Share2 size={20} />
            </button>
        </div>
    );
}
