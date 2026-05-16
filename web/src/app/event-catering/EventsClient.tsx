'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCheck,
  faHeart,
  faQuoteLeft,
  faUsers,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import FormModal from '@/components/FormModal/FormModal';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { eventTestimonials, eventTypes } from '@/data/eventTypes';
import type { FormField } from '@/types/content';
import '@/styles/eventscatering.css';

type ModalKind = 'quote' | 'inquiry' | 'info' | null;

const SERVICE_CARDS = [
  {
    icon: faUtensils,
    title: 'Full-Service Catering',
    description:
      'Let us take care of everything. From setup to breakdown, our experienced team delivers seamless service, beautifully presented meals, and the kind of attention to detail that lets you fully enjoy your event.',
  },
  {
    icon: faUsers,
    title: 'Buffets & Interactive Stations',
    description:
      'Engage your guests with elegant buffet setups or chef-curated food stations. Perfect for weddings, celebrations, and large gatherings, these formats offer variety, visual appeal, and a touch of fun.',
  },
  {
    icon: faHeart,
    title: 'Custom Menu Creation',
    description:
      'Your event deserves a menu as thoughtful as the occasion. We work with you to craft dishes that reflect your tastes, accommodate dietary needs, and complement the theme or mood of your gathering.',
  },
  {
    icon: faCalendarCheck,
    title: 'Event Coordination Support',
    description:
      'Need more than food? We collaborate with venues and trusted vendors to help coordinate the flow of your event—so everything comes together seamlessly.',
  },
];

