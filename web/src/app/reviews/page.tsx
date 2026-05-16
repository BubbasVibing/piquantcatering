import type { Metadata } from 'next';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'Read reviews from clients who chose Piquant Catering for their weddings, corporate events, and private gatherings.',
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
