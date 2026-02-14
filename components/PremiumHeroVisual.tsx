'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PremiumHeroVisual() {
    const [mounted, setMounted] = useState(false);

    // Mouse tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth movement springs
    const springConfig = { damping: 30, stiffness: 100 };
    const smX = useSpring(mouseX, springConfig);
    const smY = useSpring(mouseY, springConfig);

    // Transform values for different layers
    const layer1X = useTransform(smX, [0, 1000], [-20, 20]);
    const layer1Y = useTransform(smY, [0, 1000], [-20, 20]);
    const layer2X = useTransform(smX, [0, 1000], [30, -30]);
    const layer2Y = useTransform(smY, [0, 1000], [30, -30]);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Base Background */}
            <div className="absolute inset-0 bg-white" />

            {/* Interactive Spotlight Glow */}
            <motion.div
                style={{
                    x: smX,
                    y: smY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"
            />

            {/* Mesh Gradient Blobs with Parallax */}
            <div className="absolute inset-0 opacity-40">
                <motion.div
                    style={{ x: layer1X, y: layer1Y }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-primary/[0.05] to-secondary/[0.05] blur-[100px]"
                />
                <motion.div
                    style={{ x: layer2X, y: layer2Y }}
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[30%] -right-[5%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-slate-50 to-secondary/5 blur-[100px]"
                />
            </div>

            {/* Advanced Architectural Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.1]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <pattern id="grid-pattern-hero" width="5" height="5" patternUnits="userSpaceOnUse">
                        <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.05" className="text-slate-900" />
                    </pattern>
                    <radialGradient id="grad-spot" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#008C3E" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                <rect width="100" height="100" fill="url(#grid-pattern-hero)" />
            </svg>

            {/* Smooth Flowing Ribbons */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.2]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="ribbon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#008C3E" stopOpacity="0" />
                        <stop offset="50%" stopColor="#000155" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#008C3E" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M-200,500 Q250,200 500,500 T1200,500"
                    fill="none"
                    stroke="url(#ribbon-grad)"
                    strokeWidth="100"
                    animate={{
                        d: [
                            "M-200,500 Q250,200 500,500 T1200,500",
                            "M-200,600 Q250,400 500,600 T1200,400",
                            "M-200,500 Q250,200 500,500 T1200,500"
                        ]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                    d="M-200,300 Q250,600 500,300 T1200,300"
                    fill="none"
                    stroke="url(#ribbon-grad)"
                    strokeWidth="80"
                    className="opacity-50"
                    animate={{
                        d: [
                            "M-200,300 Q250,600 500,300 T1200,300",
                            "M-200,200 Q250,400 500,200 T1200,400",
                            "M-200,300 Q250,600 500,300 T1200,300"
                        ]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </svg>

            {/* Dynamic Connecting Data Web */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="node-glow-hero">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Floating "Security & Trust" Nodes - Slower & Smoother */}
                {[...Array(8)].map((_, i) => (
                    <motion.g
                        key={`node-${i}`}
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 1000,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, "-=150", "+=0"],
                            x: [null, i % 2 === 0 ? "+=50" : "-=50", "+=0"],
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 20,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "linear"
                        }}
                    >
                        <circle r={Math.random() * 2 + 1} fill={i % 3 === 0 ? "#008C3E" : "#000155"} filter="url(#node-glow-hero)" className="opacity-40" />
                        {i % 4 === 0 && (
                            <motion.circle
                                r="12"
                                stroke="#008C3E"
                                strokeWidth="0.1"
                                fill="none"
                                className="opacity-10"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        )}
                    </motion.g>
                ))}
            </svg>



            {/* Bottom Fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
        </div>
    );
}
