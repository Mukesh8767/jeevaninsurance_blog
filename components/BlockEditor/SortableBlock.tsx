'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Image as ImageIcon, Type, Quote } from 'lucide-react';

export function SortableBlock({ id, block, updateBlock, removeBlock }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex gap-2 items-start group mb-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div {...attributes} {...listeners} className="mt-2 cursor-grab text-slate-400 hover:text-slate-600 touch-none">
                <GripVertical size={20} />
            </div>

            <div className="flex-1">
                <label className="text-xs font-semibold text-slate-400 uppercase mb-1 block">{block.type}</label>

                {block.type === 'heading' && (
                    <input
                        className="w-full text-2xl font-bold border-none focus:ring-0 outline-none placeholder:text-slate-300"
                        placeholder="Heading..."
                        value={block.props.text || ''}
                        onChange={(e) => updateBlock(id, { ...block.props, text: e.target.value })}
                    />
                )}

                {block.type === 'paragraph' && (
                    <textarea
                        className="w-full min-h-[100px] border-none focus:ring-0 outline-none resize-none placeholder:text-slate-300 leading-relaxed"
                        placeholder="Write your content here..."
                        value={block.props.text || ''}
                        onChange={(e) => updateBlock(id, { ...block.props, text: e.target.value })}
                    />
                )}

                {block.type === 'image' && (
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors">
                        {block.props.url ? (
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={block.props.url} alt="Uploaded" className="max-h-64 mx-auto rounded" />
                                <button onClick={() => updateBlock(id, { ...block.props, url: '' })} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">Remove</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <ImageIcon className="mx-auto text-slate-400" size={32} />
                                <p className="text-sm text-slate-500">Paste an Image URL (Upload handled separately)</p>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    className="w-full border rounded px-3 py-2 text-sm"
                                    value={block.props.url || ''}
                                    onChange={(e) => updateBlock(id, { ...block.props, url: e.target.value })}
                                />
                            </div>
                        )}
                    </div>
                )}

                {block.type === 'quote' && (
                    <div className="flex gap-4">
                        <Quote className="text-slate-300 shrink-0" size={24} />
                        <textarea
                            className="w-full italic border-none focus:ring-0 outline-none resize-none text-lg text-slate-600 placeholder:text-slate-300"
                            placeholder="Quote text..."
                            value={block.props.text || ''}
                            onChange={(e) => updateBlock(id, { ...block.props, text: e.target.value })}
                        />
                    </div>
                )}
            </div>

            <button onClick={() => removeBlock(id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
            </button>
        </div>
    );
}
