'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './TasterCTA.module.css';

// Don't render the popup on these routes:
//   - /loved-the-food → user is already on the funnel
const HIDDEN_ON: readonly string[] = ['/loved-the-food'];

const DISMISS_KEY = 'piquant:taster-popup-dismissed';
const SHOW_DELAY_MS = 6000;

export default function TasterCTA() {
  const pathname = usePathname();
  const hidden = pathname ? HIDDEN_ON.includes(pathname) : false;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hidden) return;
    if (sessionStorage.getItem(DISMISS_KEY) === '1') return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [hidden]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // sessionStorage may be unavailable (private mode) — fine to ignore.
    }
  };

  if (hidden || !open) return null;

  return (
    <div className={styles.popup} role="dialog" aria-labelledby="taster-popup-title">
      <button type="button" className={styles.close} onClick={dismiss} aria-label="Close offer">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <p className={styles.eyebrow}>Tasted Piquant somewhere?</p>
      <h3 id="taster-popup-title" className={styles.title}>
        Bring that flavour to your next event.
      </h3>
      <p className={styles.body}>Tell the chef what you loved — we&rsquo;ll cater the rest.</p>
      <Link href="/loved-the-food" className={styles.cta} onClick={dismiss}>
        Get in touch <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  );
}
