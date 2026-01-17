import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per character
    delay?: number; // initial delay before animation starts
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function DecryptedText({
    text,
    className = '',
    speed = 50,
    delay = 300
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let currentIndex = 0;
        let iterations = 0;
        const maxIterationsPerChar = 3;

        // Initialize with random characters
        setDisplayText(
            text.split('').map(char => char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
        );

        const startDecrypt = () => {
            intervalRef.current = setInterval(() => {
                setDisplayText(prev => {
                    const chars = text.split('');
                    return chars.map((targetChar, index) => {
                        // Already revealed characters stay revealed
                        if (index < currentIndex) return targetChar;
                        // Current character being decrypted
                        if (index === currentIndex) {
                            iterations++;
                            if (iterations >= maxIterationsPerChar) {
                                iterations = 0;
                                currentIndex++;
                                if (currentIndex >= text.length) {
                                    if (intervalRef.current) clearInterval(intervalRef.current);
                                    setIsComplete(true);
                                }
                                return targetChar;
                            }
                            return targetChar === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
                        }
                        // Future characters keep shuffling
                        return targetChar === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
                    }).join('');
                });
            }, speed);
        };

        const timeoutId = setTimeout(startDecrypt, delay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, speed, delay]);

    return (
        <span
            className={`font-mono ${className} ${isComplete ? 'font-sans' : ''}`}
            style={{
                fontFamily: isComplete ? 'inherit' : "'JetBrains Mono', monospace",
                transition: 'font-family 0.3s ease'
            }}
        >
            {displayText.split('').map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-100 ${i < text.indexOf(displayText[i]) || isComplete
                            ? 'text-white'
                            : 'text-accent-400'
                        }`}
                    style={{
                        textShadow: !isComplete && char !== ' ' ? '0 0 8px rgba(6, 182, 212, 0.5)' : 'none'
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}
