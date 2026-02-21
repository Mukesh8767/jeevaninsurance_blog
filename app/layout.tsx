'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat, Roboto, Lora, Oswald, Merriweather, Ubuntu, Quicksand } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/lib/providers';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-roboto' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const merriweather = Merriweather({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-merriweather' });
const ubuntu = Ubuntu({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-ubuntu' });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });

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
      <body className={cn(
        inter.className,
        inter.variable,
        playfair.variable,
        montserrat.variable,
        roboto.variable,
        lora.variable,
        oswald.variable,
        merriweather.variable,
        ubuntu.variable,
        quicksand.variable
      )}>
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
