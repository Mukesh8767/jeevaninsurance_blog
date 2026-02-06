'use client';

import { cn } from '@/lib/utils';

export default function PostRenderer({ blocks }: { blocks: any[] }) {
    if (!Array.isArray(blocks) || blocks.length === 0) return null;

    return (
        <div className="space-y-8">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'heading':
                        return (
                            <h2 key={block.id} className="text-2xl md:text-3xl font-bold text-slate-900 mt-8 mb-4">
                                {block.props.text}
                            </h2>
                        );

                    case 'paragraph':
                        return (
                            <p key={block.id} className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {block.props.text}
                            </p>
                        );

                    case 'image':
                        return (
                            <figure key={block.id} className="my-8">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={block.props.url}
                                    alt="Content image"
                                    className="w-full rounded-xl shadow-lg"
                                    loading="lazy"
                                />
                            </figure>
                        );

                    case 'quote':
                        return (
                            <blockquote key={block.id} className="border-l-4 border-blue-600 pl-6 my-8 italic text-xl text-slate-800 bg-slate-50 py-4 pr-4 rounded-r-lg">
                                "{block.props.text}"
                            </blockquote>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}
