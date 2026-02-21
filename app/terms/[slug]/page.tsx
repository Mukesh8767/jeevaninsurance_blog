import { notFound } from 'next/navigation';
import LegalLayout from '@/components/LegalLayout';
import { Metadata } from 'next';

const validSlugs = ['terms', 'privacy', 'advertising', 'disclaimer', 'contact'];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    const titles: Record<string, string> = {
        'terms': 'Terms of Use',
        'privacy': 'Privacy Policy',
        'advertising': 'Advertising Policy',
        'disclaimer': 'Legal Disclaimer',
        'contact': 'Contact & Support'
    };

    if (!validSlugs.includes(slug)) return { title: 'Not Found' };

    return {
        title: `${titles[slug]} | JivanSecure`,
        description: `Read our ${titles[slug]} and other legal documents.`
    };
}

export default async function TermCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!validSlugs.includes(slug)) {
        notFound();
    }

    return <LegalLayout initialSection={slug} />;
}
