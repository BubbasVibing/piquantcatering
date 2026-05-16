import {
  faBirthdayCake,
  faBuilding,
  faRing,
  faUserGraduate,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import type { EventType, Testimonial } from '@/types/content';

export const eventTypes: EventType[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    description:
      'Your wedding day should be unforgettable—down to the last bite. Our team works closely with you to design a menu that reflects your love story, complemented by elegant presentation and attentive service.',
    icon: faRing,
    image: '/assets/weddingcateringpicture.jpg',
    features: [
      'Custom menus tailored to your tastes and theme',
      'Pre-wedding tastings to finalize every detail',
      'Full-service staff, including servers and bartenders',
      'Stunning displays that enhance your décor',
      'Careful attention to dietary needs and cultural traditions',
      'Coordination with your venue and vendors for a seamless day',
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description:
      "Host with confidence, knowing our catering delivers exceptional food and seamless service for every type of corporate occasion. Whether it's a breakfast meeting, team lunch, or formal gala, Piquant ensures a polished, professional experience from start to finish.",
    icon: faBuilding,
    image: '/assets/corporatecatering.jpg',
    features: [
      'Timely, professional setup to fit corporate schedules',
      'Branded presentation options available upon request',
      'Breakfast, lunch, dinner, and reception service',
      'Drop-off catering for casual meetings or office gatherings',
      'Full-service catering for conferences, launches, and celebrations',
      'Versatile menus to satisfy a wide range of preferences and dietary needs',
    ],
  },
  {
    id: 'birthdays',
    title: 'Birthday Celebrations',
    description:
      "Make your birthday unforgettable with food that's as joyful and memorable as the occasion itself. Whether you're hosting a backyard gathering or a milestone soirée, we'll design a menu that matches your vision, theme, and guests.",
    icon: faBirthdayCake,
    image: '/assets/birthdaycatering.jpg',
    features: [
      'Fun, creative menu options for all ages',
      'Custom birthday cakes and curated dessert displays',
      'Themed food presentations that elevate your celebration',
      "Kid-friendly choices that don't compromise on flavor",
      'Casual buffets or refined plated service',
      'Celebration packages available for added ease and impact',
    ],
  },
  {
    id: 'graduations',
    title: 'Graduation Celebrations',
    description:
      "Celebrate academic milestones with food that brings people together and creates lasting memories. Whether you're planning a casual get-together or a large celebration, our graduation catering makes it easy, festive, and delicious.",
    icon: faUserGraduate,
    image: '/assets/graduationcatering.jpg',
    features: [
      'Flexible service styles for backyards, halls, or schools',
      'Options available for a range of budgets',
      'Customized presentations featuring school colors and themes',
      'Menus designed to please guests of all ages',
      'Hassle-free self-serve buffets or full-service experiences',
      'Ideal for both intimate family events and large gatherings',
    ],
  },
  {
    id: 'social',
    title: 'Social Gatherings',
    description:
      'From intimate dinners to festive holiday parties, we help make your moments memorable with thoughtfully prepared meals and warm, attentive service. Let us take care of the details—so you can enjoy time with the people who matter most.',
    icon: faUsers,
    image: '/assets/socialgatheringcatering.jpg',
    features: [
      'Varied menu options to suit diverse tastes and dietary needs',
      'Family-style, buffet, or plated service formats',
      'Seasonal specialties and themed holiday menus',
      'Service styles ranging from relaxed to refined',
      'Flexible setups to fit backyards, homes, or event venues',
      "Personalized touches to reflect your gathering's tone and theme",
    ],
  },
];

export const eventTestimonials: Testimonial[] = [
  {
    name: 'Emily & Michael Johnson',
    event: 'Wedding Reception',
    quote:
      "Piquant exceeded our expectations in every way. The food was absolutely divine - from the passed hors d'oeuvres to the plated main course. The flavors were extraordinary and the presentation stunning. Our guests are still raving about the meal months later!",
    date: 'June 2023',
    source: 'Google',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'James Wilson',
    event: 'Annual Company Gala',
    quote:
      "The team at Piquant made our corporate event seamless. The food stations at our gala were a highlight of the evening. The chef's custom menu featured innovative pairings and artful presentation that impressed even our most discerning executives.",
    date: 'November 2023',
    source: 'Trustpilot',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Sarah Thompson',
    event: 'Graduation Celebration',
    quote:
      "My daughter's graduation party was perfect thanks to Piquant's amazing food and service. The tasting menu they created was exceptional - beautifully presented and bursting with flavor. The chef's attention to dietary preferences was impressive!",
    date: 'September 2023',
    source: 'Yelp',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];
