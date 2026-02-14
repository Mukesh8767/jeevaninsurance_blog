'use client';

import React from 'react';

interface HeadingBlockProps {
    data: { text: string };
    style: { level: number; color?: string };
    onChange: (data: any, style: any) => void;
    onEnter: () => void;
    onDeleteIfEmpty: () => void;
}

export function HeadingBlock({ data, style, onChange, onEnter, onDeleteIfEmpty }: HeadingBlockProps) {
    const level = style.level || 1;
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onEnter();
        } else if (e.key === 'Backspace' && data.text === '') {
            e.preventDefault();
            onDeleteIfEmpty();
        }
    };

    return (
        <div className="w-full">
            <input
                className={`w-full bg-transparent border-none focus:ring-0 outline-none font-bold placeholder:text-slate-300 ${level === 1 ? 'text-4xl' : level === 2 ? 'text-3xl' : 'text-2xl'
                    }`}
                style={{ color: style.color || '#1f2937' }}
                placeholder={`Heading ${level}...`}
                value={data.text}
                onChange={(e) => onChange({ text: e.target.value }, style)}
                onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    );
}
