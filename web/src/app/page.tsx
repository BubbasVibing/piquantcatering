import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Piquant Catering',
  description:
    'Piquant Catering delivers luxury catering for weddings, corporate events, and private celebrations across New Jersey and New York.',
};

export default function HomePage() {
  return <HomeClient />;
}
