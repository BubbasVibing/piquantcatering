import type { Metadata } from 'next';
import MenusClient from './MenusClient';

export const metadata: Metadata = {
  title: 'Menus',
  description:
    'Browse the Piquant Catering menu — breakfast, lunch, dinner, and dessert offerings, plus essential, premium, and luxury catering packages.',
};

export default function MenusPage() {
  return <MenusClient />;
}
