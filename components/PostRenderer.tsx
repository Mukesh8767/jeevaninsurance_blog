'use client';

import { cn } from '@/lib/utils';

interface TextSpan {
    text: string;
    bold?: boolean;
    color?: string;
}

export default function PostRenderer({ blocks }: { blocks: any[] }) {
    if (!Array.isArray(blocks) || blocks.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 px-4 md:px-0">
            {blocks.map((block) => {
                const { id, type, data, style } = block;

                switch (type) {
                    case 'heading': {
                        const level = style?.level || 1;
                        const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as keyof React.JSX.IntrinsicElements;
                        return (
                            <Tag
                                key={id}
                                className={cn(
                                    "font-extrabold text-slate-900 tracking-tight",
                                    level === 1 ? "text-4xl md:text-5xl mt-12 mb-6" :
                                        level === 2 ? "text-3xl md:text-4xl mt-10 mb-5" :
                                            "text-2xl md:text-3xl mt-8 mb-4"
                                )}
                                style={{ color: style?.color }}
                            >
                                {data.text}
                            </Tag>
                        );
                    }

                    case 'paragraph': {
                        const paragraphProps = {
                            key: id,
                            className: "text-slate-600 leading-relaxed text-lg font-light blog-paragraph",
                            style: {
                                fontSize: style?.fontSize || '1.125rem',
                                lineHeight: style?.lineHeight || '1.8'
                            }
                        };

                        if (data.html) {
                            return <p {...paragraphProps} dangerouslySetInnerHTML={{ __html: data.html }} />;
                        }

                        return (
                            <p {...paragraphProps}>
                                {data.text.map((span: TextSpan, idx: number) => (
                                    <span
                                        key={idx}
                                        className={cn(span.bold && "font-semibold text-slate-900")}
                                        style={{ color: span.color }}
                                    >
                                        {span.text}
                                    </span>
                                ))}
                            </p>
                        );
                    }



                    case 'image':
                        return (
                            <figure key={id} className="my-12 space-y-4">
                                <div className="overflow-hidden shadow-2xl shadow-slate-200" style={{ borderRadius: style?.borderRadius || '16px' }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={data.url}
                                        alt={data.caption || "Blog image"}
                                        className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                                        style={{
                                            width: style?.width || '100%',
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                                {data.caption && (
                                    <figcaption className="text-center text-sm text-slate-400 font-medium">
                                        <span className="inline-block w-8 h-[1px] bg-slate-200 align-middle mr-2" />
                                        {data.caption}
                                        <span className="inline-block w-8 h-[1px] bg-slate-200 align-middle ml-2" />
                                    </figcaption>
                                )}
                            </figure>
                        );

                    case 'video':
                        return (
                            <figure key={id} className="my-12 space-y-4">
                                <div className="overflow-hidden shadow-2xl shadow-slate-200" style={{ borderRadius: style?.borderRadius || '16px' }}>
                                    {data.isEmbed ? (
                                        <div className="aspect-video w-full">
                                            <iframe
                                                src={data.url}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <video
                                            src={data.url}
                                            controls
                                            className="w-full h-auto object-cover"
                                            style={{
                                                width: style?.width || '100%',
                                            }}
                                        />
                                    )}
                                </div>
                                {data.caption && (
                                    <figcaption className="text-center text-sm text-slate-400 font-medium">
                                        <span className="inline-block w-8 h-[1px] bg-slate-200 align-middle mr-2" />
                                        {data.caption}
                                        <span className="inline-block w-8 h-[1px] bg-slate-200 align-middle ml-2" />
                                    </figcaption>
                                )}
                            </figure>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}
