'use client';

import { FormEvent, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCheck,
  faChampagneGlasses,
  faClock,
  faShieldHalved,
  faUserTie,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { useFormspree } from '@/hooks/useFormspree';
import '@/styles/catering-deal.css';

// ──────────────────────────────────────────────────────────────────────
// EDIT THESE THREE BLOCKS TO MATCH THE ACTUAL OFFER
// ──────────────────────────────────────────────────────────────────────
const OFFER = {
  eyebrow: 'Limited-Time Offer',
  headlineLead: 'Catering for ',
  headlineAccent: '300 Guests',
  headlineTail: ' — done right.',
  lede: 'Reserve Piquant Catering for your milestone event and lock in our chef-curated menu, full-service staff, and elegant presentation — all coordinated by your own dedicated event manager.',
  // What guests get bundled in the deal
  includes: [
    {
      icon: faUtensils,
      title: 'Chef-curated menu',
      body: 'Three-course tasting menu with seasonal Piquant signatures, customized to your event.',
    },
    {
      icon: faUserTie,
      title: 'Full-service team',
      body: 'Servers, bartenders, and on-site captain — coordinated by a dedicated event manager.',
    },
    {
      icon: faChampagneGlasses,
      title: 'Premium presentation',
      body: 'Buffet styling, plated service, or family-style — built around your venue and theme.',
    },
    {
      icon: faShieldHalved,
      title: 'Dietary inclusive',
      body: 'Vegetarian, vegan, gluten-free, and allergen-conscious options for every guest.',
    },
  ],
  // Optional callout pulled from a real review
  pullQuote: {
    text: 'Piquant exceeded our expectations in every way. The food was absolutely divine and our guests are still talking about it months later.',
    author: 'Emily & Michael Johnson — Wedding Reception, 280 guests',
  },
  // Trust signals shown in the hero
  trustItems: [
    { icon: faCalendarCheck, text: '15+ years catering' },
    { icon: faClock, text: '24-hour reply' },
    { icon: faShieldHalved, text: 'Fully insured' },
  ],
} as const;
// ──────────────────────────────────────────────────────────────────────

export default function OfferClient() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const { status, error, submit } = useFormspree();

  // Capture campaign attribution from the QR-code URL
  const tracking = useMemo(() => {
    const get = (key: string) => searchParams?.get(key) ?? '';
    return {
      utm_source: get('utm_source'),
      utm_medium: get('utm_medium'),
      utm_campaign: get('utm_campaign'),
      utm_content: get('utm_content'),
      qr_id: get('qr_id'),
    };
  }, [searchParams]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('_gotcha')) return;

    const payload: Record<string, string> = {
      _subject: '300-Guest Catering Deal — Lead from QR Funnel',
      offer: '300-guest-catering-deal',
      ...tracking,
    };
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') payload[key] = value;
    }
    const ok = await submit(payload);
    if (ok) event.currentTarget.reset();
  };

  return (
    <div className="deal-page">
      <section className="deal-hero">
        <div>
          <span className="deal-hero-eyebrow">{OFFER.eyebrow}</span>
          <h1>
            {OFFER.headlineLead}
            <span className="accent">{OFFER.headlineAccent}</span>
            {OFFER.headlineTail}
          </h1>
          <p className="lede">{OFFER.lede}</p>

          <div className="deal-cta-row">
            <button type="button" className="deal-cta primary" onClick={scrollToForm}>
              Reserve Your Date
            </button>
            <a className="deal-cta ghost" href="tel:+19178226951">
              Call (917) 822-6951
            </a>
          </div>

          <div className="deal-trust">
            {OFFER.trustItems.map((item) => (
              <div className="deal-trust-item" key={item.text}>
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="deal-section">
        <h2>What&apos;s included in the deal</h2>
        <p className="section-sub">
          A complete catering package for 300 guests — designed to make your event effortless.
        </p>
        <div className="deal-includes-grid">
          {OFFER.includes.map((item) => (
            <article className="deal-include-card" key={item.title}>
              <div className="deal-include-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="deal-quote">
        <blockquote>&ldquo;{OFFER.pullQuote.text}&rdquo;</blockquote>
        <div className="author">— {OFFER.pullQuote.author}</div>
      </section>

      <section className="deal-form-section" ref={formRef}>
        <div className="deal-form-card">
          {status === 'success' ? (
            <div className="deal-success">
              <div className="deal-success-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <h2>We&apos;ve got your request</h2>
              <p>
                Thanks — our event team will reach out within 24 hours to confirm your date and walk
                through the menu. Keep an eye on your inbox (and check your phone).
              </p>
              <div className="deal-success-next">
                <Link href="/menus">Browse the menu</Link>
                <Link href="/reviews">Read recent reviews</Link>
              </div>
            </div>
          ) : (
            <>
              <h2>Reserve your 300-guest event</h2>
              <p className="form-sub">
                Tell us a little about your event — we&apos;ll come back with availability and a
                custom proposal within 24 hours.
              </p>
              <form className="deal-form" onSubmit={handleSubmit} noValidate>
                <div className="deal-field full">
                  <label htmlFor="deal-name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="deal-name"
                    name="name"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div className="deal-field">
                  <label htmlFor="deal-email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="deal-email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="deal-field">
                  <label htmlFor="deal-phone">
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="deal-phone"
                    name="phone"
                    required
                    placeholder="(555) 555-5555"
                    autoComplete="tel"
                  />
                </div>

                <div className="deal-field">
                  <label htmlFor="deal-date">
                    Event Date <span className="required">*</span>
                  </label>
                  <input type="date" id="deal-date" name="event_date" required />
                </div>

                <div className="deal-field">
                  <label htmlFor="deal-venue">Venue / City</label>
                  <input
                    type="text"
                    id="deal-venue"
                    name="venue"
                    placeholder="Where the event will be held"
                  />
                </div>

                <div className="deal-field full">
                  <label htmlFor="deal-notes">
                    Anything we should know? (dietary, theme, timing)
                  </label>
                  <textarea
                    id="deal-notes"
                    name="message"
                    rows={4}
                    placeholder="Tell us about the event…"
                  />
                </div>

                {/* Hidden attribution fields — populated from the QR code's UTM params */}
                {Object.entries(tracking).map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={value} />
                ))}

                {/* Honeypot spam trap */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="honeypot"
                />

                {error && <div className="deal-form-error">{error}</div>}

                <button type="submit" className="deal-submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Reserve My Date'}
                </button>
                <p className="deal-form-note">
                  No commitment — we&apos;ll send a proposal first. Your info stays private.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
