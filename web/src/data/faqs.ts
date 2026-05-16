export interface FaqItem {
  question: string;
  answer: string;
}

export const faqCategories: Record<string, string> = {
  general: 'General Questions',
  dining: 'Dining Experience',
  reservations: 'Reservations',
  policies: 'Policies & Hours',
};

export const faqs: Record<string, FaqItem[]> = {
  general: [
    {
      question: 'What type of cuisine does Piquant offer?',
      answer:
        'Piquant offers contemporary gourmet cuisine with a focus on seasonal ingredients and innovative flavor combinations. Our menu features a fusion of Mediterranean, Asian, and American influences, all prepared with classic French techniques.',
    },
    {
      question: 'Do you accommodate dietary restrictions?',
      answer:
        'Yes, we pride ourselves on accommodating all dietary needs including vegetarian, vegan, gluten-free, dairy-free, and specific allergies. Please inform your server about any dietary restrictions, and our chefs will be happy to customize dishes accordingly.',
    },
    {
      question: 'Is Piquant suitable for special occasions?',
      answer:
        'Absolutely! Piquant is the perfect setting for anniversaries, birthdays, business dinners, and other special celebrations. We offer personalized menus and can arrange special decorations with advance notice. Please contact us for details on private dining options.',
    },
  ],
  dining: [
    {
      question: 'What is the dress code at Piquant?',
      answer:
        'We maintain a smart casual dress code. While formal attire is not required, we do ask that guests refrain from wearing athletic wear, beachwear, or overly casual attire such as flip-flops or tank tops. Collared shirts for gentlemen are appreciated for dinner service.',
    },
    {
      question: 'Do you have a wine pairing menu?',
      answer:
        'Yes, our sommelier has carefully curated wine pairings for each course on our tasting menu. We also offer an extensive wine list featuring both old-world classics and exciting new-world discoveries, with options available by the glass or bottle.',
    },
    {
      question: 'Is there a corkage fee if I bring my own wine?',
      answer:
        'We do allow guests to bring their own wine with a corkage fee of $35 per bottle. Please note that we cannot accept wines that are already on our wine list, and there is a limit of two bottles per table.',
    },
  ],
  reservations: [
    {
      question: 'How far in advance should I make a reservation?',
      answer:
        'For weekday dining, we recommend making reservations 1-2 weeks in advance. For weekend dining or special occasions, particularly during peak seasons, reservations 3-4 weeks in advance are advised. For larger groups, please contact us as soon as possible.',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        "We require 24-hour notice for cancellations or changes to your reservation. Cancellations made with less than 24 hours' notice may be subject to a cancellation fee of $25 per person. No-shows will be charged the full price of our tasting menu per guest.",
    },
    {
      question: 'Do you accommodate large groups?',
      answer:
        'Yes, we can accommodate groups of up to 12 people in our main dining room. For parties larger than 12, we offer private dining options. Please contact our events team directly for large group reservations and special arrangements.',
    },
  ],
  policies: [
    {
      question: 'What are your hours of operation?',
      answer:
        'We are open Tuesday through Sunday. Lunch is served from 12:00 PM to 2:30 PM, and dinner from 5:30 PM to 10:00 PM. Our bar remains open until 11:30 PM on Friday and Saturday. We are closed on Mondays.',
    },
    {
      question: 'Is there a time limit for dining?',
      answer:
        'For à la carte dining, tables are allotted 2 hours. For our tasting menu experience, we allow 3 hours to ensure a relaxed, enjoyable experience. If you require more time, please let us know when making your reservation.',
    },
    {
      question: 'Do you have parking available?',
      answer:
        'We offer complimentary valet parking for all dinner guests. For lunch service, street parking is available, or you may use public parking facilities within walking distance. We also offer validation for the garage on 5th Street.',
    },
  ],
};
