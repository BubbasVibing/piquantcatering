import React, { useEffect, useState, useRef, FormEvent } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments,
  faPencilAlt,
  faClipboardCheck,
  faCalendarCheck,
  faStar,
  faUtensils,
  faCalendarAlt,
  faHandshake,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/about.css';
import '../styles/home.css'; // Import home.css for modal styles

// CountUp component for animated statistics
interface CountUpProps {
  end: number;
  duration?: number;
  startOnVisible?: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, startOnVisible = true }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(!startOnVisible);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number | null = null;
    let animationFrameId: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        const nextCount = Math.min(Math.floor((progress / duration) * end), end);
        setCount(nextCount);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, hasStarted]);
  
  useEffect(() => {
    if (!startOnVisible) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [startOnVisible]);
  
  return <div ref={ref}>{count}</div>;
};

const About: React.FC = () => {
  const [passionVisible, setPassionVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Modal and form states
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const passionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  
  // Open the modal
  const openModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    // Reset form state after animation completes
    setTimeout(() => {
      setFormSubmitted(false);
    }, 300);
  };
  
  // Close modal if clicking outside the content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  // Handle form submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
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
        setFormSubmitted(true);
        form.reset();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  useEffect(() => {
    // Observer for section animations
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Check which section is visible
            const target = entry.target;
            if (target === passionRef.current) {
              setPassionVisible(true);
            } else if (target === missionRef.current) {
              setMissionVisible(true);
            } else if (target === processRef.current) {
              setProcessVisible(true);
            } else if (target === ctaRef.current) {
              setCtaVisible(true);
            }
            
            // Unobserve after animation triggered
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Set up all observers
    if (passionRef.current) {
      sectionObserver.observe(passionRef.current);
    }
    
    if (missionRef.current) {
      sectionObserver.observe(missionRef.current);
    }
    
    if (processRef.current) {
      sectionObserver.observe(processRef.current);
    }
    
    if (ctaRef.current) {
      sectionObserver.observe(ctaRef.current);
    }
    
    return () => {
      // Cleanup all observers
      if (passionRef.current) {
        sectionObserver.unobserve(passionRef.current);
      }
      
      if (missionRef.current) {
        sectionObserver.unobserve(missionRef.current);
      }
      
      if (processRef.current) {
        sectionObserver.unobserve(processRef.current);
      }
      
      if (ctaRef.current) {
        sectionObserver.unobserve(ctaRef.current);
      }
      
      // Clean up modal overflow state
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>ABOUT US</h1>
          <p>The culinary expertise behind your unforgettable moments</p>
        </div>
      </section>
      
      {/* Our Story Section - Two-Column Layout */}
      <section className="story-section" ref={passionRef}>
        <div className="container">
          <div className={`story-content ${passionVisible ? 'animate-section' : ''}`}>
            <div className="story-text">
              <h2>Our Passion</h2>
              <div className="decorative-line"></div>
              <p>
                At Piquant, our passion for <span className="highlight">culinary excellence</span> drives everything we do. 
                Each dish is crafted with extraordinary attention to detail and 
                executed with precision by our team of dedicated chefs.
              </p>
              <p>
                We believe that food is more than sustenance—it's an art form that brings people together. 
                Our team delivers high-quality meals that <span className="highlight">elevate every occasion</span> and 
                create unforgettable experiences for our clients and their guests.
              </p>
            </div>
            <div className="story-image parallax-effect">
              <img src="/assets/platingfoodcarefully.jpg" alt="Chef carefully plating a gourmet dish" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section - Modern Elegant Layout */}
      <section className="mission-section" ref={missionRef}>
        <div className="mission-badge">OUR MISSION</div>
        <div className="mission-image">
          <img src="/assets/tableset.png" alt="Elegantly set event table" />
        </div>
        <div className="mission-content-wrapper">
          <div className={`mission-content ${missionVisible ? 'animate-section' : ''}`}>
            <style>
              {`
                .no-after-element::after {
                  display: none !important;
                }
              `}
            </style>
            <h2 className="no-after-element">Crafting Culinary Memories</h2>
            <div className="mission-divider" style={{ display: 'block', width: '180px', margin: '-20px auto 25px' }}>
              <svg width="180" height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6H70" stroke="#F4C38B" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="90" cy="6" r="5" fill="#F4C38B"/>
                <path d="M110 6H179" stroke="#F4C38B" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="mission-columns">
              <div className="mission-column">
                <p>
                  Our mission is to transform special moments into extraordinary memories through exceptional 
                  culinary experiences. We create cuisine that reflects our clients' 
                  vision while exceeding their expectations in flavor, presentation, and service.
                </p>
              </div>
              <div className="mission-column">
                <p>
                  We are committed to fostering connections through food, celebrating cultural diversity, 
                  and honoring culinary traditions while embracing innovation. We aim to be the cornerstone 
                  of memorable celebrations where food brings people together.
                </p>
              </div>
            </div>
            <div className="mission-stats">
              <div className="stat-item">
                <div className="stat-number">
                  {missionVisible && <CountUp end={1000} duration={2500} />}<span>+</span>
                </div>
                <div className="stat-label">Events Catered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {missionVisible && <CountUp end={15} duration={1500} />}<span>+</span>
                </div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {missionVisible && <CountUp end={98} duration={2000} />}<span>%</span>
                </div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Culinary Process Section - Clean Implementation */}
      <section className="culinary-process-section">
        <div className="culinary-process-container">
          <h2 className="culinary-process-title no-after-element">Our Culinary Process</h2>
          <div className="mission-divider" style={{ display: 'block', width: '180px', margin: '-50px auto 25px' }}>
            <svg width="180" height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6H70" stroke="#F4C38B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="90" cy="6" r="5" fill="#F4C38B"/>
              <path d="M110 6H179" stroke="#F4C38B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          
          <div className="culinary-process-steps">
            {/* Line connecting all steps */}
            <div className="culinary-process-line"></div>
            
            {/* Step 1 */}
            <div className="culinary-process-step">
              <div className="culinary-process-icon">
                <FontAwesomeIcon icon={faComments} />
              </div>
              <h3>Consultation</h3>
              <p>We begin by understanding your vision, preferences, and event requirements through a personalized consultation.</p>
            </div>
            
            {/* Step 2 */}
            <div className="culinary-process-step">
              <div className="culinary-process-icon">
                <FontAwesomeIcon icon={faPencilAlt} />
              </div>
              <h3>Menu Customization</h3>
              <p>Our chefs craft a custom menu tailored to your event's unique needs, incorporating your preferences and dietary requirements.</p>
            </div>
            
            {/* Step 3 */}
            <div className="culinary-process-step">
              <div className="culinary-process-icon">
                <FontAwesomeIcon icon={faClipboardCheck} />
              </div>
              <h3>Tasting</h3>
              <p>Experience our creations firsthand during a complimentary tasting session, allowing for refinements to ensure perfection.</p>
            </div>
            
            {/* Step 4 */}
            <div className="culinary-process-step">
              <div className="culinary-process-icon">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </div>
              <h3>Event Day</h3>
              <p>Our team delivers flawless execution with exceptional service, presentation, and culinary excellence on your special day.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section - Fullwidth Design */}
      <section className="about-cta-section" ref={ctaRef}>
        <div className={`cta-content ${ctaVisible ? 'animate-section' : ''}`}>
          <div className="cta-icons">
            <div className="cta-icon-wrapper">
              <FontAwesomeIcon icon={faUtensils} className="icon" />
            </div>
            <div className="cta-icon-wrapper">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            </div>
            <div className="cta-icon-wrapper">
              <FontAwesomeIcon icon={faHandshake} className="icon" />
            </div>
          </div>
          <h2>Begin Your Culinary Journey With Us</h2>
          <p>
            Whether you're planning a wedding, corporate event, or intimate gathering, our team is ready 
            to create a memorable culinary experience tailored to your vision.
          </p>
          <a 
            href="#" 
            id="about-cta-button" 
            className="about-contact-button"
            onClick={openModal}
            style={{
              backgroundColor: isButtonHovered ? '#572a47' : '#471f3a', 
              color: '#ffffff',
              border: `2px solid ${isButtonHovered ? '#572a47' : '#471f3a'}`,
              display: 'inline-block',
              padding: '20px 50px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.3rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              transition: 'all 0.4s ease',
              boxShadow: isButtonHovered 
                ? '0 12px 28px rgba(0, 0, 0, 0.2)'
                : '0 6px 20px rgba(0, 0, 0, 0.15)',
              transform: isButtonHovered ? 'translateY(-8px)' : 'none',
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Contact Us Today
          </a>
        </div>
      </section>
      
      {/* Consultation Modal */}
      <div 
        className={`modal-overlay ${modalOpen ? 'active' : ''}`} 
        onClick={handleOverlayClick}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{formSubmitted ? 'Thank You!' : 'Begin Your Culinary Journey'}</h3>
            <p className="modal-subtitle">
              {formSubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : 'Tell us about your event vision'}
            </p>
            <button className="modal-close" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {formSubmitted ? (
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
                  id="inquiry-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={handleFormSubmit}
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
                  <input type="hidden" name="_subject" value="New Consultation Request (About Page)" />
                </form>
              </div>
              <div className="modal-footer">
                <p className="form-privacy">Your information is secure and will never be shared with third parties. You will be contacted within 48 hours.</p>
                <button 
                  type="submit" 
                  form="inquiry-form" 
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
