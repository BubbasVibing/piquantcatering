import React, { useEffect, useState, useRef, FormEvent } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { 
  faRing, 
  faBriefcase, 
  faUtensils, 
  faCakeCandles, 
  faStar, 
  faStarHalfAlt, 
  faQuoteLeft, 
  faUserCircle, 
  faG, 
  faWineGlass, 
  faAppleAlt, 
  faCheese, 
  faLeaf, 
  faPepperHot,
  faCalendarAlt,
  faHatCowboy,
  faTruck,
  faPalette,
  faTimes,
  faEnvelope,
  faPhone,
  faUsers,
  faComment
} from '@fortawesome/free-solid-svg-icons';
import '../styles/home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [imageRotated, setImageRotated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Form submission states
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  
  const [servicesVisible, setServicesVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [showcaseVisible, setShowcaseVisible] = useState(false);
  
  const subtitle = "Extraordinary culinary artistry for life's most meaningful celebrations";
  
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    // Reset form after animation completes
    setTimeout(() => {
      setPopupSubmitted(false);
    }, 300);
  };
  
  // Close modal if clicking outside the content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    // Observer for image rotation on scroll
    const imageObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setImageRotated(true);
        }
      },
      { threshold: 0.3 }
    );

    // Observers for section animations
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Check which section is visible
            const target = entry.target;
            if (target === servicesRef.current) {
              setServicesVisible(true);
            } else if (target === galleryRef.current) {
              setGalleryVisible(true);
            } else if (target === testimonialRef.current) {
              setTestimonialVisible(true);
            } else if (target === contactRef.current) {
              setContactVisible(true);
            } else if (target === showcaseRef.current) {
              setShowcaseVisible(true);
            }
            
            // Unobserve after animation triggered
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Set up all observers
    if (aboutImageRef.current) {
      imageObserver.observe(aboutImageRef.current);
    }
    
    if (servicesRef.current) {
      sectionObserver.observe(servicesRef.current);
    }
    
    if (galleryRef.current) {
      sectionObserver.observe(galleryRef.current);
    }
    
    if (testimonialRef.current) {
      sectionObserver.observe(testimonialRef.current);
    }
    
    if (contactRef.current) {
      sectionObserver.observe(contactRef.current);
    }
    
    if (showcaseRef.current) {
      sectionObserver.observe(showcaseRef.current);
    }

    return () => {
      // Clean up all observers
      if (aboutImageRef.current) {
        imageObserver.unobserve(aboutImageRef.current);
      }
      
      if (servicesRef.current) {
        sectionObserver.unobserve(servicesRef.current);
      }
      
      if (galleryRef.current) {
        sectionObserver.unobserve(galleryRef.current);
      }
      
      if (testimonialRef.current) {
        sectionObserver.unobserve(testimonialRef.current);
      }
      
      if (contactRef.current) {
        sectionObserver.unobserve(contactRef.current);
      }
      
      if (showcaseRef.current) {
        sectionObserver.unobserve(showcaseRef.current);
      }
      
      // Cleanup modal
      document.body.style.overflow = 'auto';
    };
  }, [subtitle.length]);

  // Create an array of spans with staggered animations for each character
  const renderLuxurySubtitle = () => {
    // Split the subtitle into words
    const words = subtitle.split(' ');
    
    return (
      <div className="luxury-reveal">
        {words.map((word, wordIndex) => (
          <span 
            key={wordIndex} 
            className="word"
            data-delay={wordIndex}
          >
            {word}
            {/* Add space after each word except the last */}
            {wordIndex < words.length - 1 && <span className="space">&nbsp;</span>}
          </span>
        ))}
      </div>
    );
  };

  // Handle popup form submission
  const handlePopupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPopupSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });
      
      if (response.ok) {
        setPopupSubmitted(true);
        form.reset();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setPopupSubmitting(false);
    }
  };
  
  // Handle contact form submission
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });
      
      if (response.ok) {
        setContactSubmitted(true);
        form.reset();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="home">
      <Navbar />
      
      {/* Hero Section with Key for Force Update */}
      <div className="hero-section-wrapper" key="hero-section-wrapper">
        <section className="hero-section">
          <div 
            className="hero-overlay-v2" 
            style={{ background: 'linear-gradient(to right, rgba(69, 38, 58, 0.1), rgba(69, 38, 58, 0.1))' }}
          ></div>
          <div className="hero-content">
            <h1>PIQUANT</h1>
            <p>{renderLuxurySubtitle()}</p>
            <button className="cta-button" onClick={openModal}>Book a Consultation</button>
          </div>
        </section>
      </div>
      
      {/* Consultation Modal */}
      <div 
        className={`modal-overlay ${modalOpen ? 'active' : ''}`} 
        onClick={handleOverlayClick}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{popupSubmitted ? 'Thank You!' : 'Reserve Your Culinary Experience'}</h3>
            <p className="modal-subtitle">
              {popupSubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : 'Tell us about your event vision'}
            </p>
            <button className="modal-close" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          {popupSubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for your interest in Piquant catering services. 
                Our team is excited to bring your vision to life.
              </p>
              <button onClick={closeModal} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-body">
                <form 
                  id="popup-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={handlePopupSubmit}
                >
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-group">
                      <input type="tel" name="phone" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <select name="event_type" required>
                      <option value="" disabled selected>Type of Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="private">Private Dinner</option>
                      <option value="celebration">Special Celebration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="text" name="guest_count" placeholder="Estimated Guest Count" required />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Tell us about your vision..." rows={3}></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="_subject" value="New Consultation Request (Popup Form)" />
                </form>
              </div>
              <div className="modal-footer">
                <p className="form-privacy">Your information is secure and will never be shared with third parties. You will be contacted within 48 hours.</p>
                <button 
                  type="submit" 
                  form="popup-form" 
                  className="submit-btn"
                  disabled={popupSubmitting}
                >
                  {popupSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header">
            <h2>Culinary Artistry</h2>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                At Piquant, we believe that <span className="culinary-highlight">exceptional food is the cornerstone</span> of any memorable event. 
                Our team of passionate chefs combines classic techniques with innovative approaches 
                to create dining experiences that captivate all the senses.
              </p>
              <p>
                We work closely with local farmers and artisanal producers to source the finest seasonal 
                ingredients, ensuring that every dish we serve reflects our <span className="culinary-highlight">commitment to flavor, quality and sustainability</span>.
              </p>
              <p>
                From meticulously crafted canapés to show-stopping entrées, our culinary creations are tailored to your unique vision,
                transforming your event into an unforgettable gastronomic journey that your guests will remember long after the last bite.
              </p>
            </div>
            <div className="about-image" ref={aboutImageRef}>
              <img 
                src="/assets/foodimagepiquant.png" 
                alt="Chef carefully plating gourmet food" 
                className={`food-plate-image ${imageRotated ? 'rotated' : ''}`}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Offer Section */}
      <section className="buffet-section" id="buffet" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={servicesVisible ? 'animate-section' : ''}>WHAT WE OFFER</h2>
            <p className="buffet-subtitle">Unique culinary experiences for every occasion</p>
          </div>
          
          <div className={`buffet-showcase ${servicesVisible ? 'animate-section' : ''}`}>
            <div className="buffet-gallery">
              <div className="buffet-image large">
                <img src="/assets/pakuraandbread.jpg" alt="Elegantly set table for a fine dining experience" />
              </div>
              <div className="buffet-grid">
                <div className="buffet-image">
                  <img src="/assets/burgerfries.png" alt="Gourmet burger and fries" />
                </div>
                <div className="buffet-image">
                  <img src="/assets/beefthingies.png" alt="Premium beef appetizers" />
                </div>
                <div className="buffet-image">
                  <img src="/assets/hummusmeal.jpg" alt="Fresh hummus meal with premium ingredients" />
                </div>
              </div>
            </div>
            
            <div className="buffet-content">
              <h3 style={{textAlign: 'center'}}>Crafting Culinary Memories</h3>
              <p style={{textAlign: 'center'}}>
                Experience our distinctive menu offerings, featuring innovative flavor combinations and 
                time-honored techniques. Our culinary team creates memorable dishes that showcase
                the finest seasonal ingredients, beautifully presented to delight both the eye and palate.
              </p>
              <p style={{textAlign: 'center'}}>
                From intimate gatherings to grand celebrations, we customize our menus to match your vision
                and exceed expectations. Every dish is crafted with meticulous attention to detail,
                ensuring a unique and unforgettable dining experience for you and your guests.
              </p>
              <Link to="/menus" className="buffet-cta">EXPLORE MENU</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section - Card-based Layout */}
      <section className="gallery-section" ref={galleryRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={galleryVisible ? 'animate-section' : ''}>
              Our <span className="highlight">Culinary</span> Experience
            </h2>
            <p className="gallery-subtitle">Discover the unique flavors and exceptional service that define Piquant catering</p>
          </div>
          
          <div className={`services-cards ${galleryVisible ? 'animate-section' : ''}`}>
            <div className="service-card-item">
              <div className="card-icon">
                <FontAwesomeIcon icon={faUtensils} />
              </div>
              <div className="card-image">
                <img src="/assets/hummusmeal.jpg" alt="Fresh hummus meal with premium ingredients" />
              </div>
              <div className="card-content">
                <h4>Premium <span className="highlight">Ingredients</span></h4>
                <p>We source the finest local and seasonal ingredients to create dishes that are fresh and vibrant</p>
              </div>
            </div>
            
            <div className="service-card-item">
              <div className="card-icon">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <div className="card-image">
                <img src="/assets/baconeggcheese.jpg" alt="Delicious bacon egg and cheese dish" />
              </div>
              <div className="card-content">
                <h4><span className="highlight">Sample</span> Before You Decide</h4>
                <p>We invite you to taste our creations before your event to ensure a perfect menu selection</p>
              </div>
            </div>
            
            <div className="service-card-item highlight-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={faPalette} />
              </div>
              <div className="card-image">
                <img src="/assets/saladforpiquantcatering.jpg" alt="Beautifully presented gourmet salad" />
              </div>
              <div className="card-content">
                <h4>Artful <span className="highlight">Presentation</span></h4>
                <p>Each dish is crafted with meticulous attention to detail and aesthetically presented</p>
              </div>
            </div>
            
            <div className="service-card-item">
              <div className="card-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <div className="card-image">
                <img src="/assets/deilveredfood.jpg" alt="Professionally delivered food packages" />
              </div>
              <div className="card-content">
                <h4>Seamless <span className="highlight">Service</span></h4>
                <p>From planning to cleanup, our professional team ensures every aspect of your event runs smoothly</p>
              </div>
            </div>
          </div>
          
          <div className="services-cta">
            <Link to="/contact" className="cta-button tasting-button">Schedule a Tasting</Link>
            <Link to="/menus" className="cta-button menu-button">View Our Menu</Link>
          </div>
        </div>
      </section>
      
      {/* Food Showcase Section - Updated to Meal Box */}
      <section className="food-showcase-section" ref={showcaseRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={showcaseVisible ? 'animate-section' : ''}>Meal Box Experience</h2>
          </div>
          <div className={`showcase-content ${showcaseVisible ? 'animate-section' : ''}`}>
            <div className="showcase-text">
              <h3>Chef-Crafted Meal Boxes</h3>
              <p>
                Experience Piquant's culinary excellence at home with our premium meal box service. 
                Each box contains restaurant-quality ingredients, precisely portioned and prepped by our 
                chefs, along with easy-to-follow instructions to create an extraordinary dining 
                experience in your own kitchen.
              </p>
              <p>
                Perfect for special occasions, corporate gifting, or elevating your everyday dining. 
                Our meal boxes are available for delivery and can be customized to accommodate 
                dietary preferences and requirements.
              </p>
              <div className="showcase-links">
                <Link to="/food-partnerships" className="showcase-link partnerships">Explore Partnerships</Link>
                <Link to="/menus" className="showcase-link menus">View Meal Box Menu</Link>
              </div>
            </div>
            <div className="showcase-images">
              <div className="showcase-large">
                <img src="/assets/packedmealsforthe.png" alt="Premium packaged meal box delivery" />
              </div>
              <div className="showcase-small">
                <img src="/assets/chefmakingfood.jpg" alt="Chef preparing gourmet meals in kitchen" />
                <img src="/assets/morepackedmeals.jpg" alt="Variety of prepared packed meals ready for delivery" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials" ref={testimonialRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={testimonialVisible ? 'animate-section' : ''}>Rave Reviews</h2>
          </div>
          <h3 className={`review-highlight ${testimonialVisible ? 'animate-section' : ''}`}>Guests consistently praise our flavor-forward cuisine and impeccable presentation</h3>
          <div className={`testimonials-grid ${testimonialVisible ? 'animate-section' : ''}`}>
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-image">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Emily" />
                </div>
                <div className="reviewer-info">
                  <h4>Emily & Michael Johnson</h4>
                  <p className="review-event">Wedding Reception</p>
                </div>
              </div>
              <div className="review-content">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                <p>"Piquant exceeded our expectations in every way. The food was absolutely divine - from the passed hors d'oeuvres to the plated main course. The flavors were extraordinary and the presentation stunning. Our guests are still raving about the meal months later!"</p>
              </div>
              <div className="review-footer">
                <div className="review-date">June 2023</div>
                <div className="review-source">
                  <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                </div>
              </div>
            </div>
            
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-image">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="James" />
                </div>
                <div className="reviewer-info">
                  <h4>James Wilson</h4>
                  <p className="review-event">Annual Corporate Gala</p>
                </div>
              </div>
              <div className="review-content">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                <p>"The food stations at our corporate gala were a highlight of the evening. The chef's custom menu featured innovative pairings and artful presentation that impressed even our most discerning executives. The seasonal ingredients and exceptional flavors perfectly aligned with our company's values."</p>
              </div>
              <div className="review-footer">
                <div className="review-date">November 2023</div>
                <div className="review-source">
                  <div className="trustpilot-text">Trustpilot</div>
                </div>
              </div>
            </div>
            
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-image">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Sarah" />
                </div>
                <div className="reviewer-info">
                  <h4>Sarah Thompson</h4>
                  <p className="review-event">Private Birthday Celebration</p>
                </div>
              </div>
              <div className="review-content">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                <p>"The tasting menu Piquant created for my 50th birthday was exceptional. Each course was a culinary masterpiece - beautifully presented and bursting with flavor. The chef's attention to dietary preferences was impressive, and the custom dessert finale was unforgettable. Worth every penny!"</p>
              </div>
              <div className="review-footer">
                <div className="review-date">September 2023</div>
                <div className="review-source">
                  <div className="yelp-text">Yelp</div>
                </div>
              </div>
            </div>
          </div>
          <div className={`see-all-reviews ${testimonialVisible ? 'animate-section' : ''}`}>
            <Link to="/reviews" className="reviews-link">Read More Client Stories</Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={contactVisible ? 'animate-section' : ''}>Elevate Your Event</h2>
          </div>
          <p className={`contact-subtitle ${contactVisible ? 'animate-section' : ''}`}>
            {contactSubmitted ? 'Thank you for your interest in Piquant!' : 'Begin your epicurean experience with Piquant'}
          </p>
          <div className={`contact-content ${contactVisible ? 'animate-section' : ''}`}>
            {contactSubmitted ? (
              <div className="contact-form-container" style={{ textAlign: 'center', padding: '40px' }}>
                <FontAwesomeIcon 
                  icon={faUtensils} 
                  style={{ fontSize: '4rem', color: 'var(--secondary)', marginBottom: '25px' }} 
                />
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>
                  Thank You for Your Inquiry
                </h3>
                <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                  We have received your inquiry and our culinary team will contact you within 48 hours 
                  to discuss your event details and how we can create an exceptional experience for you and your guests.
                </p>
                <button 
                  onClick={() => setContactSubmitted(false)} 
                  className="contact-submit" 
                  style={{ width: 'auto', margin: '0 auto', padding: '12px 25px' }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="contact-form-container">
                <form 
                  className="contact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={handleContactSubmit}
                >
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-group">
                      <input type="tel" name="phone" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <select name="event_type" required>
                      <option value="" disabled selected>Nature of Event</option>
                      <option value="wedding">Wedding Celebration</option>
                      <option value="corporate">Corporate Gathering</option>
                      <option value="private">Private Soirée</option>
                      <option value="gala">Gala or Charity Function</option>
                      <option value="bespoke">Bespoke Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select name="guest_count" required>
                      <option value="" disabled selected>Number of Guests</option>
                      <option value="12-20">12-20 guests</option>
                      <option value="21-50">21-50 guests</option>
                      <option value="51-100">51-100 guests</option>
                      <option value="101-200">101-200 guests</option>
                      <option value="201-500">201-500 guests</option>
                      <option value="500+">500+ guests</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Share your vision and culinary preferences..." rows={5} required></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="_subject" value="New Consultation Request (Contact Form)" />
                  <button 
                    type="submit" 
                    className="contact-submit"
                    disabled={contactSubmitting}
                  >
                    {contactSubmitting ? 'Submitting...' : 'Request Consultation'}
                  </button>
                  <p className="form-note">Our culinary team will respond within 24 hours to arrange a personalized consultation</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
