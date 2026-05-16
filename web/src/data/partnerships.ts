import {
  faBoxOpen,
  faBuilding,
  faCalendarAlt,
  faGraduationCap,
  faHeartbeat,
  faLeaf,
  faRecycle,
  faSeedling,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import type { PartnershipFeature } from '@/types/content';

export const partnershipTypes: PartnershipFeature[] = [
  {
    icon: faBoxOpen,
    title: 'Event Meal Boxes',
    description:
      'Premium meal boxes for corporate events, conferences, and social gatherings. Customized to match your brand and theme.',
  },
  {
    icon: faBuilding,
    title: 'Corporate Programs',
    description:
      'Ongoing food services for offices including daily lunches, cafeteria management, and executive dining solutions.',
  },
  {
    icon: faGraduationCap,
    title: 'Educational Institutions',
    description:
      'Nutritious meal programs for schools, universities, and educational facilities with focus on balanced options.',
  },
  {
    icon: faTruck,
    title: 'Food Service Management',
    description:
      "Comprehensive management of your organization's food service operations with our culinary expertise.",
  },
];

export const mealBoxBenefits: PartnershipFeature[] = [
  {
    icon: faCalendarAlt,
    title: 'Perfect for Events',
    description:
      'Customized meal boxes designed specifically for your corporate events, conferences, and team gatherings.',
  },
  {
    icon: faLeaf,
    title: 'Locally Sourced',
    description:
      'Fresh ingredients from local farms and producers, supporting the community while reducing our carbon footprint.',
  },
  {
    icon: faHeartbeat,
    title: 'Dietary Inclusive',
    description:
      'Comprehensive options for all dietary needs including vegetarian, vegan, gluten-free, and allergen-conscious meals.',
  },
  {
    icon: faBoxOpen,
    title: 'Elegant Presentation',
    description:
      'Beautiful packaging that reflects your brand and creates a memorable dining experience for recipients.',
  },
];

export const sustainablePractices: PartnershipFeature[] = [
  {
    icon: faSeedling,
    title: 'Seasonal Menus',
    description:
      'Our rotating seasonal menus maximize freshness and flavor while reducing environmental impact.',
  },
  {
    icon: faRecycle,
    title: 'Eco-Friendly Packaging',
    description:
      'We use biodegradable, compostable, and recyclable packaging materials for all our meal solutions.',
  },
];
