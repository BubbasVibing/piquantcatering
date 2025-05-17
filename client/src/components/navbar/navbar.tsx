import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logo}>
          <img 
            src={scrolled ? '/assets/whitemainsitelogopiquant (1).png' : '/assets/mainsitelogopiquant (1).png'} 
            alt="Piquant Logo" 
            className={styles.logoImg} 
          />
        </a>
        
        <div className={styles.menuToggle} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/menus">Menus</a></li>
          <li><a href="/event-catering">Event Catering</a></li>
          <li><a href="/food-partnerships">Partnerships</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/contact" className={styles.contactBtn}>Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
