import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Bot, Code2, Smartphone, Terminal, Cpu, Globe, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const services = [
    {
        title: 'Custom Software',
        desc: 'Scalable, enterprise-grade software built to your exact specifications.',
        icon: Terminal,
        gradient: 'from-violet-500/20 to-purple-500/20'
    },
    {
        title: 'AI Integration',
        desc: 'Leverage the power of LLMs and Machine Learning to automate workflows.',
        icon: Bot,
        gradient: 'from-cyan-500/30 to-teal-500/30',
        featured: true
    },
    {
        title: 'Web Applications',
        desc: 'Modern, high-performance web apps using React, Astro, and Next.js.',
        icon: Code2,
        gradient: 'from-blue-500/20 to-indigo-500/20'
    },
    {
        title: 'Mobile Development',
        desc: 'Native and cross-platform mobile apps that delight users.',
        icon: Smartphone,
        gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
        title: 'Legacy Modernization',
        desc: 'Transform outdated systems into modern cloud-native architectures.',
        icon: Cpu,
        gradient: 'from-amber-500/20 to-orange-500/20'
    },
    {
        title: 'SaaS Platforms',
        desc: 'End-to-end SaaS development from MVP to global scale.',
        icon: Globe,
        gradient: 'from-emerald-500/20 to-green-500/20'
    }
];

export default function ServicesGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = containerRef.current?.querySelectorAll('.service-card');

        if (cards) {
            gsap.fromTo(cards,
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
                const Icon = service.icon;
                const isFeatured = service.featured;

                return (
                    <div
                        key={i}
                        className={`service-card group relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden
              ${isFeatured
                                ? 'bg-gradient-to-br from-cyan-500/10 to-teal-500/5 border border-cyan-400/30 shadow-[0_0_40px_-5px_rgba(6,182,212,0.2)]'
                                : 'bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05]'
                            }`}
                    >
                        {/* Background Gradient Orb */}
                        <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                        {/* Large ghost icon in corner */}
                        <div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                            <Icon className="w-28 h-28" strokeWidth={1} />
                        </div>

                        {/* Icon Container */}
                        <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300
              ${isFeatured
                                ? 'bg-gradient-to-br from-cyan-500/30 to-teal-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                                : `bg-gradient-to-br ${service.gradient} text-white/80`
                            }`}
                        >
                            <Icon className="w-8 h-8" strokeWidth={1.5} />
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-bold mb-3 transition-colors duration-300
              ${isFeatured ? 'text-cyan-300 group-hover:text-cyan-200' : 'text-white group-hover:text-accent-400'}`}
                        >
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-text-300 leading-relaxed mb-6 text-sm">
                            {service.desc}
                        </p>

                        {/* Link */}
                        <a href={`/services/${service.title.toLowerCase().replace(' ', '-')}`} className={`inline-flex items-center text-sm font-bold transition-colors gap-2
              ${isFeatured ? 'text-cyan-400 hover:text-white' : 'text-secondary-500 hover:text-white'}`}
                        >
                            Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        {/* Pulsing Neon Border for Featured Card */}
                        {isFeatured && (
                            <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
