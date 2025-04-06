import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faRing, faBriefcase, faUtensils, faCakeCandles, faStar, faStarHalfAlt, faQuoteLeft, faUserCircle, faG } from '@fortawesome/free-solid-svg-icons';
import '../styles/home.css';

const Home: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [imageRotated, setImageRotated] = useState(false);
  
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  const [servicesVisible, setServicesVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  
  const subtitle = 'Crafting unforgettable culinary experiences for your most important occasions';
  
  useEffect(() => {
    // Animate title appearance
    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 500);

    // Show button after subtitle animation time
    const buttonTimer = setTimeout(() => {
      setButtonVisible(true);
    }, 500 + (subtitle.split(' ').length * 150) + 100);

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

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
      
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
            style={{ 
              animationDelay: `${500 + (wordIndex * 150)}ms`,
            }}
          >
            {word}
            {/* Add space after each word except the last */}
            {wordIndex < words.length - 1 && <span className="space">&nbsp;</span>}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="home">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className={titleVisible ? 'visible' : ''}>PIQUANT</h1>
          <p>{renderLuxurySubtitle()}</p>
          <button className={`cta-button ${buttonVisible ? 'visible' : ''}`}>Book a Consultation</button>
        </div>
      </section>
      
      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <h2>Culinary Excellence</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                At Piquant, we believe that <span className="culinary-highlight">exceptional food is the cornerstone</span> of any memorable event. 
                Our team of passionate culinary artists combines classic techniques with innovative approaches 
                to create dining experiences that captivate and inspire.
              </p>
              <p>
                We work closely with local farmers and artisanal producers to source the finest seasonal 
                ingredients, ensuring that every dish we serve reflects our <span className="culinary-highlight">commitment to quality and sustainability</span>.
              </p>
              <p>
                From intimate gatherings to grand celebrations, our culinary creations are tailored to your unique vision,
                transforming your event into an unforgettable gastronomic journey.
              </p>
            </div>
            <div className="about-image" ref={aboutImageRef}>
              <img 
                src="/assets/foodimagepiquant.png" 
                alt="Gourmet food plate" 
                className={`food-plate-image ${imageRotated ? 'rotated' : ''}`}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="services-section" id="services" ref={servicesRef}>
        <div className="container">
          <h2 className={servicesVisible ? 'animate-section' : ''}>Our Specialties</h2>
          <div className={`services-grid ${servicesVisible ? 'animate-section' : ''}`}>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faRing} />
              </div>
              <h3>Weddings</h3>
              <p>Crafting unforgettable culinary experiences for your most special day</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <h3>Corporate Events</h3>
              <p>Impressive catering solutions for business functions and conferences</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faUtensils} />
              </div>
              <h3>Private Dining</h3>
              <p>Intimate gatherings with personalized menus and attentive service</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faCakeCandles} />
              </div>
              <h3>Galas & Celebrations</h3>
              <p>Elegant dining arrangements for prestigious social occasions</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="gallery-section" ref={galleryRef}>
        <div className="container">
          <h2 className={galleryVisible ? 'animate-section' : ''}>Culinary Portfolio</h2>
          <div className={`gallery-grid ${galleryVisible ? 'animate-section' : ''}`}>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Elegant plated dish with garnish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1611489142329-5f62cfa43e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Fine dining appetizer" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Gourmet dessert plate" />
            </div>
            <div className="gallery-item">
              <img src="https://images.pexels.com/photos/6032282/pexels-photo-6032282.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Canapés selection" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Artistically arranged salad" />
            </div>
            <div className="gallery-item">
              <img src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Elegant table setting" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials" ref={testimonialRef}>
        <div className="container">
          <h2 className={testimonialVisible ? 'animate-section' : ''}>Client Experiences</h2>
          <div className={`review-summary ${testimonialVisible ? 'animate-section' : ''}`}>
            <div className="rating-overview">
              <div className="stars-container">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
              <p className="review-highlight">Exceptional culinary experiences, as told by our clients</p>
            </div>
          </div>
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
                <p>"Piquant exceeded our expectations in every way. The presentation was stunning, the service impeccable, and the food absolutely divine. Our guests are still talking about it months later. Worth every penny for making our special day unforgettable!"</p>
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
                <p>"Working with Piquant for our annual corporate gala was a seamless experience. Their attention to detail and ability to accommodate our specific needs made all the difference. The chef's custom menu perfectly aligned with our company values."</p>
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
                <p>"I hosted my 50th birthday celebration with Piquant catering and it was outstanding! Their team handled everything from setup to cleanup with professionalism. The personalized menu was exactly what I wanted, and my guests were thoroughly impressed."</p>
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
            <a href="#" className="reviews-link">Read More Client Stories</a>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="container">
          <h2 className={contactVisible ? 'animate-section' : ''}>Let's Create Your Perfect Event</h2>
          <p className={`contact-subtitle ${contactVisible ? 'animate-section' : ''}`}>Share your vision with us and take the first step toward an unforgettable culinary experience</p>
          <div className={`contact-content ${contactVisible ? 'animate-section' : ''}`}>
            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone Number" />
                  </div>
                </div>
                <div className="form-group">
                  <select required>
                    <option value="" disabled selected>Type of Event</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Gathering</option>
                    <option value="gala">Gala/Celebration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Tell us about your event vision..." rows={5} required></textarea>
                </div>
                <button type="submit" className="cta-button contact-submit">Start Your Journey</button>
              </form>
              <p className="form-note">Our team will respond within 24 hours to discuss your event details</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
