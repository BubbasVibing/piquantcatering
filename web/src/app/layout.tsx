import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import JsonLd from '@/components/JsonLd/JsonLd';
import TasterCTA from '@/components/TasterCTA/TasterCTA';
import { localBusinessJsonLd } from '@/lib/structuredData';
import './globals.css';

config.autoAddCss = false;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://piquantcatering.com';

const siteDescription =
  'Piquant Catering designs custom French bistro menus for weddings, corporate events, and private gatherings in New Jersey, Philadelphia, and the surrounding region. Chef-led, full-service, fully insured.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Piquant Catering — Custom Menus for Every Event',
    template: '%s | Piquant Catering',
  },
  description: siteDescription,
  applicationName: 'Piquant Catering',
  authors: [{ name: 'Piquant Catering' }],
  creator: 'Piquant Catering',
  publisher: 'Piquant Catering',
  keywords: [
    'catering',
    'wedding catering',
    'corporate catering',
    'event catering',
    'private chef',
    'French bistro catering',
    'New Jersey catering',
    'Philadelphia catering',
    'South Jersey catering',
    'Pennsauken catering',
    'Englewood catering',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Piquant Catering',
    title: 'Piquant Catering — Custom Menus for Every Event',
    description: siteDescription,
    url: siteUrl,
    locale: 'en_US',
    images: [
      {
        url: '/assets/images/eventcatering.png',
        width: 1138,
        height: 756,
        alt: 'Piquant Catering — bespoke French bistro catering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piquant Catering — Custom Menus for Every Event',
    description: siteDescription,
    images: ['/assets/images/eventcatering.png'],
  },
  icons: {
    icon: '/assets/piquantfavicon.png',
    apple: '/assets/piquantfavicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'food',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <TasterCTA />
        <JsonLd data={localBusinessJsonLd} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
