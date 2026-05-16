'use client';

import { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { useFormspree } from '@/hooks/useFormspree';
import { faqCategories, faqs } from '@/data/faqs';
import '@/styles/contact.css';

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.7646124031003!2d-75.0053959!3d39.9653701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ca35cb6b1aff%3A0x4f2ef8cf1b92c02d!2s1444%20NJ-73%2C%20Pennsauken%2C%20NJ%2008110!5e0!3m2!1sen!2sus!4v1688152594171!5m2!1sen!2sus';

export default function ContactClient() {
  const { status, error, submit, reset } = useFormspree();
  const [activeCategory, setActiveCategory] = useState<keyof typeof faqs>('general');
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('_gotcha')) return;
    const payload: Record<string, string> = {
      _subject: 'New Message from Contact Page',
    };
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') payload[key] = value;
    }
    const ok = await submit(payload);
    if (ok) {
      event.currentTarget.reset();
      window.setTimeout(() => reset(), 5000);
    }
  };

  const currentFaqs = faqs[activeCategory];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <h1>CONTACT US</h1>
          <p>We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-intro">
            <h2>Get in Touch</h2>
            <div className="decorative-line" />
            <p>
              Whether you have a question about our menu, hours, or special events, we&apos;re here
              to help you with anything you need.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-form-wrapper visible">
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and we&apos;ll get back to you as soon as possible</p>
              </div>

              {status === 'success' ? (
                <div className="form-success">
                  <div className="success-icon">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h4>Thank You!</h4>
                  <p>
                    Your message has been sent successfully. We&apos;ll be in touch within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="form-group">
                    <label htmlFor="contact-name">
                      Your Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-email">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        placeholder="example@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">
                      Subject <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      required
                      placeholder="What is your message about?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">
                      Your Message <span className="required">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      placeholder="How can we help you?"
                      rows={6}
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
                    className="submit-button"
                    disabled={status === 'submitting'}
                  >
                    <FontAwesomeIcon icon={faUtensils} className="button-icon" />
                    {status === 'submitting' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info visible">
              <div className="info-card">
                <h3>Contact Information</h3>
                <p className="info-intro">
                  We look forward to hearing from you and answering any questions you may have.
                </p>

                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className="info-content">
                      <h4>Our Locations</h4>
                      <p>
                        Pennsauken, NJ
                        <br />
                        Englewood, NJ
                      </p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="info-content">
                      <h4>Phone Number</h4>
                      <p>
                        <a href="tel:+19178226951">(917) 822-6951</a>
                      </p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="info-content">
                      <h4>Email Address</h4>
                      <p>
                        <a href="mailto:info@piquantcatering.com">info@piquantcatering.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="map-container">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Piquant Catering Location - Pennsauken, NJ"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <div className="decorative-line" />
            <p>Find answers to common questions about dining at Piquant</p>
          </div>

          <div className="faq-content visible">
            <div className="faq-categories">
              {Object.entries(faqCategories).map(([key, label]) => (
                <button
                  type="button"
                  key={key}
                  className={`category-button ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(key as keyof typeof faqs);
                    setOpenFaqs(new Set());
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="faq-list">
              {currentFaqs.map((faq, index) => {
                const isOpen = openFaqs.has(index);
                return (
                  <div className="faq-item" key={faq.question}>
                    <button
                      type="button"
                      className={`faq-question ${isOpen ? 'open' : ''}`}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <h4>{faq.question}</h4>
                      <span className="faq-icon">
                        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                      </span>
                    </button>
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
