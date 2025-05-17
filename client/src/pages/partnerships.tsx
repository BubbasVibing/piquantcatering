import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUtensils, 
  faCalendarAlt, 
  faUserFriends, 
  faBuilding, 
  faGraduationCap, 
  faHandshake, 
  faBoxOpen, 
  faTruck, 
  faLeaf, 
  faHeartbeat,
  faChartLine,
  faCheckCircle,
  faSeedling,
  faRecycle,
  faMedal,
  faClipboardCheck,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import '../styles/partnerships.css';

const Partnerships: React.FC = () => {
  // States for animation triggers
  const [heroVisible, setHeroVisible] = useState(true);
  const [overviewVisible, setOverviewVisible] = useState(false);
  const [mealBoxVisible, setMealBoxVisible] = useState(false);
  const [solutionsVisible, setSolutionsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  
  // Form submission states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  
  // Refs for scroll observations
  const overviewRef = useRef<HTMLDivElement>(null);
  const mealBoxRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Setup intersection observers for animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const createObserver = (
      ref: React.RefObject<HTMLElement>, 
      setVisible: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      if (!ref.current) return null;
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.unobserve(entries[0].target);
        }
      }, options);
      
      observer.observe(ref.current);
      return observer;
    };
    
    const observers = [
      overviewRef.current && createObserver(overviewRef as React.RefObject<HTMLElement>, setOverviewVisible),
      mealBoxRef.current && createObserver(mealBoxRef as React.RefObject<HTMLElement>, setMealBoxVisible),
      solutionsRef.current && createObserver(solutionsRef as React.RefObject<HTMLElement>, setSolutionsVisible),
      contactRef.current && createObserver(contactRef as React.RefObject<HTMLElement>, setContactVisible)
    ].filter(Boolean);
    
    // Cleanup all observers
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);
  
  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        alert('There was an error submitting the form. Please try again later.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Partnership types data
  const partnershipTypes = [
    {
      icon: faBoxOpen,
      title: "Event Meal Boxes",
      description: "Premium meal boxes for corporate events, conferences, and social gatherings. Customized to match your brand and theme."
    },
    {
      icon: faBuilding,
      title: "Corporate Programs",
      description: "Ongoing food services for offices including daily lunches, cafeteria management, and executive dining solutions."
    },
    {
      icon: faGraduationCap,
      title: "Educational Institutions",
      description: "Nutritious meal programs for schools, universities, and educational facilities with focus on balanced options."
    },
    {
      icon: faTruck,
      title: "Food Service Management",
      description: "Comprehensive management of your organization's food service operations with our culinary expertise."
    }
  ];
  
  // Meal box benefits data
  const mealBoxBenefits = [
    {
      icon: faCalendarAlt,
      title: "Perfect for Events",
      description: "Customized meal boxes designed specifically for your corporate events, conferences, and team gatherings."
    },
    {
      icon: faLeaf,
      title: "Locally Sourced",
      description: "Fresh ingredients from local farms and producers, supporting the community while reducing our carbon footprint."
    },
    {
      icon: faHeartbeat,
      title: "Dietary Inclusive",
      description: "Comprehensive options for all dietary needs including vegetarian, vegan, gluten-free, and allergen-conscious meals."
    },
    {
      icon: faBoxOpen,
      title: "Elegant Presentation",
      description: "Beautiful packaging that reflects your brand and creates a memorable dining experience for recipients."
    }
  ];
  
  // Sustainable practices data
  const sustainablePractices = [
    {
      icon: faSeedling,
      title: "Seasonal Menus",
      description: "Our rotating seasonal menus maximize freshness and flavor while reducing environmental impact."
    },
    {
      icon: faRecycle,
      title: "Eco-Friendly Packaging",
      description: "We use biodegradable, compostable, and recyclable packaging materials for all our meal solutions."
    }
  ];
  
  return (
    <div className="partnerships-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className={`partnerships-hero ${heroVisible ? 'visible' : ''}`}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>FOOD PARTNERSHIPS</h1>
          <div className="decorative-line"></div>
          <p>Exceptional culinary solutions for businesses, institutions and events</p>
        </div>
      </section>
      
      {/* Overview Section */}
      <section 
        ref={overviewRef} 
        className={`overview-section ${overviewVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2>Partnership Solutions</h2>
            <div className="decorative-line"></div>
            <p>
              At Piquant, we believe that exceptional food should be accessible beyond just restaurant 
              walls. Our partnerships program brings our culinary expertise to organizations through 
              customized food solutions that reflect your values and meet your specific needs.
            </p>
          </div>
          
          <div className="partnership-types">
            {partnershipTypes.map((type, index) => (
              <div className="partnership-type-item" key={index}>
                <div className="type-icon">
                  <FontAwesomeIcon icon={type.icon} />
                </div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>
          
          <div className="overview-image-row">
            <div className="overview-image">
              <img src="/assets/corporatecatering.jpg" alt="Corporate dining setup" />
            </div>
            <div className="overview-image">
              <img src="/assets/socialgatheringcatering.jpg" alt="Event catering display" />
            </div>
            <div className="overview-image">
              <img src="/assets/planningcateringevent.jpg" alt="Catering planning" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Meal Box Section */}
      <section 
        ref={mealBoxRef} 
        className={`meal-box-section ${mealBoxVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2>Event Meal Boxes</h2>
            <div className="decorative-line"></div>
            <p>Chef-crafted meal experiences delivered to your event</p>
          </div>
          
          <div className="meal-box-content">
            <div className="meal-box-image">
              <img src="/assets/packedmealsforthe.png" alt="Premium meal box with elegantly arranged food" />
            </div>
            
            <div className="meal-box-text">
              <h3>Elevate Your Event Experience</h3>
              <p>
                Our premium meal boxes transform ordinary events into extraordinary culinary experiences. 
                Each box is meticulously crafted by our chefs to ensure exceptional quality, presentation, 
                and flavor, whether for corporate meetings, conferences, team-building events, or social 
                gatherings.
              </p>
              <p>
                Every meal box can be customized to reflect your brand and event theme, creating a 
                cohesive experience that impresses attendees and supports your event objectives. From 
                elegant boardroom lunches to large-scale conference catering, our meal boxes provide a 
                refined dining solution with consistent quality and thoughtful presentation.
              </p>
            </div>
          </div>
          
          <div className="benefits-grid">
            {mealBoxBenefits.map((benefit, index) => (
              <div className="benefit-card" key={index}>
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <div className="meal-gallery">
            <div className="gallery-item">
              <img src="/assets/burgerfries.png" alt="Corporate boxed lunch" />
              <div className="gallery-caption">Corporate Meetings</div>
            </div>
            <div className="gallery-item">
              <img src="/assets/hummusmeal.jpg" alt="Event catering spread" />
              <div className="gallery-caption">Special Events</div>
            </div>
            <div className="gallery-item">
              <img src="/assets/morepackedmeals.jpg" alt="Team building meal session" />
              <div className="gallery-caption">Team Building</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Food Solutions Section */}
      <section 
        ref={solutionsRef} 
        className={`food-solutions-section ${solutionsVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2>Long-Term Food Solutions</h2>
            <div className="decorative-line"></div>
            <p>Tailored culinary programs for organizations and institutions</p>
          </div>
          
          <div className="solutions-intro">
            <div className="solutions-text-box">
              <h3>Comprehensive Food Partnerships</h3>
              <p>
                Piquant partners with forward-thinking organizations to provide ongoing culinary 
                solutions that enhance workplace culture, support educational missions, and create 
                memorable experiences. Our approach goes beyond simply providing food—we develop 
                sustainable programs that align with your organizational values.
              </p>
            </div>
            
            <div className="solutions-image-box">
              <img src="/assets/chefmakingfood.jpg" alt="Chef preparing corporate meals" />
            </div>
          </div>
          
          <div className="solutions-features">
            <div className="solutions-institutions">
              <h3>Who We Serve</h3>
              <div className="institutions-grid">
                <div className="institution-item">
                  <div className="institution-icon">
                    <FontAwesomeIcon icon={faBuilding} />
                  </div>
                  <h4>Corporate Offices</h4>
                  <p>Daily meal services, executive dining, and cafeteria management</p>
                </div>
                <div className="institution-item">
                  <div className="institution-icon">
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </div>
                  <h4>Educational Institutions</h4>
                  <p>Nutritious meal programs for schools and universities</p>
                </div>
                <div className="institution-item">
                  <div className="institution-icon">
                    <FontAwesomeIcon icon={faUserFriends} />
                  </div>
                  <h4>Organizations</h4>
                  <p>Customized food programs for non-profits and community groups</p>
                </div>
              </div>
            </div>
            
            <div className="sustainable-practices">
              <h3>Our Commitment to Sustainability</h3>
              <div className="practices-content">
                {sustainablePractices.map((practice, index) => (
                  <div className="practice-item" key={index}>
                    <div className="practice-icon">
                      <FontAwesomeIcon icon={practice.icon} />
                    </div>
                    <div className="practice-text">
                      <h5>{practice.title}</h5>
                      <p>{practice.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section 
        ref={contactRef} 
        className={`contact-form-section ${contactVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2>Our Partnership Process</h2>
            <div className="decorative-line"></div>
            <p>How we develop and implement your custom food program</p>
          </div>
          
          <div className="partnership-form-container">
            {formSubmitted ? (
              <div className="form-success">
                <h3>Thank You!</h3>
                <p>Your inquiry has been submitted. Our team will contact you within 48 hours.</p>
                <button 
                  className="form-submit-btn" 
                  onClick={() => setFormSubmitted(false)}
                  style={{ width: 'auto', margin: '20px auto 0', display: 'block' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form 
                className="partnership-form" 
                action="https://formspree.io/f/mldbzwwg" 
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    placeholder="Your organization name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your partnership needs"
                    rows={4}
                    required
                  ></textarea>
                </div>
                
                <input type="hidden" name="_subject" value="Partnership Inquiry" />
                <div className="form-group" style={{ display: 'none' }}>
                  <input type="text" name="_gotcha" />
                </div>
                
                <button 
                  type="submit" 
                  className="form-submit-btn"
                  disabled={submitting}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Partnerships;
