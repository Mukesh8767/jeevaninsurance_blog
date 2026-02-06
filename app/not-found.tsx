import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h2>
            <p className="text-slate-600 mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
                Please verify the URL or return to the homepage.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Home
            </Link>
        </div>
    );
}
