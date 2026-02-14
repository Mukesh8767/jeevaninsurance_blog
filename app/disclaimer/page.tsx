import LegalLayout from '@/components/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer | JivanSecure',
    description: 'Read our financial disclaimer and liability limitations.',
};

export default function DisclaimerPage() {
    return <LegalLayout initialSection="disclaimer" />;
}
