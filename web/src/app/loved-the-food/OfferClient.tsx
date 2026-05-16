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
  faPercent,
  faShieldHalved,
  faUserTie,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { useFormspree } from '@/hooks/useFormspree';
import '@/styles/catering-deal.css';

// ──────────────────────────────────────────────────────────────────────
// EDIT THIS BLOCK BEFORE PRINTING THE QR CODE
// ──────────────────────────────────────────────────────────────────────
const OFFER = {
  eyebrow: 'A Thank-You From Piquant',
  // The hero headline reads:  {lead}{accent}{tail}
  headlineLead: 'Loved what you ',
  headlineAccent: 'tasted tonight?',
  headlineTail: ' Bring Piquant to your next event.',
  lede: 'You\u2019re enjoying food we catered for this evening. If it impressed you, we\u2019d love to do the same for your next wedding, corporate event, or private gathering — with a thank-you offer reserved just for tonight\u2019s guests.',

  // The headline incentive — edit this to the real promo.
  incentive: {
    badge: 'For tonight\u2019s guests only',
    title: '10% off your first booking',
    body: 'Mention this page when we follow up and we\u2019ll apply 10% off your first event with us, plus a complimentary tasting before you sign anything.',
  },

  // What Piquant can do for them (kept short — they already know we cook well)
  includes: [
    {
      icon: faUtensils,
      title: 'Custom menus',
      body: 'We design every menu around your event, your guests, and any dietary needs in the room.',
    },
    {
      icon: faUserTie,
      title: 'Full-service team',
      body: 'Servers, bartenders, and a dedicated event manager — we handle everything from setup to cleanup.',
    },
    {
      icon: faChampagneGlasses,
      title: 'Any event, any size',
      body: 'Weddings, corporate dinners, milestone birthdays, intimate gatherings — 20 to 500+ guests.',
    },
    {
      icon: faPercent,
      title: 'Tasters\u2019 perks',
      body: 'Tonight\u2019s guests get a complimentary tasting and priority dates for the next 12 months.',
    },
  ],

  pullQuote: {
    text: 'Piquant exceeded our expectations in every way. The food was absolutely divine and our guests are still talking about it months later.',
    author: 'Emily & Michael Johnson — Wedding Reception, 280 guests',
  },

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
      _subject: 'Tasted-it Funnel — Lead from QR',
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
              Claim My Offer
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

      <section className="deal-incentive">
        <div className="deal-incentive-card">
          <span className="deal-incentive-badge">{OFFER.incentive.badge}</span>
          <h2>{OFFER.incentive.title}</h2>
          <p>{OFFER.incentive.body}</p>
          <button type="button" className="deal-cta primary" onClick={scrollToForm}>
            Claim My Offer
          </button>
        </div>
      </section>

      <section className="deal-section">
        <h2>How Piquant caters yours</h2>
        <p className="section-sub">
          You already know how the food tastes. Here&apos;s the rest of what we do.
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
              <h2>You&apos;re in.</h2>
              <p>
                Thanks — we&apos;ll be in touch within 24 hours to lock in your offer and start
                shaping your event. Enjoy the rest of tonight.
              </p>
              <div className="deal-success-next">
                <Link href="/menus">Peek at the full menu</Link>
                <Link href="/reviews">Read recent reviews</Link>
              </div>
            </div>
          ) : (
            <>
              <h2>Claim your offer</h2>
              <p className="form-sub">
                Drop your details and we&apos;ll reach out within 24 hours with availability and a
                proposal — and your tasters&apos; discount locked in.
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
                  <label htmlFor="deal-event-type">Event Type</label>
                  <input
                    type="text"
                    id="deal-event-type"
                    name="event_type"
                    placeholder="Wedding, corporate, birthday…"
                  />
                </div>

                <div className="deal-field full">
                  <label htmlFor="deal-notes">
                    Anything we should know? (rough date, guest count, vision)
                  </label>
                  <textarea
                    id="deal-notes"
                    name="message"
                    rows={3}
                    placeholder="Optional — tell us what you have in mind…"
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
                  {status === 'submitting' ? 'Sending…' : 'Claim My Offer'}
                </button>
                <p className="deal-form-note">
                  No commitment. We&apos;ll send a proposal and lock in your offer first.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
