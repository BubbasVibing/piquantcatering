'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './TasterCTA.module.css';

// Don't render the floating CTA on these routes:
//   - /loved-the-food → user is already on the funnel
const HIDDEN_ON: readonly string[] = ['/loved-the-food'];

export default function TasterCTA() {
  const pathname = usePathname();
  if (pathname && HIDDEN_ON.includes(pathname)) return null;

  return (
    <Link
      href="/loved-the-food"
      className={styles.fab}
      aria-label="Just tasted Piquant? Open the chef's contact page."
    >
      I just had the food <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  );
}
