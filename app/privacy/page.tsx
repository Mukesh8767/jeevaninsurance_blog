import LegalLayout from '@/components/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | JivanSecure',
    description: 'Learn how JivanSecure collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
    return <LegalLayout initialSection="privacy" />;
}
