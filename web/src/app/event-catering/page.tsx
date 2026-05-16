import type { Metadata } from 'next';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Event Catering',
  description:
    'Full-service event catering from Piquant for weddings, corporate events, birthdays, graduations, and social gatherings.',
  alternates: { canonical: '/event-catering' },
};

export default function EventCateringPage() {
  return <EventsClient />;
}
