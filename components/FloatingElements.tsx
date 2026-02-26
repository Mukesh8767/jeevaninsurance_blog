'use client';

import { motion } from 'framer-motion';
import { Heart, Shield, Car, CheckCircle2, TrendingUp, Lock } from 'lucide-react';

export default function FloatingElements() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Health Icon */}
            <motion.div
                initial={{ x: '10%', y: '20%', opacity: 0 }}
                animate={{
                    y: ['18%', '22%', '18%'],
                    opacity: 1,
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute left-[5%] top-[15%] p-4 bg-white/90 border border-white/20 rounded-2xl shadow-xl hidden lg:block"
            >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Heart size={20} />
                </div>
            </motion.div>

            {/* Shield Icon */}
            <motion.div
                initial={{ x: '80%', y: '10%', opacity: 0 }}
                animate={{
                    y: ['8%', '12%', '8%'],
                    opacity: 1,
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute right-[10%] top-[10%] p-4 bg-white/90 border border-white/20 rounded-2xl shadow-xl hidden lg:block"
            >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800">
                    <Shield size={20} />
                </div>
            </motion.div>

            {/* Motor Icon */}
            <motion.div
                initial={{ x: '15%', y: '60%', opacity: 0 }}
                animate={{
                    x: ['14%', '16%', '14%'],
                    opacity: 1,
                    rotate: [0, 3, 0]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute left-[12%] bottom-[20%] p-4 bg-white/90 border border-white/20 rounded-2xl shadow-xl hidden lg:block"
            >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Car size={20} />
                </div>
            </motion.div>

            {/* Trust Badge - Small */}
            <motion.div
                initial={{ x: '70%', y: '80%', opacity: 0 }}
                animate={{
                    y: ['78%', '82%', '78%'],
                    opacity: 1
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute right-[25%] bottom-[15%] px-4 py-2 bg-slate-900 text-white rounded-full shadow-2xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hidden lg:flex"
            >
                <Lock size={12} className="text-blue-400" />
                Secured Planning
            </motion.div>

            {/* Floating Stats or Mini-card */}
            <motion.div
                initial={{ x: '50%', y: '50%', opacity: 0, scale: 0.8 }}
                animate={{
                    y: ['48%', '52%', '48%'],
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute left-[45%] top-[40%] p-6 bg-white/90 border border-white/40 rounded-3xl shadow-2xl hidden lg:block z-20"
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <TrendingUp size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Success Rate</p>
                        <p className="text-lg font-bold text-slate-900">99.2%</p>
                    </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '99.2%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-green-500"
                    />
                </div>
            </motion.div>
        </div>
    );
}
