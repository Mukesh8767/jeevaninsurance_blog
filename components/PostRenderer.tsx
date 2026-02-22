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
        <div className="max-w-4xl mx-auto px-4 md:px-0 selection:bg-blue-100 selection:text-blue-900">
            {blocks.map((block) => {
                const { id, type, data, style } = block;

                switch (type) {
                    case 'heading': {
                        const level = style?.level || 1;
                        const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as keyof React.JSX.IntrinsicElements;
                        const className = cn(
                            "font-black text-slate-900 tracking-tight transition-colors duration-300",
                            level === 1 ? "text-4xl md:text-5xl mt-20 mb-8 leading-[1.1]" :
                                level === 2 ? "text-3xl md:text-4xl mt-16 mb-6 leading-[1.2] border-l-4 border-blue-600 pl-6" :
                                    "text-2xl md:text-3xl mt-12 mb-4 leading-normal"
                        );
                        const headingStyle = {
                            color: style?.color,
                            fontFamily: style?.fontFamily || 'inherit'
                        };

                        if (data.html) {
                            return <Tag key={id} className={className} style={headingStyle} dangerouslySetInnerHTML={{ __html: data.html }} />;
                        }

                        return (
                            <Tag key={id} className={className} style={headingStyle}>
                                {data.text}
                            </Tag>
                        );
                    }

                    case 'paragraph': {
                        const paragraphProps = {
                            key: id,
                            className: "text-slate-600 leading-[1.9] text-xl font-light mb-8 blog-paragraph antialiased",
                            style: {
                                fontSize: style?.fontSize || '1.25rem',
                                lineHeight: style?.lineHeight || '1.9',
                                fontFamily: style?.fontFamily || 'inherit'
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
                                        className={cn(span.bold && "font-bold text-slate-900")}
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
                            <figure key={id} className="my-16 space-y-4 group">
                                <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 bg-slate-50">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={data.url}
                                        alt={data.caption || "Blog image"}
                                        className="w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-1000"
                                        style={{
                                            width: style?.width || '100%',
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                                {data.caption && (
                                    <figcaption className="text-center text-sm text-slate-400 font-semibold tracking-wide flex items-center justify-center gap-3 italic">
                                        <span className="w-12 h-[1px] bg-slate-200" />
                                        {data.caption}
                                        <span className="w-12 h-[1px] bg-slate-200" />
                                    </figcaption>
                                )}
                            </figure>
                        );

                    case 'video':
                        return (
                            <figure key={id} className="my-16 space-y-4">
                                <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 bg-slate-900">
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
                                    <figcaption className="text-center text-sm text-slate-400 font-semibold tracking-wide italic">
                                        {data.caption}
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
