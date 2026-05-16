import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './globals.css';

config.autoAddCss = false;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://piquantcatering.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Piquant Catering',
    template: '%s | Piquant Catering',
  },
  description:
    'Luxury catering services for weddings, corporate events, and private gatherings in New Jersey and New York.',
  openGraph: {
    type: 'website',
    siteName: 'Piquant Catering',
    title: 'Piquant Catering',
    description:
      'Luxury catering services for weddings, corporate events, and private gatherings in New Jersey and New York.',
    images: ['/assets/herosectionpiquant.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piquant Catering',
    description:
      'Luxury catering services for weddings, corporate events, and private gatherings in New Jersey and New York.',
    images: ['/assets/herosectionpiquant.png'],
  },
  icons: {
    icon: '/assets/piquantfavicon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
