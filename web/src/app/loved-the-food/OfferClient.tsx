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

/* ──────────────────────────────────────────────────────────────────────
 * Funnel content — work through each section below.
 *
 * Every section's copy lives in this single CONTENT object. Edit a
 * section here and the page updates. The structure (hero → incentive
 * → "what we do" cards → pull-quote → form) stays the same; only the
 * words change.
 *
 *   1) HERO          → CONTENT.hero
 *   2) INCENTIVE     → CONTENT.incentive
 *   3) WHAT WE DO    → CONTENT.cards
 *   4) PULL QUOTE    → CONTENT.quote
 *   5) FORM          → CONTENT.form
 *
 * Replace any "TODO:" line with the real copy.
 * ────────────────────────────────────────────────────────────────────── */
const CONTENT = {
  // ── 1) HERO ─────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'TODO: short eyebrow tag',
    // Headline renders as:  {lead}{accent}{tail}
    headlineLead: 'TODO: headline lead ',
    headlineAccent: 'highlighted phrase',
    headlineTail: ' — closing line.',
    lede: 'TODO: one or two sentence lede that explains the offer in plain language.',
    primaryCta: 'TODO: primary CTA label',
    phone: '(917) 822-6951',
    trustItems: [
      { icon: faCalendarCheck, text: 'TODO: trust item one' },
      { icon: faClock, text: 'TODO: trust item two' },
      { icon: faShieldHalved, text: 'TODO: trust item three' },
    ],
  },

  // ── 2) INCENTIVE ────────────────────────────────────────────────────
  incentive: {
    badge: 'TODO: small badge label',
    title: 'TODO: the actual offer (e.g. "10% off your first booking")',
    body: 'TODO: one sentence explaining how to claim the offer and what they get.',
    ctaLabel: 'TODO: incentive CTA label',
  },

  // ── 3) WHAT WE DO (4 cards) ─────────────────────────────────────────
  cardsHeading: 'TODO: section heading',
  cardsSub: 'TODO: short supporting line under the heading.',
  cards: [
    { icon: faUtensils, title: 'TODO: card 1 title', body: 'TODO: card 1 body.' },
    { icon: faUserTie, title: 'TODO: card 2 title', body: 'TODO: card 2 body.' },
    { icon: faChampagneGlasses, title: 'TODO: card 3 title', body: 'TODO: card 3 body.' },
    { icon: faShieldHalved, title: 'TODO: card 4 title', body: 'TODO: card 4 body.' },
  ],

  // ── 4) PULL QUOTE ───────────────────────────────────────────────────
  quote: {
    text: 'TODO: a short, punchy testimonial.',
    author: 'TODO: name — event type',
  },

  // ── 5) FORM ─────────────────────────────────────────────────────────
  form: {
    heading: 'TODO: form heading',
    sub: 'TODO: short sentence above the form.',
    submitLabel: 'TODO: submit button label',
    submitNote: 'TODO: small reassurance line under the submit button.',
    successHeading: 'TODO: thank-you heading',
    successBody: 'TODO: thank-you body — what happens next.',
  },
} as const;

/* ────────────────────────────────────────────────────────────────────── */

export default function OfferClient() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const { status, error, submit } = useFormspree();

  // QR-code attribution
  const tracking = useMemo(() => {
    const get = (key: string) => searchParams?.get(key) ?? '';
    return {
      utm_source: get('utm_source'),
      utm_medium: get('utm_medium'),
      utm_campaign: get('utm_campaign'),
      utm_content: get('utm_content'),
      qr_id: get('qr_id'),
      event_id: get('event_id'),
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
      _subject: 'Loved-the-Food Funnel — Lead from QR',
      offer: 'loved-the-food',
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
      {/* 1) HERO ─────────────────────────────────────────────────────── */}
      <section className="deal-hero">
        <div>
          <span className="deal-hero-eyebrow">{CONTENT.hero.eyebrow}</span>
          <h1>
            {CONTENT.hero.headlineLead}
            <span className="accent">{CONTENT.hero.headlineAccent}</span>
            {CONTENT.hero.headlineTail}
          </h1>
          <p className="lede">{CONTENT.hero.lede}</p>

          <div className="deal-cta-row">
            <button type="button" className="deal-cta primary" onClick={scrollToForm}>
              {CONTENT.hero.primaryCta}
            </button>
            <a className="deal-cta ghost" href={`tel:${CONTENT.hero.phone.replace(/[^\d+]/g, '')}`}>
              Call {CONTENT.hero.phone}
            </a>
          </div>

          <div className="deal-trust">
            {CONTENT.hero.trustItems.map((item) => (
              <div className="deal-trust-item" key={item.text}>
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2) INCENTIVE ───────────────────────────────────────────────── */}
      <section className="deal-incentive">
        <div className="deal-incentive-card">
          <span className="deal-incentive-badge">{CONTENT.incentive.badge}</span>
          <h2>{CONTENT.incentive.title}</h2>
          <p>{CONTENT.incentive.body}</p>
          <button type="button" className="deal-cta primary" onClick={scrollToForm}>
            {CONTENT.incentive.ctaLabel}
          </button>
        </div>
      </section>

      {/* 3) WHAT WE DO ──────────────────────────────────────────────── */}
      <section className="deal-section">
        <h2>{CONTENT.cardsHeading}</h2>
        <p className="section-sub">{CONTENT.cardsSub}</p>
        <div className="deal-includes-grid">
          {CONTENT.cards.map((item) => (
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

      {/* 4) PULL QUOTE ──────────────────────────────────────────────── */}
      <section className="deal-quote">
        <blockquote>&ldquo;{CONTENT.quote.text}&rdquo;</blockquote>
        <div className="author">— {CONTENT.quote.author}</div>
      </section>

      {/* 5) FORM ────────────────────────────────────────────────────── */}
      <section className="deal-form-section" ref={formRef}>
        <div className="deal-form-card">
          {status === 'success' ? (
            <div className="deal-success">
              <div className="deal-success-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <h2>{CONTENT.form.successHeading}</h2>
              <p>{CONTENT.form.successBody}</p>
              <div className="deal-success-next">
                <Link href="/menus">View the menu</Link>
                <Link href="/reviews">Read reviews</Link>
              </div>
            </div>
          ) : (
            <>
              <h2>{CONTENT.form.heading}</h2>
              <p className="form-sub">{CONTENT.form.sub}</p>
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
                  <label htmlFor="deal-event-type">Event Type</label>
                  <input
                    type="text"
                    id="deal-event-type"
                    name="event_type"
                    placeholder="Wedding, corporate, birthday…"
                  />
                </div>

                <div className="deal-field full">
                  <label htmlFor="deal-notes">Anything we should know?</label>
                  <textarea
                    id="deal-notes"
                    name="message"
                    rows={3}
                    placeholder="Optional — date, guest count, vision…"
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
                  {status === 'submitting' ? 'Sending…' : CONTENT.form.submitLabel}
                </button>
                <p className="deal-form-note">{CONTENT.form.submitNote}</p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
