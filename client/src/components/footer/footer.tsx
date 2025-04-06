import React from 'react';
import styles from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img 
              src="/assets/mainsitelogopiquant (1).png" 
              alt="Piquant Logo" 
              className={styles.footerLogoImg} 
            />
            <p>Extraordinary culinary experiences</p>
          </div>
          
          <div className={styles.footerLinks}>
            <h4>Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/venue">Venue</a></li>
              <li><a href="/corporate">Corporate</a></li>
              <li><a href="/menus">Menus</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/reviews">Reviews</a></li>
            </ul>
          </div>
          
          <div className={styles.footerContact}>
            <h4>Contact Us</h4>
            <p>123 Culinary Avenue<br />Gourmet District, CA 90210</p>
            <p>info@piquantcatering.com<br />(555) 123-4567</p>
          </div>
          
          <div className={styles.footerSocial}>
            <h4>Follow Us</h4>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" aria-label="Pinterest">
                <FontAwesomeIcon icon={faPinterestP} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Piquant Catering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
