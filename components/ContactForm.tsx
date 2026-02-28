'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@/lib/supabaseClient';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
    full_name: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid phone number required'),
    email: z.string().email('Invalid email'),
    service: z.string().min(1, 'Please select a topic'),
    message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm({
    className,
    onSuccess,
    isWhatsAppRedirection = false,
    hideHeader = false,
    isCompact = false
}: {
    className?: string;
    onSuccess?: () => void;
    isWhatsAppRedirection?: boolean;
    hideHeader?: boolean;
    isCompact?: boolean;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const supabase = createClient();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: '+91',
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            // Optional: Still save to Supabase if config exists
            try {
                const { data: request, error: dbError } = await supabase
                    .from('contact_requests')
                    .insert([data])
                    .select()
                    .single();

                if (!dbError && request) {
                    await supabase.functions.invoke('send_contact_email', {
                        body: { ...data, id: request.id }
                    });
                }
            } catch (err) {
                console.warn('Backend logging failed, proceeding with redirection', err);
            }

            if (isWhatsAppRedirection) {
                const whatsappMessage = `*New Consultation Request*\n\n*Name:* ${data.full_name}\n*Phone:* ${data.phone}\n*Email:* ${data.email}\n*Interest:* ${data.service}\n*Requirement:* ${data.message || 'Brief consultation'}`;
                const encodedMessage = encodeURIComponent(whatsappMessage);
                window.open(`https://wa.me/919588472632?text=${encodedMessage}`, '_blank');
            }

            setIsSuccess(true);
            onSuccess?.();
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn("p-12 bg-white rounded-none border border-slate-100 text-center shadow-2xl shadow-slate-200/50", className)}
            >
                <div className="flex justify-center mb-6">
                    <CheckCircle2 className="w-16 h-16 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Request Received</h3>
                <p className="text-slate-500 mb-8 font-light">
                    Thank you. A senior consultant will review your profile and contact you within 24 hours.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-secondary transition-colors"
                >
                    Submit another request
                </button>
            </motion.div>
        );
    }

    return (
        <div className={cn("bg-white rounded-2xl p-8 lg:p-10 shadow-2xl shadow-slate-200/40 border border-slate-100", className)}>
            {!hideHeader && (
                <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2 tracking-tight">
                        Start a Conversation
                    </h3>
                    <p className="text-slate-500 font-light">
                        Expert advice is just a form away.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", isCompact && "space-y-4")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className={cn("space-y-1", isCompact && "space-y-0.5")}>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input
                            {...register('full_name')}
                            className="w-full py-3 border-b border-slate-200 focus:border-secondary outline-none transition-colors bg-transparent placeholder:text-slate-300 text-primary font-medium"
                            placeholder="Type your name"
                        />
                        {errors.full_name && <p className="text-red-500 text-[10px] mt-1 italic">{errors.full_name.message}</p>}
                    </div>

                    <div className={cn("space-y-1", isCompact && "space-y-0.5")}>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</label>
                        <div className="flex gap-4 border-b border-slate-200 focus-within:border-secondary transition-colors">
                            <span className="py-3 text-slate-400 font-medium">+91</span>
                            <input
                                {...register('phone')}
                                className="w-full py-3 outline-none bg-transparent placeholder:text-slate-300 text-primary font-medium"
                                placeholder="Enter contact number"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-[10px] mt-1 italic">{errors.phone.message}</p>}
                    </div>

                    <div className={cn("space-y-1", isCompact && "space-y-0.5")}>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="w-full py-3 border-b border-slate-200 focus:border-secondary outline-none transition-colors bg-transparent placeholder:text-slate-300 text-primary font-medium"
                            placeholder="name@company.com"
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 italic">{errors.email.message}</p>}
                    </div>

                    <div className={cn("space-y-1", isCompact && "space-y-0.5")}>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Area of Interest</label>
                        <select
                            {...register('service')}
                            className="w-full py-3 border-b border-slate-200 focus:border-secondary outline-none transition-colors bg-transparent text-primary font-medium cursor-pointer appearance-none"
                        >
                            <option value="">Select a topic...</option>
                            <option value="Health Insurance">Health Insurance Protection</option>
                            <option value="Life Insurance">Life & Term Insurance</option>
                            <option value="Motor Insurance">Motor Insurance</option>
                            <option value="Mutual Funds">Wealth Creation (Mutual Funds)</option>
                            <option value="NRI Planning">NRI Financial Planning</option>
                            <option value="Retirement">Retirement Strategy</option>
                        </select>
                        {errors.service && <p className="text-red-500 text-[10px] mt-1 italic">{errors.service.message}</p>}
                    </div>
                </div>

                <div className={cn("space-y-1", isCompact && "space-y-0.5")}>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                    <textarea
                        {...register('message')}
                        rows={1}
                        className="w-full py-3 border-b border-slate-200 focus:border-secondary outline-none transition-colors bg-transparent placeholder:text-slate-300 text-primary font-medium resize-none"
                        placeholder="Tell us about your requirements..."
                    />
                </div>

                <div className="pt-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        suppressHydrationWarning
                        className="group w-full bg-primary text-white font-semibold py-4 px-6 flex justify-between items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-xl"
                    >
                        <span>{isSubmitting ? 'Processing...' : 'Request Consultation'}</span>
                        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
