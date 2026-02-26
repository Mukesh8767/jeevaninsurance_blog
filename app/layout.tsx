import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ConditionalFooter from '@/components/ConditionalFooter';
import Providers from '@/lib/providers';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Important for accessibility and SEO
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://jivansecure.com'),
  title: {
    default: 'JivanSecure | Premium Insurance Advisory by Satish Mishra',
    template: '%s | JivanSecure'
  },
  description: 'Secure your Life, Health, and Vehicles with expert guidance from Satish Mishra. JivanSecure offers trusted insurance solutions and premium advisory services.',
  keywords: ['Insurance', 'Life Insurance', 'Health Insurance', 'Motor Insurance', 'Satish Mishra', 'JivanSecure', 'Premium Insurance Advisory', 'Insurance Planning', 'Financial Protection', 'Risk Management'],
  authors: [{ name: 'Satish Mishra' }],
  creator: 'Satish Mishra',
  publisher: 'JivanSecure',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'JivanSecure',
    title: 'JivanSecure | Premium Insurance Advisory',
    description: 'Securing your Life, Health, and Vehicles with expert guidance. Experience precision in protection with JivanSecure.',
    images: [
      {
        url: '/og-image.jpg', // Placeholder, ensure to add a real one to public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'JivanSecure - Premium Insurance Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JivanSecure | Premium Insurance Advisory',
    description: 'Securing your Life, Health, and Vehicles with expert guidance. Experience precision in protection with JivanSecure.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization JSON-LD Schema
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JivanSecure",
    "url": "https://jivansecure.com",
    "logo": "https://jivansecure.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9588472632",
      "contactType": "customer service"
    },
    "founder": {
      "@type": "Person",
      "name": "Satish Mishra"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* Placeholder GA Measurement ID - should be moved to ENV in production */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
