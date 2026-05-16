import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn how Piquant Catering crafts unforgettable culinary moments — our passion, our collaborative process, and the team behind the food.',
};

export default function AboutPage() {
  return <AboutClient />;
}
