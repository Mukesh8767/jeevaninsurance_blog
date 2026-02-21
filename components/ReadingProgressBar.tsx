'use client';

import React, { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            if (height > 0) {
                setProgress((scroll / height) * 100);
            }
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-[60]">
            <div
                className="h-full bg-blue-600 shadow-[0_0_10px_#2563eb] transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
