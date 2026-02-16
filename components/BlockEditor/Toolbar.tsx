'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bold, Italic, Palette, Type, Underline, AlignLeft, AlignCenter, AlignRight, Hash } from 'lucide-react';

interface ToolbarProps {
    onFormat: (type: string, value?: any) => void;
    position: { top: number; left: number };
    isVisible: boolean;
}

const COLORS = [
    { label: 'Default', value: 'inherit' },
    { label: 'Gray', value: '#64748b' },
    { label: 'Red', value: '#ef4444' },
    { label: 'Blue', value: '#3b82f6' },
    { label: 'Green', value: '#22c55e' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Orange', value: '#f97316' },
];

const FONTS = [
    { label: 'Sans', value: 'var(--font-inter, sans-serif)' },
    { label: 'Serif', value: 'Georgia, serif' },
    { label: 'Mono', value: 'monospace' },
];

export function Toolbar({ onFormat, position, isVisible }: ToolbarProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    style={{
                        top: Math.max(20, position.top - 60),
                        left: position.left,
                        position: 'fixed'
                    }}
                    className="z-[10000] flex items-center gap-1.5 p-2 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-slate-700/50 ring-1 ring-white/10"
                >
                    <div className="flex gap-0.5">
                        <button
                            onClick={() => onFormat('bold')}
                            className="p-2 hover:bg-slate-700/50 rounded-lg text-white transition-all active:scale-90"
                            title="Bold"
                        >
                            <Bold size={16} />
                        </button>
                        <button
                            onClick={() => onFormat('italic')}
                            className="p-2 hover:bg-slate-700/50 rounded-lg text-white transition-all active:scale-90"
                            title="Italic"
                        >
                            <Italic size={16} />
                        </button>
                        <button
                            onClick={() => onFormat('underline')}
                            className="p-2 hover:bg-slate-700/50 rounded-lg text-white transition-all active:scale-90"
                            title="Underline"
                        >
                            <Underline size={16} />
                        </button>
                    </div>

                    <div className="w-[1px] h-6 bg-slate-700 mx-1" />

                    <div className="flex gap-1">
                        {COLORS.slice(1, 6).map(color => (
                            <button
                                key={color.value}
                                onClick={() => onFormat('color', color.value)}
                                style={{ backgroundColor: color.value }}
                                className="w-5 h-5 rounded-full border border-white/20 hover:scale-125 transition-transform"
                                title={color.label}
                            />
                        ))}
                    </div>

                    <div className="w-[1px] h-6 bg-slate-700 mx-1" />

                    <select
                        onChange={(e) => onFormat('fontFamily', e.target.value)}
                        className="bg-transparent text-white text-xs border-none focus:ring-0 cursor-pointer hover:bg-slate-700/50 rounded px-1 transition-colors"
                    >
                        {FONTS.map(f => (
                            <option key={f.value} value={f.value} className="bg-slate-800 text-white">{f.label}</option>
                        ))}
                    </select>

                    <div className="w-[1px] h-6 bg-slate-700 mx-1" />

                    <button
                        onClick={() => onFormat('clear')}
                        className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400 transition-all active:scale-90"
                        title="Clear formatting"
                    >
                        <Type size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

