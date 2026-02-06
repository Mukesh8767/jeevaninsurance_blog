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
    phone: z.string().regex(/^\+91[0-9]{10}$/, 'Format: +91XXXXXXXXXX'),
    email: z.string().email('Invalid email'),
    service: z.string().min(1, 'Please select a service'),
    message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm({ className }: { className?: string }) {
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
            const { data: request, error: dbError } = await supabase
                .from('contact_requests')
                .insert([data])
                .select()
                .single();

            if (dbError) throw dbError;

            await supabase.functions.invoke('send_contact_email', {
                body: { ...data, id: request.id }
            });

            setIsSuccess(true);
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
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received</h3>
                <p className="text-slate-500 mb-8 font-light">
                    Thank you. A senior consultant will review your profile and contact you within 24 hours.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm font-semibold text-slate-900 underline underline-offset-4 hover:text-blue-600 transition-colors"
                >
                    Submit another request
                </button>
            </motion.div>
        );
    }

    return (
        <div className={cn("bg-white rounded-2xl p-8 lg:p-10 shadow-2xl shadow-slate-200/40 border border-slate-100", className)}>
            <div className="mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                    Start a Conversation
                </h3>
                <p className="text-slate-500 font-light">
                    Expert advice is just a form away.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input
                            {...register('full_name')}
                            className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-900 font-medium"
                            placeholder="Type your name"
                        />
                        {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</label>
                        <input
                            {...register('phone')}
                            className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-900 font-medium"
                            placeholder="+91"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-900 font-medium"
                        placeholder="name@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Area of Interest</label>
                    <select
                        {...register('service')}
                        className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-colors bg-transparent text-slate-900 font-medium cursor-pointer"
                    >
                        <option value="">Select a topic...</option>
                        <option value="Health Insurance">Health Insurance Protection</option>
                        <option value="Life Insurance">Life & Term Insurance</option>
                        <option value="Motor Insurance">Motor Insurance</option>
                        <option value="Mutual Funds">Wealth Creation (Mutual Funds)</option>
                        <option value="NRI Planning">NRI Financial Planning</option>
                        <option value="Retirement">Retirement Strategy</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                    <textarea
                        {...register('message')}
                        rows={2}
                        className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-900 font-medium resize-none"
                        placeholder="Tell us about your requirements..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full bg-slate-900 text-white font-semibold py-4 px-6 flex justify-between items-center hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span>{isSubmitting ? 'Processing request...' : 'Request Consultation'}</span>
                        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </form>
        </div>
    );
}
