import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export default function AnimatedLogo() {
    const logoRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const paths = logoRef.current?.querySelectorAll('path');
        if (paths) {
            animate(paths, {
                strokeDashoffset: [
                    (el: SVGGeometryElement) => el.getTotalLength(),
                    0
                ],
                easing: 'easeInOutSine',
                duration: 1500,
                delay: (el: any, i: number) => i * 250,
                direction: 'alternate',
                loop: false,
                fillOpacity: [0, 1]
            } as any);
        }
    }, []);

    return (
        <div className="flex items-center gap-2">
            <svg
                ref={logoRef}
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent-400"
            >
                <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                    fillOpacity="0"
                />
                <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white">
                Tech<span className="text-accent-400">Firm</span>
            </span>
        </div>
    );
}
