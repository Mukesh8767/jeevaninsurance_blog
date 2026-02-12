import LegalLayout from '@/components/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | JivanSecure',
    description: 'Read our Terms and Conditions, Privacy Policy, and other legal documents.',
};

export default function TermsPage() {
    return <LegalLayout initialSection="terms" />;
}
