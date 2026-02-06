import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/lib/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JivanSecure | Expert Financial & Insurance Advisory',
  description: 'Secure your future with JivanSecure based in India. Expert advice on Health, Life, Motor Insurance and Mutual Funds by Satish Mishra.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://jivansecure.com',
    siteName: 'JivanSecure',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
