import LegalLayout from '@/components/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Advertising Policy | JivanSecure',
    description: 'Learn about our advertising policies and third-party partners.',
};

export default function AdvertisingPolicyPage() {
    return <LegalLayout initialSection="advertising" />;
}
