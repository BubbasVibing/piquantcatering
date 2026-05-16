'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faClipboardCheck,
  faComments,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import FormModal from '@/components/FormModal/FormModal';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import type { FormField } from '@/types/content';
import '@/styles/about.css';

const CONSULTATION_FIELDS: FormField[] = [
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
    placeholder: 'Tell us about your vision...',
    fullWidth: true,
  },
];

const PROCESS_STEPS = [
  {
    icon: faComments,
    title: 'Discovery',
    description: 'We start by understanding your vision, preferences, and unique event needs.',
  },
  {
    icon: faPencilAlt,
    title: 'Creation',
    description:
      'Our chefs craft a custom menu inspired by your tastes, theme, and dietary considerations.',
  },
  {
    icon: faClipboardCheck,
    title: 'Refinement',
    description: 'Through a private tasting, we collaborate to perfect every detail.',
  },
  {
    icon: faCalendarCheck,
    title: 'Celebration',
    description:
      'On event day, our team delivers beautifully presented dishes and attentive service, so you can fully enjoy the moment.',
  },
];

export default function AboutClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const { ref: passionRef, isVisible: passionVisible } = useInViewAnimation<HTMLElement>();

  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>ABOUT US</h1>
          <p>The culinary expertise behind your unforgettable moments</p>
        </div>
      </section>

      <section className="story-section" ref={passionRef}>
        <div className="container">
          <div className={`story-content ${passionVisible ? 'animate-section' : ''}`}>
            <div className="story-text">
              <h2>Our Passion</h2>
              <p>
                At Piquant, our passion for <span className="highlight">culinary excellence</span>{' '}
                drives everything we do. Each dish is crafted with extraordinary attention to detail
                and executed with precision by our team of dedicated chefs.
              </p>
              <p>
                We believe that food is more than sustenance—it&apos;s an art form that brings
                people together. Our team delivers high-quality meals that{' '}
                <span className="highlight">elevate every occasion</span> and create unforgettable
                experiences for our clients and their guests.
              </p>
            </div>
            <div className="story-image parallax-effect">
              <Image
                src="/assets/platingfoodcarefully.jpg"
                alt="Chef carefully plating a gourmet dish"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="culinary-process-section">
        <div className="culinary-process-container">
          <h2 className="culinary-process-title no-after-element">Our Collaborative Process</h2>

          <div className="culinary-process-steps">
            <div className="culinary-process-line" />
            {PROCESS_STEPS.map(({ icon, title, description }) => (
              <div key={title} className="culinary-process-step">
                <div className="culinary-process-icon">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>

          <div className="process-contact-section">
            <button
              type="button"
              className="process-contact-btn"
              onClick={() => setModalOpen(true)}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Begin Your Culinary Journey"
        subtitle="Tell us about your event vision"
        fields={CONSULTATION_FIELDS}
        subject="New Consultation Request (About Page)"
        submitLabel="Submit Inquiry"
        successTitle="Thank you!"
        successMessage="We have received your inquiry and will contact you within 48 hours."
      />
    </div>
  );
}
