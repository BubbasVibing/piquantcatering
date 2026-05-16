import type { Metadata } from 'next';
import PartnershipsClient from './PartnershipsClient';

export const metadata: Metadata = {
  title: 'Food Partnerships',
  description:
    'Partner with Piquant Catering for corporate dining, event meal boxes, and long-term food service programs tailored to your organization.',
};

export default function FoodPartnershipsPage() {
  return <PartnershipsClient />;
}
