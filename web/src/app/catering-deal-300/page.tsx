import type { Metadata } from 'next';
import { Suspense } from 'react';
import OfferClient from './OfferClient';

export const metadata: Metadata = {
  title: 'Catering for 300 Guests — Special Offer',
  description:
    'Reserve Piquant Catering for your 300-guest event. Lock in our chef-curated menu, full-service staff, and elegant presentation. Limited dates available.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CateringDeal300Page() {
  return (
    <Suspense fallback={null}>
      <OfferClient />
    </Suspense>
  );
}
