'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';

interface WhatsAppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[201] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-lg pointer-events-auto relative overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>

                            <div className="p-8 lg:p-10">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-primary mb-1">WhatsApp Consultation</h3>
                                    <p className="text-sm text-slate-500 font-light">
                                        Fill details to start chatting with our expert.
                                    </p>
                                </div>

                                <ContactForm
                                    isWhatsAppRedirection={true}
                                    hideHeader={true}
                                    onSuccess={() => {
                                        // Small delay before closing to allow redirection
                                        setTimeout(onClose, 1000);
                                    }}
                                    className="p-0 border-0 shadow-none"
                                />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