const QUOTE_FIELDS: FormField[] = [
  { name: 'name', label: 'Your Name', type: 'text', required: true, fullWidth: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  {
    name: 'event_type',
    label: 'Type of Event',
    type: 'select',
    required: true,
    options: ['Wedding', 'Corporate Event', 'Birthday', 'Graduation', 'Social Gathering', 'Other'],
  },
  { name: 'guest_count', label: 'Estimated Guest Count', type: 'text', required: true },
  { name: 'event_date', label: 'Tentative Event Date', type: 'text' },
  {
    name: 'message',
    label: 'Tell us about your event',
    type: 'textarea',
    placeholder: 'Anything we should know to put together your quote...',
    fullWidth: true,
  },
];

const INFO_FIELDS: FormField[] = [
  { name: 'name', label: 'Your Name', type: 'text', required: true, fullWidth: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  {
    name: 'message',
    label: 'How can we help?',
    type: 'textarea',
    placeholder: 'Tell us what you would like to know...',
    fullWidth: true,
    required: true,
  },
];

function modalConfig(kind: ModalKind, eventTitle: string) {
  switch (kind) {
    case 'quote':
      return {
        title: 'Request a Quote',
        subtitle: 'Tell us about your event to receive a customized quote',
        fields: QUOTE_FIELDS,
        subject: 'Quote Request - Events Catering',
      };
    case 'inquiry':
      return {
        title: `Inquire About ${eventTitle}`,
        subtitle: `Share your vision for your ${eventTitle.toLowerCase()} and our team will be in touch.`,
        fields: QUOTE_FIELDS,
        subject: `Event Inquiry - ${eventTitle}`,
      };
    case 'info':
      return {
        title: 'Request Information',
        subtitle: 'Tell us a little about your event and we will follow up shortly.',
        fields: INFO_FIELDS,
        subject: 'Information Request - Events Catering',
      };
    case null:
    default:
      return null;
  }
}

export default function EventsClient() {
  const [activeTab, setActiveTab] = useState(eventTypes[0].id);
  const [modal, setModal] = useState<ModalKind>(null);
  const { ref: servicesRef, isVisible: servicesVisible } = useInViewAnimation<HTMLElement>();
  const { ref: eventsRef, isVisible: eventsVisible } = useInViewAnimation<HTMLElement>();
  const { ref: testimonialRef, isVisible: testimonialVisible } = useInViewAnimation<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px',
  });

  const selectedEvent = eventTypes.find((event) => event.id === activeTab) ?? eventTypes[0];
  const config = modalConfig(modal, selectedEvent.title);

  return (
    <div className="events-page">
      <section className="events-hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">EVENT CATERING</h1>
          <p className="hero-subtitle">Exceptional catering services for every special occasion</p>
        </div>
      </section>

      <section className="events-intro-section">
        <div className="container">
          <div className="section-header">
            <h2>Elevate Your Event With Exquisite Catering</h2>
            <div className="decorative-line" />
            <p>
              From intimate gatherings to grand celebrations, Piquant delivers unforgettable
              culinary experiences that will delight your guests and make your event truly special.
            </p>
          </div>

          <div className="intro-content">
            <div className="intro-image">
              <Image
                src="/assets/events/eventschickenthingy.png"
                alt="Elegant catering setup"
                width={800}
                height={600}
              />
            </div>
            <div className="intro-text">
              <h3>Bespoke Catering Services</h3>
              <p>
                At Piquant, we understand that every event is unique. Our team works closely with
                you to create customized menus that reflect your personal style, preferences, and
                event theme. From weddings and corporate functions to birthday celebrations and
                graduation parties, we bring creativity, quality, and exceptional service to every
                catering experience.
              </p>
              <p>
                Our commitment to using the freshest ingredients and authentic culinary techniques
                ensures that your guests will enjoy a memorable dining experience that complements
                your special occasion perfectly.
              </p>
              <button type="button" className="intro-button" onClick={() => setModal('quote')}>
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2 id="catering-services-title">Our Catering Services</h2>
            <div className="decorative-line" />
            <p>
              Discover our comprehensive range of catering options designed to meet your event needs
            </p>
          </div>

          <div className={`services-grid ${servicesVisible ? 'animate-section' : ''}`}>
            {SERVICE_CARDS.map(({ icon, title, description }) => (
              <article className="service-card" key={title}>
                <div className="service-icon">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="event-types-section" ref={eventsRef}>
        <div className="container">
          <div className="section-header">
            <h2>Events We Cater</h2>
            <div className="decorative-line" />
            <p>
              From elegant weddings to corporate functions, we provide exceptional catering for all
              types of events
            </p>
          </div>

          <div className="event-tabs" role="tablist">
            {eventTypes.map((event) => (
              <button
                type="button"
                key={event.id}
                role="tab"
                aria-selected={activeTab === event.id}
                className={`event-tab ${activeTab === event.id ? 'active' : ''}`}
                onClick={() => setActiveTab(event.id)}
              >
                <FontAwesomeIcon icon={event.icon} />
                <span>{event.title}</span>
              </button>
            ))}
          </div>

          <div className={`event-content ${eventsVisible ? 'animate-section' : ''}`}>
            <div className="event-image">
              <Image
                src={selectedEvent.image}
                alt={`${selectedEvent.title} catering`}
                width={700}
                height={500}
              />
            </div>
            <div className="event-details">
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <div className="event-features">
                {selectedEvent.features.map((feature) => (
                  <div className="feature-item" key={feature}>
                    <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="event-button-container">
                <button type="button" className="event-button" onClick={() => setModal('inquiry')}>
                  Inquire About {selectedEvent.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section" ref={testimonialRef}>
        <div className="container">
          <div className="section-header testimonials-header">
            <h2>Rave Reviews</h2>
            <div className="decorative-line" />
          </div>
          <h3 className={`review-highlight ${testimonialVisible ? 'animate-section' : ''}`}>
            Guests consistently praise our flavor-forward cuisine and impeccable presentation
          </h3>
          <div className={`testimonials-grid ${testimonialVisible ? 'animate-section' : ''}`}>
            {eventTestimonials.map((testimonial) => (
              <article className="review-card" key={testimonial.name}>
                <div className="review-header">
                  <div className="reviewer-image">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      unoptimized
                    />
                  </div>
                  <div className="reviewer-info">
                    <h4>{testimonial.name}</h4>
                    <p className="review-event">{testimonial.event}</p>
                  </div>
                </div>
                <div className="review-content">
                  <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                  <p>{testimonial.quote}</p>
                </div>
                <div className="review-footer">
                  <div className="review-date">{testimonial.date}</div>
                  <div className="review-source">
                    {testimonial.source === 'Google' ? (
                      <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                    ) : testimonial.source === 'Trustpilot' ? (
                      <div className="trustpilot-text">Trustpilot</div>
                    ) : (
                      <div className="yelp-text">Yelp</div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={`see-all-reviews ${testimonialVisible ? 'animate-section' : ''}`}>
            <Link href="/reviews" className="reviews-link">
              Read More Client Stories
            </Link>
          </div>
        </div>
      </section>

      <section className="events-contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-text">
              <h2 className="text-center">Let&apos;s Plan Your Event</h2>
              <div className="decorative-line" style={{ margin: '0 auto 25px' }} />
              <p className="text-center">
                Ready to discuss your catering needs? Our event specialists are here to help you
                create a memorable experience for your guests.
              </p>
              <div className="contact-info-container">
                <div className="contact-item">
                  <strong>Phone:</strong> (917) 822-6951
                </div>
                <div className="contact-item">
                  <strong>Email:</strong> events@piquantcatering.com
                </div>
                <div className="contact-item">
                  <strong>Hours:</strong> Monday–Friday, 9am–5pm
                </div>
              </div>
              <div className="contact-button-container">
                <button type="button" className="contact-button" onClick={() => setModal('info')}>
                  Request Information
                </button>
              </div>
            </div>
            <div className="contact-image">
              <Image
                src="/assets/events/eventsbeef.png"
                alt="Event planning consultation"
                width={700}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {config && (
        <FormModal
          open={modal !== null}
          onClose={() => setModal(null)}
          title={config.title}
          subtitle={config.subtitle}
          fields={config.fields}
          subject={config.subject}
          submitLabel="Send Request"
          successMessage="Thanks for reaching out! Our team will be in touch within 48 hours."
          extraFields={modal === 'inquiry' ? { event_focus: selectedEvent.title } : undefined}
        />
      )}
    </div>
  );
}
