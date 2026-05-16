'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faUtensils } from '@fortawesome/free-solid-svg-icons';
import FormModal from '@/components/FormModal/FormModal';
import { useFormspree } from '@/hooks/useFormspree';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { eventTestimonials } from '@/data/eventTypes';
import type { FormField } from '@/types/content';
import '@/styles/home.css';

const HERO_SUBTITLE = "Extraordinary culinary artistry for life's most meaningful celebrations";

const POPUP_FIELDS: FormField[] = [
  { name: 'name', label: 'Your Name', type: 'text', required: true, fullWidth: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  {
    name: 'event_type',
    label: 'Type of Event',
    type: 'select',
    required: true,
    options: ['Wedding', 'Corporate Event', 'Private Dinner', 'Special Celebration', 'Other'],
  },
  { name: 'guest_count', label: 'Estimated Guest Count', type: 'text', required: true },
  {
    name: 'message',
    label: 'Your Vision',
    type: 'textarea',
    placeholder: 'Tell us about your event...',
    fullWidth: true,
  },
];

function HeroSubtitle() {
  return (
    <span className="luxury-reveal">
      {HERO_SUBTITLE.split(' ').map((word, index, words) => (
        <span key={`${word}-${index}`} className="word" data-delay={index}>
          {word}
          {index < words.length - 1 && <span className="space">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export default function HomeClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const { ref: aboutImageRef, isVisible: imageRotated } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.3,
  });
  const { ref: servicesRef, isVisible: servicesVisible } = useInViewAnimation<HTMLElement>();
  const { ref: testimonialRef, isVisible: testimonialVisible } = useInViewAnimation<HTMLElement>();
  const { ref: contactRef, isVisible: contactVisible } = useInViewAnimation<HTMLElement>();

  const { status, error, submit, reset } = useFormspree();

  const handleInlineSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('_gotcha')) return;
    const payload: Record<string, string> = {
      _subject: 'New Consultation Request (Home Page Form)',
    };
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') payload[key] = value;
    }
    const ok = await submit(payload);
    if (ok) event.currentTarget.reset();
  };

  return (
    <div className="home">
      <div className="hero-section-wrapper">
        <section className="hero-section">
          <div
            className="hero-overlay-v2"
            style={{
              background: 'linear-gradient(to right, rgba(69, 38, 58, 0.1), rgba(69, 38, 58, 0.1))',
            }}
          />
          <div className="hero-content">
            <h1>PIQUANT</h1>
            <p>
              <HeroSubtitle />
            </p>
            <button type="button" className="cta-button" onClick={() => setModalOpen(true)}>
              Book a Consultation
            </button>
          </div>
        </section>
      </div>

      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header">
            <h2>Culinary Artistry</h2>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                We work closely with local farmers and artisanal producers to source the finest
                seasonal ingredients, ensuring that every dish we serve reflects our
                <span className="culinary-highlight">
                  {' '}
                  commitment to flavor, quality and sustainability
                </span>
                .
              </p>
              <p>
                From meticulously crafted canapés to show-stopping entrées, our culinary creations
                are tailored to your unique vision, transforming your event into an unforgettable
                gastronomic journey that your guests will remember long after the last bite.
              </p>
              <p>
                At Piquant, we believe that{' '}
                <span className="culinary-highlight">exceptional food is the cornerstone</span> of
                any memorable event. Our team of passionate chefs combines classic techniques with
                innovative approaches to create dining experiences that captivate all the senses.
              </p>
            </div>
            <div className="about-image" ref={aboutImageRef}>
              <Image
                src="/assets/foodimagepiquant.png"
                alt="Chef carefully plating gourmet food"
                width={700}
                height={500}
                className={`food-plate-image ${imageRotated ? 'rotated' : ''}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="buffet-section" id="buffet" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={servicesVisible ? 'animate-section' : ''}>WHAT WE OFFER</h2>
            <p className="buffet-subtitle">Unique culinary experiences for every occasion</p>
          </div>

          <div className={`buffet-showcase ${servicesVisible ? 'animate-section' : ''}`}>
            <div className="buffet-gallery">
              <div className="buffet-image large">
                <Image
                  src="/assets/pakuraandbread.jpg"
                  alt="Elegantly set table for a fine dining experience"
                  width={800}
                  height={600}
                />
              </div>
              <div className="buffet-grid">
                <div className="buffet-image">
                  <Image
                    src="/assets/burgerfries.png"
                    alt="Gourmet burger and fries"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="buffet-image">
                  <Image
                    src="/assets/events/eventsbeef.png"
                    alt="Premium beef appetizers"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="buffet-image">
                  <Image
                    src="/assets/hummusmeal.jpg"
                    alt="Fresh hummus meal with premium ingredients"
                    width={400}
                    height={300}
                  />
                </div>
              </div>
            </div>

            <div className="buffet-content">
              <h3 style={{ textAlign: 'center' }}>Crafting Culinary Memories</h3>
              <p style={{ textAlign: 'center' }}>
                Experience our distinctive menu offerings, featuring innovative flavor combinations
                and time-honored techniques. Our culinary team creates memorable dishes that
                showcase the finest seasonal ingredients, beautifully presented to delight both the
                eye and palate.
              </p>
              <p style={{ textAlign: 'center' }}>
                From intimate gatherings to grand celebrations, we customize our menus to match your
                vision and exceed expectations. Every dish is crafted with meticulous attention to
                detail, ensuring a unique and unforgettable dining experience for you and your
                guests.
              </p>
              <Link href="/menus" className="buffet-cta">
                EXPLORE MENU
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials" ref={testimonialRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={testimonialVisible ? 'animate-section' : ''}>Rave Reviews</h2>
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
        </div>
      </section>

      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={contactVisible ? 'animate-section' : ''}>Elevate Your Event</h2>
          </div>
          {status === 'success' && (
            <p className={`contact-subtitle ${contactVisible ? 'animate-section' : ''}`}>
              Thank you for your interest in Piquant!
            </p>
          )}
          <div className={`contact-content ${contactVisible ? 'animate-section' : ''}`}>
            {status === 'success' ? (
              <div
                className="contact-form-container"
                style={{ textAlign: 'center', padding: '40px' }}
              >
                <FontAwesomeIcon
                  icon={faUtensils}
                  style={{ fontSize: '4rem', color: 'var(--secondary)', marginBottom: '25px' }}
                />
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>
                  Thank You for Your Inquiry
                </h3>
                <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                  We have received your inquiry and our culinary team will contact you within 48
                  hours to discuss your event details and how we can create an exceptional
                  experience for you and your guests.
                </p>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="contact-submit"
                  style={{ width: 'auto', margin: '0 auto', padding: '12px 25px' }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleInlineSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="home-name" className="visually-hidden">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="home-name"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="home-email" className="visually-hidden">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="home-email"
                        name="email"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="home-phone" className="visually-hidden">
                        Phone number
                      </label>
                      <input type="tel" id="home-phone" name="phone" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="home-event-type" className="visually-hidden">
                      Nature of event
                    </label>
                    <select id="home-event-type" name="event_type" required defaultValue="">
                      <option value="" disabled>
                        Nature of Event
                      </option>
                      <option value="wedding">Wedding Celebration</option>
                      <option value="corporate">Corporate Gathering</option>
                      <option value="private">Private Soirée</option>
                      <option value="gala">Gala or Charity Function</option>
                      <option value="bespoke">Bespoke Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="home-guest-count" className="visually-hidden">
                      Number of guests
                    </label>
                    <select id="home-guest-count" name="guest_count" required defaultValue="">
                      <option value="" disabled>
                        Number of Guests
                      </option>
                      <option value="12-20">12-20 guests</option>
                      <option value="21-50">21-50 guests</option>
                      <option value="51-100">51-100 guests</option>
                      <option value="101-200">101-200 guests</option>
                      <option value="201-500">201-500 guests</option>
                      <option value="500+">500+ guests</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="home-message" className="visually-hidden">
                      Your vision
                    </label>
                    <textarea
                      id="home-message"
                      name="message"
                      placeholder="Share your vision and culinary preferences..."
                      rows={5}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px' }}
                  />
                  {error && (
                    <div style={{ color: '#8b2a3f', marginBottom: 12, fontSize: '0.9rem' }}>
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Submitting…' : 'Request Consultation'}
                  </button>
                  <p className="form-note">
                    Our culinary team will respond within 24 hours to arrange a personalized
                    consultation
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Reserve Your Culinary Experience"
        subtitle="Tell us about your event vision"
        fields={POPUP_FIELDS}
        subject="New Consultation Request (Hero Popup)"
        submitLabel="Submit Inquiry"
        successMessage="Thank you for your interest in Piquant catering services. Our team will be in touch within 48 hours."
      />
    </div>
  );
}
