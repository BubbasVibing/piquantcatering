'use client';

import { FormEvent } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faGraduationCap,
  faPaperPlane,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { mealBoxBenefits, partnershipTypes, sustainablePractices } from '@/data/partnerships';
import { useFormspree } from '@/hooks/useFormspree';
import '@/styles/partnerships.css';

const OVERVIEW_IMAGES = [
  { src: '/assets/corporatecatering.jpg', alt: 'Corporate dining setup' },
  { src: '/assets/socialgatheringcatering.jpg', alt: 'Event catering display' },
  { src: '/assets/partnerships/partnerships.png', alt: 'Partnership catering spread' },
];

const MEAL_GALLERY = [
  { src: '/assets/burgerfries.png', alt: 'Corporate boxed lunch', caption: 'Corporate Meetings' },
  { src: '/assets/hummusmeal.jpg', alt: 'Event catering spread', caption: 'Special Events' },
  {
    src: '/assets/morepackedmeals.jpg',
    alt: 'Team building meal session',
    caption: 'Team Building',
  },
];

const INSTITUTIONS = [
  {
    icon: faBuilding,
    title: 'Corporate Offices',
    description: 'Daily meal services, executive dining, and cafeteria management',
  },
  {
    icon: faGraduationCap,
    title: 'Educational Institutions',
    description: 'Nutritious meal programs for schools and universities',
  },
  {
    icon: faUserFriends,
    title: 'Organizations',
    description: 'Customized food programs for non-profits and community groups',
  },
];

export default function PartnershipsClient() {
  const { status, error, submit, reset } = useFormspree();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('_gotcha')) return;
    const payload: Record<string, string> = { _subject: 'Partnership Inquiry' };
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') payload[key] = value;
    }
    const ok = await submit(payload);
    if (ok) event.currentTarget.reset();
  };

  return (
    <div className="partnerships-page">
      <section className="partnerships-hero visible">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>FOOD PARTNERSHIPS</h1>
          <div className="decorative-line" />
          <p>Exceptional culinary solutions for businesses, institutions and events</p>
        </div>
      </section>

      <section className="overview-section visible">
        <div className="container">
          <div className="section-header">
            <h2>Partnership Solutions</h2>
            <div className="decorative-line" />
            <p>
              At Piquant, we believe that exceptional food should be accessible beyond just
              restaurant walls. Our partnerships program brings our culinary expertise to
              organizations through customized food solutions that reflect your values and meet your
              specific needs.
            </p>
          </div>

          <div className="partnership-types">
            {partnershipTypes.map((type) => (
              <div className="partnership-type-item" key={type.title}>
                <div className="type-icon">
                  <FontAwesomeIcon icon={type.icon} />
                </div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>

          <div className="overview-image-row">
            {OVERVIEW_IMAGES.map(({ src, alt }) => (
              <div className="overview-image" key={src}>
                <Image src={src} alt={alt} width={600} height={400} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="meal-box-section visible">
        <div className="container">
          <div className="section-header">
            <h2>Event Meal Boxes</h2>
            <div className="decorative-line" />
            <p>Chef-crafted meal experiences delivered to your event</p>
          </div>

          <div className="meal-box-content">
            <div className="meal-box-image">
              <Image
                src="/assets/packedmealsforthe.png"
                alt="Premium meal box with elegantly arranged food"
                width={800}
                height={600}
              />
            </div>

            <div className="meal-box-text">
              <h3>Elevate Your Event Experience</h3>
              <p>
                Our premium meal boxes transform ordinary events into extraordinary culinary
                experiences. Each box is meticulously crafted by our chefs to ensure exceptional
                quality, presentation, and flavor, whether for corporate meetings, conferences,
                team-building events, or social gatherings.
              </p>
              <p>
                Every meal box can be customized to reflect your brand and event theme, creating a
                cohesive experience that impresses attendees and supports your event objectives.
                From elegant boardroom lunches to large-scale conference catering, our meal boxes
                provide a refined dining solution with consistent quality and thoughtful
                presentation.
              </p>
            </div>
          </div>

          <div className="benefits-grid">
            {mealBoxBenefits.map((benefit) => (
              <div className="benefit-card" key={benefit.title}>
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="meal-gallery">
            {MEAL_GALLERY.map(({ src, alt, caption }) => (
              <div className="gallery-item" key={src}>
                <Image src={src} alt={alt} width={400} height={300} />
                <div className="gallery-caption">{caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="food-solutions-section visible">
        <div className="container">
          <div className="section-header">
            <h2>Long-Term Food Solutions</h2>
            <div className="decorative-line" />
            <p>Tailored culinary programs for organizations and institutions</p>
          </div>

          <div className="solutions-intro">
            <div className="solutions-text-box">
              <h3>Comprehensive Food Partnerships</h3>
              <p>
                Piquant partners with forward-thinking organizations to provide ongoing culinary
                solutions that enhance workplace culture, support educational missions, and create
                memorable experiences. Our approach goes beyond simply providing food—we develop
                sustainable programs that align with your organizational values.
              </p>
            </div>

            <div className="solutions-image-box">
              <Image
                src="/assets/chefmakingfood.jpg"
                alt="Chef preparing corporate meals"
                width={800}
                height={600}
              />
            </div>
          </div>

          <div className="solutions-features">
            <div className="solutions-institutions">
              <h3>Who We Serve</h3>
              <div className="institutions-grid">
                {INSTITUTIONS.map(({ icon, title, description }) => (
                  <div className="institution-item" key={title}>
                    <div className="institution-icon">
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sustainable-practices">
              <h3>Our Commitment to Sustainability</h3>
              <div className="practices-content">
                {sustainablePractices.map((practice) => (
                  <div className="practice-item" key={practice.title}>
                    <div className="practice-icon">
                      <FontAwesomeIcon icon={practice.icon} />
                    </div>
                    <div className="practice-text">
                      <h5>{practice.title}</h5>
                      <p>{practice.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section visible">
        <div className="container">
          <div className="section-header">
            <h2>Our Partnership Process</h2>
            <div className="decorative-line" />
            <p>How we develop and implement your custom food program</p>
          </div>

          <div className="partnership-form-container">
            {status === 'success' ? (
              <div className="form-success">
                <h3>Thank You!</h3>
                <p>Your inquiry has been submitted. Our team will contact you within 48 hours.</p>
                <button
                  type="button"
                  className="form-submit-btn"
                  onClick={() => reset()}
                  style={{ width: 'auto', margin: '20px auto 0', display: 'block' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form className="partnership-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="partnership-name" className="visually-hidden">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="partnership-name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="partnership-email" className="visually-hidden">
                      Your email address
                    </label>
                    <input
                      type="email"
                      id="partnership-email"
                      name="email"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="partnership-org" className="visually-hidden">
                    Your organization name
                  </label>
                  <input
                    type="text"
                    id="partnership-org"
                    name="organization"
                    placeholder="Your organization name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="partnership-message" className="visually-hidden">
                    Tell us about your partnership needs
                  </label>
                  <textarea
                    id="partnership-message"
                    name="message"
                    placeholder="Tell us about your partnership needs"
                    rows={4}
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
                  className="form-submit-btn"
                  disabled={status === 'submitting'}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
                  {status === 'submitting' ? 'Submitting…' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
