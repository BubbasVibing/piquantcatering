'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import '@/styles/loved-the-food.css';

/* ──────────────────────────────────────────────────────────────────────
 * Fill these values in before printing the QR code.
 * ────────────────────────────────────────────────────────────────────── */
const PHONE_DISPLAY = '(917) 822-6951';
const PHONE_TEL = '+19178226951'; // E.164, no formatting, for tel: and sms:
const SERVICE_AREA = 'Serving Philadelphia and South Jersey.';
const INSTAGRAM_HANDLE = 'piquantcateringnj';
const SMS_BODY = "Hi, I'm interested in catering for an event";

export default function OfferClient() {
  const searchParams = useSearchParams();

  // Attribution from the QR-code URL. Appended to the SMS body so the
  // chef can see which placement converted when the message arrives.
  const smsHref = useMemo(() => {
    const ref =
      searchParams?.get('qr_id') ??
      searchParams?.get('event_id') ??
      searchParams?.get('utm_campaign') ??
      '';
    const body = ref ? `${SMS_BODY} (ref: ${ref})` : SMS_BODY;
    return `sms:${PHONE_TEL}?&body=${encodeURIComponent(body)}`;
  }, [searchParams]);

  return (
    <div className="lf-page">
      <div className="lf-container">
        {/* 1) Identity strip */}
        <section className="lf-identity" aria-label="Piquant">
          <Image
            src="/assets/whitemainsitelogopiquant (1).png"
            alt="Piquant"
            width={260}
            height={72}
            priority
            className="lf-identity-logo"
          />
          <p className="lf-identity-line">Custom menus for every event.</p>
        </section>

        {/* 2) Hook */}
        <section className="lf-hook">
          <h1>Enjoying the food today?</h1>
          <p className="lf-hook-sub">
            This is Piquant. We design custom French bistro menus for weddings, corporate events,
            and private gatherings.
          </p>
        </section>

        {/* 3) Primary CTA */}
        <section className="lf-cta-wrap">
          <a className="lf-call" href={`tel:${PHONE_TEL}`}>
            <FontAwesomeIcon icon={faPhone} className="lf-call-icon" />
            <span>Call the Chef</span>
          </a>
          <p className="lf-reassure">
            No sales team, no pressure. Just a quick conversation about your event.
          </p>
        </section>

        {/* 4) Trust line */}
        <p className="lf-trust">
          You&apos;ll speak directly with our chef, who personally designs every menu. We take a
          limited number of events each month so each one gets full attention.
        </p>

        {/* 5) Secondary capture */}
        <p className="lf-secondary">
          Prefer to text? <a href={smsHref}>Send a quick message</a>.
        </p>

        {/* 6) Footer */}
        <footer className="lf-footer">
          <p className="lf-footer-line">{SERVICE_AREA}</p>
          <p className="lf-footer-line">{PHONE_DISPLAY}</p>
          <p className="lf-footer-line">
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} /> @{INSTAGRAM_HANDLE}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
