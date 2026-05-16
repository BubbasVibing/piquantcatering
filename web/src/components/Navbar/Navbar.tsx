'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const LOGO_DARK_BG = '/assets/mainsitelogopiquant (1).png';
const LOGO_LIGHT_BG = '/assets/whitemainsitelogopiquant (1).png';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menus', label: 'Menus' },
  { href: '/event-catering', label: 'Event Catering' },
  { href: '/food-partnerships', label: 'Partnerships' },
  { href: '/reviews', label: 'Reviews' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image
            src={scrolled ? LOGO_LIGHT_BG : LOGO_DARK_BG}
            alt="Piquant Catering"
            width={180}
            height={50}
            priority
            className={styles.logoImg}
          />
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} onClick={closeMobileMenu}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className={styles.contactBtn} onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
