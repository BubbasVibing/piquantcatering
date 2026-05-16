import type { Metadata } from 'next';
import { Suspense } from 'react';
import OfferClient from './OfferClient';

export const metadata: Metadata = {
  title: 'Loved the Food? — Book Piquant for Your Next Event',
  description:
    'Enjoyed what you tasted tonight? Lock in Piquant Catering for your wedding, corporate event, or private gathering — with a special offer reserved for tonight\u2019s guests.',
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
