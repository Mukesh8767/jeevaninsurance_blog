export default function AbstractBackground({ className }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
            {/* Base gradient */}
            <div className="absolute inset-0 bg-white" />

            {/* Abstract flowing shapes */}
            <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full opacity-30"
            >
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E0F2FE" /> {/* Light Blue */}
                        <stop offset="100%" stopColor="#F8FAFC" /> {/* Slate 50 */}
                    </linearGradient>
                    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#DBEAFE" /> {/* Blue 100 */}
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Large flowing curves for "Tech/Consulting" feel */}
                <path
                    d="M0,0 C300,100 800,0 1000,200 L1000,1000 L0,1000 Z"
                    fill="url(#grad1)"
                />
                <path
                    d="M0,500 QE50,300 1000,500 L1000,0 L0,0 Z"
                    fill="url(#grad2)"
                    opacity="0.5"
                />
            </svg>

            {/* Mesh pattern overlay for texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        </div>
    );
}
