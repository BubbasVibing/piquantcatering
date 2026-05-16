const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://piquantcatering.com';

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  '@id': `${SITE_URL}#business`,
  name: 'Piquant Catering',
  url: SITE_URL,
  telephone: '+1-917-822-6951',
  email: 'info@piquantcatering.com',
  image: `${SITE_URL}/assets/herosectionpiquant.png`,
  servesCuisine: ['Mediterranean', 'American', 'Fusion'],
  priceRange: '$$-$$$',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Pennsauken, NJ',
      addressLocality: 'Pennsauken',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Englewood, NJ',
      addressLocality: 'Englewood',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
  ],
  openingHours: ['Tu-Su 12:00-22:30'],
  sameAs: [],
};

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildReviewJsonLd(
  reviews: {
    author: string;
    content: string;
    rating: number;
    date: string;
  }[],
) {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'FoodEstablishment',
      '@id': `${SITE_URL}#business`,
      name: 'Piquant Catering',
    },
    ratingValue: averageRating.toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      datePublished: review.date,
      reviewBody: review.content,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
    })),
  };
}
