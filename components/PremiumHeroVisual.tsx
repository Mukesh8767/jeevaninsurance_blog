'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function PremiumHeroVisual() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Base Background */}
            <div className="absolute inset-0 bg-white" />

            {/* Mesh Gradient Blobs */}
            <div className="absolute inset-0 opacity-40">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-100/50 to-indigo-100/30 blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 120, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-slate-100 to-blue-50 blur-[100px]"
                />

                {/* Warm Heartfelt Glow */}
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-orange-100/20 blur-[150px]"
                />
            </div>

            {/* Architectural Grid / Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-slate-900" />
                    </pattern>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <rect width="100" height="100" fill="url(#grid-pattern)" />

                {/* Horizontal Scanning Line */}
                <motion.line
                    x1="0" y1="0" x2="100" y2="0"
                    stroke="url(#line-grad)"
                    strokeWidth="0.5"
                    animate={{ y: [0, 100, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* Dynamic Connecting Nodes (Data Visualization Style) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="node-glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Animated Paths */}
                {[...Array(5)].map((_, i) => (
                    <motion.path
                        key={i}
                        d={`M ${-100 + i * 200},${400 + Math.sin(i) * 200} Q ${500},${200 + i * 100} ${1100},${600 - i * 100}`}
                        fill="none"
                        stroke={i % 2 === 0 ? "#3b82f6" : "#94a3b8"}
                        strokeWidth="0.5"
                        strokeDasharray="10 1000"
                        animate={{
                            strokeDashoffset: [-1000, 0],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* Floating "Certainty" Nodes */}
                {[...Array(12)].map((_, i) => (
                    <motion.g
                        key={`node-${i}`}
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 1000,
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            x: [null, Math.random() * 1000, Math.random() * 1000],
                            y: [null, Math.random() * 1000, Math.random() * 1000],
                            opacity: [0, 0.4, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    >
                        <circle r="4" fill="#3b82f6" filter="url(#node-glow)" />
                        <circle r="12" stroke="#3b82f6" strokeWidth="0.5" fill="none" className="opacity-20" />
                    </motion.g>
                ))}
            </svg>

            {/* Grain Texture / Noise for Premium Feel */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            {/* Linear fade to content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
        </div>
    );
}
