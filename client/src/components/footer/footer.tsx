import React, { useState } from 'react';
import styles from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  
  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Calculate position near the clicked element
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 40
    });
    
    // Show popup
    setShowPopup(true);
    
    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

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
            <p>Elevating events with artful cuisine and exceptional service since 2010</p>
          </div>
          
          <div className={styles.footerLinks}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/menus">Menus</a></li>
              <li><a href="/reviews">Reviews</a></li>
            </ul>
          </div>
          
          <div className={styles.footerLinks}>
            <h4>Services</h4>
            <ul>
              <li><a href="/event-catering">Event Catering</a></li>
              <li><a href="/food-partnerships">Partnerships</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className={styles.footerContact}>
            <h4>Contact Us</h4>
            <p>Pennsauken, NJ<br />Englewood, NJ</p>
            <p style={{ textAlign: 'center' }}>info@piquantcatering.com</p>
            <p style={{ textAlign: 'center' }}>(917) 822-6951</p>
          </div>
          
          <div className={styles.footerSocial}>
            <h4>Follow Us</h4>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook" onClick={handleSocialClick}>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" aria-label="Instagram" onClick={handleSocialClick}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" aria-label="Pinterest" onClick={handleSocialClick}>
                <FontAwesomeIcon icon={faPinterestP} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Piquant Catering. All rights reserved.</p>
        </div>
      </div>
      
      {showPopup && (
        <div 
          className={styles.socialPopup}
          style={{ 
            left: `${popupPosition.x}px`, 
            top: `${popupPosition.y}px` 
          }}
        >
          Coming soon!
        </div>
      )}
    </footer>
  );
};

export default Footer;
