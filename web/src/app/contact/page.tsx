import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import { faqs } from '@/data/faqs';
import { buildFaqJsonLd } from '@/lib/structuredData';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Piquant Catering. Reach our team in Pennsauken and Englewood, NJ, or send us a message about your upcoming event.',
  alternates: { canonical: '/contact' },
};

const allFaqs = Object.values(faqs).flat();

export default function ContactPage() {
  return (
    <>
      <ContactClient />
      <JsonLd data={buildFaqJsonLd(allFaqs)} />
    </>
  );
}
