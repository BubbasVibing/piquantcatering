import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWineGlassAlt, 
  faBirthdayCake, 
  faUserGraduate, 
  faRing, 
  faBuilding, 
  faUtensils,
  faCalendarCheck,
  faHeart,
  faUsers,
  faCheck,
  faQuoteLeft,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGoogle 
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/eventscatering.css';
import '../styles/home.css'; // Import home.css for modal styles

interface EventType {
  id: string;
  title: string;
  description: string;
  icon: any;
  image: string;
  features: string[];
}

const EventsCatering: React.FC = () => {
  const [activeTab, setActiveTab] = useState('weddings');
  const [servicesVisible, setServicesVisible] = useState(false);
  const [eventsVisible, setEventsVisible] = useState(false);
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  
  // Modal states
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  
  // Form submission states
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === servicesRef.current) {
              setServicesVisible(true);
            } else if (entry.target === eventsRef.current) {
              setEventsVisible(true);
            } else if (entry.target === testimonialRef.current) {
              setTestimonialVisible(true);
              console.log('Testimonial section is now visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    if (servicesRef.current) observer.observe(servicesRef.current);
    if (eventsRef.current) observer.observe(eventsRef.current);
    if (testimonialRef.current) observer.observe(testimonialRef.current);

    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (eventsRef.current) observer.unobserve(eventsRef.current);
      if (testimonialRef.current) observer.unobserve(testimonialRef.current);
      
      // Clean up modal overflow state
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Modal open/close handlers
  const openModal = (modalType: string) => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    
    switch(modalType) {
      case 'quote':
        setQuoteModalOpen(true);
        break;
      case 'inquiry':
        setInquiryModalOpen(true);
        break;
      case 'info':
        setInfoModalOpen(true);
        break;
    }
  };
  
  const closeModal = (modalType: string) => {
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    
    switch(modalType) {
      case 'quote':
        setQuoteModalOpen(false);
        // Reset form after animation completes
        setTimeout(() => setQuoteSubmitted(false), 300);
        break;
      case 'inquiry':
        setInquiryModalOpen(false);
        setTimeout(() => setInquirySubmitted(false), 300);
        break;
      case 'info':
        setInfoModalOpen(false);
        setTimeout(() => setInfoSubmitted(false), 300);
        break;
    }
  };
  
  // Close modal if clicking outside the content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>, modalType: string) => {
    if (e.target === e.currentTarget) {
      closeModal(modalType);
    }
  };
  
  // Handle form submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>, modalType: string) => {
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
        switch(modalType) {
          case 'quote':
            setQuoteSubmitted(true);
            break;
          case 'inquiry':
            setInquirySubmitted(true);
            break;
          case 'info':
            setInfoSubmitted(true);
            break;
        }
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

  const eventTypes: EventType[] = [
    {
      id: 'weddings',
      title: 'Weddings',
      description: 'Your special day deserves exceptional cuisine. Our wedding catering services offer customized menus, elegant presentation, and flawless service to create a memorable culinary experience for you and your guests.',
      icon: faRing,
      image: '/assets/weddingcateringpicture.jpg',
      features: [
        'Customized wedding menus tailored to your preferences',
        'Pre-wedding tastings to perfect your menu selection',
        'Full service staff including servers and bartenders',
        'Beautiful food displays and elegant presentation',
        'Special attention to dietary restrictions and preferences',
        'Coordination with your venue and other vendors'
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      description: 'Impress your clients and colleagues with premium catering for your corporate gatherings. From breakfast meetings and lunch conferences to grand galas, we provide professional service and exceptional food.',
      icon: faBuilding,
      image: '/assets/corporatecatering.jpg',
      features: [
        'Efficient service for time-sensitive corporate schedules',
        'Custom branded presentations available',
        'Breakfast, lunch, dinner and reception options',
        'Drop-off service for casual meetings',
        'Full service catering for formal corporate events',
        'Diverse menu options to please all attendees'
      ]
    },
    {
      id: 'birthdays',
      title: 'Birthday Parties',
      description: 'Celebrate your birthday with delicious food that will delight your guests. From casual backyard gatherings to milestone celebrations, we craft menus that match your party\'s theme and atmosphere.',
      icon: faBirthdayCake,
      image: '/assets/birthdaycatering.jpg',
      features: [
        'Fun and creative menu options for all ages',
        'Custom birthday cakes and dessert displays',
        'Theme-based food presentations',
        'Kid-friendly menu options',
        'Casual buffets or elegant plated service',
        'Special celebration packages available'
      ]
    },
    {
      id: 'graduations',
      title: 'Graduations',
      description: 'Celebrate this important milestone with delicious food that brings everyone together. Our graduation catering packages are designed to make your celebration stress-free and memorable.',
      icon: faUserGraduate,
      image: '/assets/graduationcatering.jpg',
      features: [
        'Flexible service styles to accommodate any venue',
        'Options for all budget levels',
        'School colors and themed presentations',
        'Crowd-pleasing menu selections',
        'Easy self-service buffets or full service options',
        'Accommodations for large groups'
      ]
    },
    {
      id: 'social',
      title: 'Social Gatherings',
      description: 'From family reunions to holiday parties, our catering services bring people together through amazing food. Let us handle the culinary details while you focus on making memories with your loved ones.',
      icon: faUsers,
      image: '/assets/socialgatheringcatering.jpg',
      features: [
        'Diverse menu options for varied guest preferences',
        'Family-style, buffet, or plated service options',
        'Seasonal and holiday-themed menus',
        'Casual to upscale service levels available',
        'Flexible setup options for any venue',
        'Personalized service to match your event\'s style'
      ]
    }
  ];

  const selectedEvent = eventTypes.find(event => event.id === activeTab) || eventTypes[0];

  const testimonials = [
    {
      name: "Emily & Michael Johnson",
      event: "Wedding Reception",
      quote: "Piquant exceeded our expectations in every way. The food was absolutely divine - from the passed hors d'oeuvres to the plated main course. The flavors were extraordinary and the presentation stunning. Our guests are still raving about the meal months later!",
      date: "June 2023",
      source: "Google",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "James Wilson",
      event: "Annual Company Gala",
      quote: "The team at Piquant made our corporate event seamless. The food stations at our gala were a highlight of the evening. The chef's custom menu featured innovative pairings and artful presentation that impressed even our most discerning executives.",
      date: "November 2023",
      source: "Trustpilot",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Thompson",
      event: "Graduation Celebration",
      quote: "My daughter's graduation party was perfect thanks to Piquant's amazing food and service. The tasting menu they created was exceptional - beautifully presented and bursting with flavor. The chef's attention to dietary preferences was impressive!",
      date: "September 2023", 
      source: "Yelp",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="events-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="events-hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">EVENT CATERING</h1>
          <p className="hero-subtitle">Exceptional catering services for every special occasion</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="events-intro-section">
        <div className="container">
          <div className="section-header">
            <h2>Elevate Your Event With Exquisite Catering</h2>
            <div className="decorative-line"></div>
            <p>From intimate gatherings to grand celebrations, Piquant delivers unforgettable culinary experiences that will delight your guests and make your event truly special.</p>
          </div>
          
          <div className="intro-content">
            <div className="intro-image">
              <img src="/assets/bespokecateringservice.jpg" alt="Elegant catering setup" />
            </div>
            <div className="intro-text">
              <h3>Bespoke Catering Services</h3>
              <p>At Piquant, we understand that every event is unique. Our team works closely with you to create customized menus that reflect your personal style, preferences, and event theme. From weddings and corporate functions to birthday celebrations and graduation parties, we bring creativity, quality, and exceptional service to every catering experience.</p>
              <p>Our commitment to using the freshest ingredients and authentic culinary techniques ensures that your guests will enjoy a memorable dining experience that complements your special occasion perfectly.</p>
              <button 
                className="intro-button" 
                onClick={() => openModal('quote')}
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2 id="catering-services-title">Our Catering Services</h2>
            <div className="decorative-line"></div>
            <p>Discover our comprehensive range of catering options designed to meet your event needs</p>
          </div>
          
          <div className={`services-grid ${servicesVisible ? 'animate-section' : ''}`}>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faUtensils} />
              </div>
              <h3>Full-Service Catering</h3>
              <p>Comprehensive catering with professional staff, elegant presentation, and complete setup and cleanup.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>Food Stations & Buffets</h3>
              <p>Interactive food stations and elegant buffet displays with a variety of culinary options for your guests.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h3>Custom Menu Design</h3>
              <p>Personalized menus crafted to match your event theme, dietary needs, and personal preferences.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </div>
              <h3>Event Planning</h3>
              <p>Coordination with venues and vendors to ensure a seamless and stress-free event experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="event-types-section" ref={eventsRef}>
        <div className="container">
          <div className="section-header">
            <h2>Events We Cater</h2>
            <div className="decorative-line"></div>
            <p>From elegant weddings to corporate functions, we provide exceptional catering for all types of events</p>
          </div>
          
          <div className="event-tabs">
            {eventTypes.map(event => (
              <button 
                key={event.id}
                className={`event-tab ${activeTab === event.id ? 'active' : ''}`}
                onClick={() => setActiveTab(event.id)}
              >
                <FontAwesomeIcon icon={event.icon} />
                <span>{event.title}</span>
              </button>
            ))}
          </div>
          
          <div className={`event-content ${eventsVisible ? 'animate-section' : ''}`}>
            <div className="event-image">
              <img src={selectedEvent.image} alt={`${selectedEvent.title} catering`} />
            </div>
            <div className="event-details">
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <div className="event-features">
                {selectedEvent.features.map((feature, index) => (
                  <div className="feature-item" key={index}>
                    <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="event-button-container">
                <button 
                  className="event-button"
                  onClick={() => openModal('inquiry')}
                >
                  Inquire About {selectedEvent.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" ref={testimonialRef}>
        <div className="container">
          <div className="section-header testimonials-header">
            <h2>Rave Reviews</h2>
            <div className="decorative-line"></div>
          </div>
          <h3 className={`review-highlight ${testimonialVisible ? 'animate-section' : ''}`}>Guests consistently praise our flavor-forward cuisine and impeccable presentation</h3>
          <div className={`testimonials-grid ${testimonialVisible ? 'animate-section' : ''}`}>
            {testimonials.map((testimonial, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <div className="reviewer-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="reviewer-info">
                    <h4>{testimonial.name}</h4>
                    <p className="review-event">{testimonial.event}</p>
                  </div>
                </div>
                <div className="review-content">
                  <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                  <p>{testimonial.quote}</p>
                </div>
                <div className="review-footer">
                  <div className="review-date">{testimonial.date}</div>
                  <div className="review-source">
                    {testimonial.source === "Google" ? (
                      <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                    ) : testimonial.source === "Trustpilot" ? (
                      <div className="trustpilot-text">Trustpilot</div>
                    ) : (
                      <div className="yelp-text">Yelp</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`see-all-reviews ${testimonialVisible ? 'animate-section' : ''}`}>
            <Link to="/reviews" className="reviews-link">Read More Client Stories</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="events-contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-text">
              <h2 className="text-center">Let's Plan Your Event</h2>
              <div className="decorative-line" style={{ margin: '0 auto 25px' }}></div>
              <p className="text-center">Ready to discuss your catering needs? Our event specialists are here to help you create a memorable experience for your guests.</p>
              <div className="contact-info-container">
                <div className="contact-item">
                  <strong>Phone:</strong> (123) 456-7890
                </div>
                <div className="contact-item">
                  <strong>Email:</strong> events@piquant.com
                </div>
                <div className="contact-item">
                  <strong>Hours:</strong> Monday-Friday, 9am-5pm
                </div>
              </div>
              <div className="contact-button-container">
                <button 
                  className="contact-button"
                  onClick={() => openModal('info')}
                >
                  Request Information
                </button>
              </div>
            </div>
            <div className="contact-image">
              <img src="/assets/planningcateringevent.jpg" alt="Event planning consultation" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Request Modal */}
      <div 
        className={`modal-overlay ${quoteModalOpen ? 'active' : ''}`} 
        onClick={(e) => handleOverlayClick(e, 'quote')}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{quoteSubmitted ? 'Thank You!' : 'Request a Quote'}</h3>
            <p className="modal-subtitle">
              {quoteSubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : 'Tell us about your event to receive a customized quote'}
            </p>
            <button className="modal-close" onClick={() => closeModal('quote')}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {quoteSubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for your interest in Piquant catering services. 
                Our team will prepare a customized quote and contact you within 48 hours.
              </p>
              <button onClick={() => closeModal('quote')} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-body">
                <form 
                  id="quote-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={(e) => handleFormSubmit(e, 'quote')}
                >
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-group">
                      <input type="tel" name="phone" placeholder="Phone Number" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <select name="event_type" required>
                      <option value="" disabled selected>Type of Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="graduation">Graduation</option>
                      <option value="social">Social Gathering</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="number" name="guest_count" placeholder="Estimated Guest Count" min="12" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="event_date" placeholder="Event Date (MM/DD/YYYY)" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" name="event_location" placeholder="Event Location/Venue" />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Tell us more about your event and catering needs..." rows={3} required></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="_subject" value="Quote Request (Events Page)" />
                </form>
              </div>
              <div className="modal-footer">
                <p className="form-privacy">Your information is secure and will never be shared with third parties. You will be contacted within 48 hours.</p>
                <button 
                  type="submit" 
                  form="quote-form" 
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Request Quote'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Event Inquiry Modal */}
      <div 
        className={`modal-overlay ${inquiryModalOpen ? 'active' : ''}`} 
        onClick={(e) => handleOverlayClick(e, 'inquiry')}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{inquirySubmitted ? 'Thank You!' : `${selectedEvent.title} Catering Inquiry`}</h3>
            <p className="modal-subtitle">
              {inquirySubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : `Tell us about your ${selectedEvent.title.toLowerCase()} to get started`}
            </p>
            <button className="modal-close" onClick={() => closeModal('inquiry')}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {inquirySubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for your interest in our {selectedEvent.title} catering services. 
                Our event specialists will contact you within 48 hours to discuss your event details.
              </p>
              <button onClick={() => closeModal('inquiry')} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
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
                  onSubmit={(e) => handleFormSubmit(e, 'inquiry')}
                >
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-group">
                      <input type="tel" name="phone" placeholder="Phone Number" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="number" name="guest_count" placeholder="Estimated Guest Count" min="12" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="event_date" placeholder="Event Date (MM/DD/YYYY)" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" name="event_location" placeholder="Event Location/Venue" />
                  </div>
                  <div className="form-group">
                    <select name="catering_style" required>
                      <option value="" disabled selected>Preferred Catering Style</option>
                      <option value="buffet">Buffet</option>
                      <option value="plated">Plated Service</option>
                      <option value="stations">Food Stations</option>
                      <option value="family">Family Style</option>
                      <option value="cocktail">Cocktail Reception</option>
                      <option value="undecided">Undecided</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Tell us more about your vision for this event..." rows={3} required></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="event_type" value={selectedEvent.title} />
                  <input type="hidden" name="_subject" value={`${selectedEvent.title} Catering Inquiry`} />
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
      
      {/* Information Request Modal */}
      <div 
        className={`modal-overlay ${infoModalOpen ? 'active' : ''}`} 
        onClick={(e) => handleOverlayClick(e, 'info')}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{infoSubmitted ? 'Thank You!' : 'Request Information'}</h3>
            <p className="modal-subtitle">
              {infoSubmitted 
                ? 'We have received your request and will contact you within 48 hours.' 
                : 'How can we help with your upcoming event?'}
            </p>
            <button className="modal-close" onClick={() => closeModal('info')}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {infoSubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for contacting Piquant. 
                One of our event specialists will reach out to you within 48 hours with the information you requested.
              </p>
              <button onClick={() => closeModal('info')} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-body">
                <form 
                  id="info-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={(e) => handleFormSubmit(e, 'info')}
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
                    <select name="information_needed" required>
                      <option value="" disabled selected>Information Needed</option>
                      <option value="pricing">General Pricing</option>
                      <option value="services">Available Services</option>
                      <option value="menu_options">Menu Options</option>
                      <option value="availability">Date Availability</option>
                      <option value="packages">Catering Packages</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select name="preferred_contact" required>
                      <option value="" disabled selected>Preferred Contact Method</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="either">Either</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Please provide any specific questions or information you'd like to know..." rows={4} required></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="_subject" value="Information Request (Events Page)" />
                </form>
              </div>
              <div className="modal-footer">
                <p className="form-privacy">Your information is secure and will never be shared with third parties. You will be contacted within 48 hours.</p>
                <button 
                  type="submit" 
                  form="info-form" 
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
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

export default EventsCatering;
