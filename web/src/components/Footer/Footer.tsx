'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menus', label: 'Menus' },
  { href: '/reviews', label: 'Reviews' },
];

const SERVICE_LINKS = [
  { href: '/event-catering', label: 'Event Catering' },
  { href: '/food-partnerships', label: 'Partnerships' },
  { href: '/contact', label: 'Contact Us' },
];

const SOCIALS = [
  { icon: faFacebookF, label: 'Facebook' },
  { icon: faInstagram, label: 'Instagram' },
  { icon: faPinterestP, label: 'Pinterest' },
];

export default function Footer() {
  const [popup, setPopup] = useState<{ x: number; y: number } | null>(null);

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopup({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 40,
    });
    window.setTimeout(() => setPopup(null), 2000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Image
              src="/assets/mainsitelogopiquant (1).png"
              alt="Piquant Catering"
              width={180}
              height={50}
              className={styles.footerLogoImg}
            />
            <p>Elevating events with artful cuisine and exceptional service since 2010</p>
          </div>

          <div className={styles.footerLinks}>
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4>Services</h4>
            <ul>
              {SERVICE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerContact}>
            <h4>Contact Us</h4>
            <p>
              Pennsauken, NJ
              <br />
              Englewood, NJ
            </p>
            <p style={{ textAlign: 'center' }}>info@piquantcatering.com</p>
            <p style={{ textAlign: 'center' }}>(917) 822-6951</p>
          </div>

          <div className={styles.footerSocial}>
            <h4>Follow Us</h4>
            <div className={styles.socialIcons}>
              {SOCIALS.map(({ icon, label }) => (
                <a key={label} href="#" aria-label={label} onClick={handleSocialClick}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Piquant Catering. All rights reserved.</p>
        </div>
      </div>

      {popup && (
        <div className={styles.socialPopup} style={{ left: `${popup.x}px`, top: `${popup.y}px` }}>
          Coming soon!
        </div>
      )}
    </footer>
  );
}
