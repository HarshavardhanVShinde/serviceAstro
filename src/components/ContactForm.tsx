import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    service: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
    };

    if (isSuccess) {
        return (
            <div className="bg-success-500/10 border border-success-500 rounded-2xl p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-success-500/20 text-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-success-500 mb-2">Message Sent!</h3>
                <p className="text-gray-300">We'll get back to you within 24 hours.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-sm text-success-500 hover:text-success-400 font-bold underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Name</label>
                    <input
                        {...register("name")}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none transition-all hover:bg-white/10 backdrop-blur-sm shadow-inner"
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-sm pl-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <input
                        {...register("email")}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none transition-all hover:bg-white/10 backdrop-blur-sm shadow-inner"
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm pl-1">{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Service Interest</label>
                    <div className="relative">
                        <select
                            {...register("service")}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none transition-all appearance-none cursor-pointer hover:bg-white/10 backdrop-blur-sm"
                        >
                            <option value="" className="bg-[#0A0E27]">Select a service...</option>
                            <option value="custom-software" className="bg-[#0A0E27]">Custom Software</option>
                            <option value="ai-integration" className="bg-[#0A0E27]">AI Integration</option>
                            <option value="mobile-app" className="bg-[#0A0E27]">Mobile App</option>
                            <option value="web-app" className="bg-[#0A0E27]">Web Application</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Budget Range</label>
                    <div className="relative">
                        <select
                            {...register("budget")}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none transition-all appearance-none cursor-pointer hover:bg-white/10 backdrop-blur-sm"
                        >
                            <option value="" className="bg-[#0A0E27]">Select budget...</option>
                            <option value="<5k" className="bg-[#0A0E27]">&lt; $5k</option>
                            <option value="5k-20k" className="bg-[#0A0E27]">$5k - $20k</option>
                            <option value="20k-50k" className="bg-[#0A0E27]">$20k - $50k</option>
                            <option value="50k+" className="bg-[#0A0E27]">$50k+</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Project Details</label>
                <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none transition-all resize-none hover:bg-white/10 backdrop-blur-sm shadow-inner"
                    placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-red-400 text-sm pl-1">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-secondary-500 to-accent-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-secondary-500/20 hover:shadow-secondary-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
            >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center gap-2">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </span>
            </button>
        </form>
    );
}
