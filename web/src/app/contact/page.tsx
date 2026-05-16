import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Piquant Catering. Reach our team in Pennsauken and Englewood, NJ, or send us a message about your upcoming event.',
};

export default function ContactPage() {
  return <ContactClient />;
}
