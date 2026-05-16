import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface MenuCategory {
  id: string;
  name: string;
  icon?: IconDefinition;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  popular?: boolean;
}

export interface CateringPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  recommended?: boolean;
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  icon: IconDefinition;
  image: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  event: string;
  quote: string;
  date: string;
  source: string;
  image: string;
}

export type ReviewSource = 'google' | 'yelp' | 'trustpilot';

export interface Review {
  id: number;
  author: string;
  avatar: string;
  event: string;
  content: string;
  date: string;
  source: ReviewSource;
  rating: number;
}

export interface PartnershipFeature {
  icon: IconDefinition;
  title: string;
  description: string;
}

export type FormFieldType = 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select';

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  rows?: number;
  fullWidth?: boolean;
}
