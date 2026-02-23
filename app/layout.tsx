'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/lib/providers';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// Note: Metadata export is not compatible with 'use client', 
// so if you need metadata, create a separate metadata-only layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          {!isAdminPage && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
