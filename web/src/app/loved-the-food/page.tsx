import type { Metadata } from 'next';
import { Suspense } from 'react';
import OfferClient from './OfferClient';

export const metadata: Metadata = {
  title: 'Enjoying the food today? Call the Chef.',
  description:
    'Piquant is a French bistro catering company. We design custom menus for weddings, corporate events, and private gatherings. Tap to call the chef.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LovedTheFoodPage() {
  return (
    <Suspense fallback={null}>
      <OfferClient />
    </Suspense>
  );
}
