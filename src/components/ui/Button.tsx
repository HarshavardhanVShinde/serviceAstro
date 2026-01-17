import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type BaseButtonProps = {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
};

// Intersection for button usage
type ButtonAsButton = BaseButtonProps &
    Omit<HTMLMotionProps<"button">, "children"> & {
        href?: never;
    };

// Intersection for anchor usage
type ButtonAsAnchor = BaseButtonProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group cursor-pointer";

    const variants = {
        primary: "bg-gradient-to-r from-secondary-500 to-accent-400 text-white shadow-lg shadow-secondary-500/25 hover:shadow-secondary-500/40 border border-transparent",
        secondary: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10",
        outline: "border border-secondary-500 text-secondary-500 hover:bg-secondary-500/10",
        ghost: "text-text-300 hover:text-white hover:bg-white/5"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
            </span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}
        </>
    );

    if (props.href) {
        return (
            <a
                href={props.href}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...(props as HTMLMotionProps<"button">)}
        >
            {content}
        </motion.button>
    );
};

export default Button;
