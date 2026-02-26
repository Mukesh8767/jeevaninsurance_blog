'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type VisualType = 'health' | 'life' | 'motor' | 'mutual-funds' | 'nri' | 'retirement' | string;

interface CategoryVisualProps {
    type: VisualType;
    className?: string;
    animate?: boolean;
}

export default function CategoryVisual({ type, className, animate = true }: CategoryVisualProps) {
    // Advanced color palettes and styles based on user prompts
    const getTheme = (t: string) => {
        const normalized = t.toLowerCase();
        if (normalized.includes('health') || normalized.includes('mutual')) return {
            c1: '#1e3a8a', // Dark Blue
            c2: '#06b6d4', // Cyan
            c3: '#eff6ff', // White/Blue tint
            style: 'flow'
        };
        if (normalized.includes('motor') || normalized.includes('retirement')) return {
            c1: '#334155', // Slate 700 (Dark Metal)
            c2: '#94a3b8', // Slate 400 (Silver)
            c3: '#f8fafc', // Shine
            style: 'sharp'
        };
        if (normalized.includes('life') || normalized.includes('comfort')) return {
            c1: '#b91c1c', // Crimson Red
            c2: '#f87171', // Red 400
            c3: '#fff1f1', // Pinkish white
            style: 'comfort'
        };
        if (normalized.includes('nri')) return {
            c1: '#0f172a', // Slate 900
            c2: '#3b82f6', // Blue 500
            c3: '#60a5fa', // Blue 400
            style: 'circle'
        };
        return {
            c1: '#0f172a',
            c2: '#64748b',
            c3: '#e2e8f0',
            style: 'flow'
        };
    };

    const theme = getTheme(type);

    // Unique path generators for "AI-like" abstract shapes
    const renderShapes = () => {
        if (theme.style === 'sharp') { // Motor / Engineering look
            return (
                <g>
                    <motion.path
                        d="M0,300 L150,50 L400,200 L400,300 Z"
                        fill={`url(#grad-${type})`}
                        opacity="0.8"
                        animate={animate ? { d: ["M0,300 L150,50 L400,200 L400,300 Z", "M0,300 L100,0 L400,150 L400,300 Z", "M0,300 L150,50 L400,200 L400,300 Z"] } : {}}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                        d="M-50,300 L200,300 L100,100 Z"
                        fill={theme.c2}
                        opacity="0.4"
                        /* filter removed */
                        animate={animate ? { x: [0, 50, 0] } : {}}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </g>
            );
        }
        if (theme.style === 'circle') { // Life / Global look
            return (
                <g>
                    <motion.circle cx="300" cy="150" r="120" fill={`url(#grad-${type})`} opacity="0.6" animate={animate ? { scale: [1, 1.1, 1], translate: [0, 10, 0] } : {}} transition={{ duration: 10, repeat: Infinity }} />
                    <motion.circle cx="100" cy="250" r="180" fill={theme.c2} opacity="0.3" style={{ filter: 'url(#glass-glow)' }} animate={animate ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 15, repeat: Infinity }} />
                </g>
            );
        }
        if (theme.style === 'comfort') { // Heartfelt / Protective look
            return (
                <g>
                    <motion.circle
                        cx="200" cy="150" r="140"
                        fill={`url(#grad-${type})`}
                        opacity="0.5"
                        animate={animate ? {
                            scale: [1, 1.05, 1],
                            opacity: [0.4, 0.6, 0.4]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M200,50 Q250,50 250,100 T200,200 T150,100 Q150,50 200,50"
                        fill={theme.c2}
                        opacity="0.3"
                        /* filter removed */
                        animate={animate ? {
                            scale: [1, 1.1, 1],
                            rotate: [-2, 2, -2]
                        } : {}}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </g>
            );
        }
        // Default Flow (Health / Organic)
        return (
            <g>
                <motion.path
                    d="M-100,200 Q100,50 400,150 T900,200 V400 H-100 Z"
                    fill={`url(#grad-${type})`}
                    animate={animate ? { d: ["M-100,200 Q100,50 400,150 T900,200 V400 H-100 Z", "M-100,250 Q100,150 400,50 T900,250 V400 H-100 Z", "M-100,200 Q100,50 400,150 T900,200 V400 H-100 Z"] } : {}}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    opacity="0.8"
                />
                <motion.path
                    d="M-100,300 Q200,200 500,300 T800,100 V400 H-100 Z"
                    fill={theme.c2}
                    style={{ filter: 'url(#glass-glow)' }}
                    opacity="0.5"
                    animate={animate ? { d: ["M-100,300 Q200,200 500,300 T800,100 V400 H-100 Z", "M-100,350 Q200,100 500,250 T800,150 V400 H-100 Z", "M-100,300 Q200,200 500,300 T800,100 V400 H-100 Z"] } : {}}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </g>
        );
    };

    return (
        <div className={cn("relative overflow-hidden w-full h-full bg-slate-50", className)}>
            <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={theme.c1} />
                        <stop offset="100%" stopColor={theme.c2} />
                    </linearGradient>
                    <linearGradient id="grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    {/* Filters removed for performance */}
                </defs>

                {/* Background Base */}
                <rect width="100%" height="100%" fill="white" />
                <rect width="100%" height="100%" fill={theme.c3} opacity="0.3" />

                {/* Lighting Effect */}
                <circle cx="0" cy="0" r="300" fill="url(#grad-light)" opacity="0.1">
                    <animate attributeName="opacity" values="0.1;0.2;0.1" dur="5s" repeatCount="indefinite" />
                </circle>

                {renderShapes()}

                {/* Texture Overlay removed for performance */}
            </svg>

            {/* Glossy Overlay for "Glass" Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
        </div>
    );
}
