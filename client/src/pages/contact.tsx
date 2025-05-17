import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock, 
  faUtensils, 
  faCalendarAlt,
  faCheckCircle,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import '../styles/contact.css';

interface FaqItem {
  question: string;
  answer: string;
}

const Contact: React.FC = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  
  // State for animation triggers
  const [formVisible, setFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  
  // Refs for intersection observers
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // Track open FAQ items
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  
  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(item => item !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };
  
  // Setup intersection observers
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const formObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setFormVisible(true);
        formObserver.unobserve(entries[0].target);
      }
    }, options);

    const infoObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setInfoVisible(true);
        infoObserver.unobserve(entries[0].target);
      }
    }, options);

    const faqObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setFaqVisible(true);
        faqObserver.unobserve(entries[0].target);
      }
    }, options);

    if (formRef.current) formObserver.observe(formRef.current);
    if (infoRef.current) infoObserver.observe(infoRef.current);
    if (faqRef.current) faqObserver.observe(faqRef.current);

    return () => {
      if (formRef.current) formObserver.unobserve(formRef.current);
      if (infoRef.current) infoObserver.unobserve(infoRef.current);
      if (faqRef.current) faqObserver.unobserve(faqRef.current);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mldbzwwg', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        console.error('Form submission failed');
        alert('There was an error sending your message. Please try again later.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // FAQ categories and items
  const faqCategories = {
    general: "General Questions",
    dining: "Dining Experience",
    reservations: "Reservations",
    policies: "Policies & Hours"
  };
  
  const faqs: Record<string, FaqItem[]> = {
    general: [
      {
        question: "What type of cuisine does Piquant offer?",
        answer: "Piquant offers contemporary gourmet cuisine with a focus on seasonal ingredients and innovative flavor combinations. Our menu features a fusion of Mediterranean, Asian, and American influences, all prepared with classic French techniques."
      },
      {
        question: "Do you accommodate dietary restrictions?",
        answer: "Yes, we pride ourselves on accommodating all dietary needs including vegetarian, vegan, gluten-free, dairy-free, and specific allergies. Please inform your server about any dietary restrictions, and our chefs will be happy to customize dishes accordingly."
      },
      {
        question: "Is Piquant suitable for special occasions?",
        answer: "Absolutely! Piquant is the perfect setting for anniversaries, birthdays, business dinners, and other special celebrations. We offer personalized menus and can arrange special decorations with advance notice. Please contact us for details on private dining options."
      }
    ],
    dining: [
      {
        question: "What is the dress code at Piquant?",
        answer: "We maintain a smart casual dress code. While formal attire is not required, we do ask that guests refrain from wearing athletic wear, beachwear, or overly casual attire such as flip-flops or tank tops. Collared shirts for gentlemen are appreciated for dinner service."
      },
      {
        question: "Do you have a wine pairing menu?",
        answer: "Yes, our sommelier has carefully curated wine pairings for each course on our tasting menu. We also offer an extensive wine list featuring both old-world classics and exciting new-world discoveries, with options available by the glass or bottle."
      },
      {
        question: "Is there a corkage fee if I bring my own wine?",
        answer: "We do allow guests to bring their own wine with a corkage fee of $35 per bottle. Please note that we cannot accept wines that are already on our wine list, and there is a limit of two bottles per table."
      }
    ],
    reservations: [
      {
        question: "How far in advance should I make a reservation?",
        answer: "For weekday dining, we recommend making reservations 1-2 weeks in advance. For weekend dining or special occasions, particularly during peak seasons, reservations 3-4 weeks in advance are advised. For larger groups, please contact us as soon as possible."
      },
      {
        question: "What is your cancellation policy?",
        answer: "We require 24-hour notice for cancellations or changes to your reservation. Cancellations made with less than 24 hours' notice may be subject to a cancellation fee of $25 per person. No-shows will be charged the full price of our tasting menu per guest."
      },
      {
        question: "Do you accommodate large groups?",
        answer: "Yes, we can accommodate groups of up to 12 people in our main dining room. For parties larger than 12, we offer private dining options. Please contact our events team directly for large group reservations and special arrangements."
      }
    ],
    policies: [
      {
        question: "What are your hours of operation?",
        answer: "We are open Tuesday through Sunday. Lunch is served from 12:00 PM to 2:30 PM, and dinner from 5:30 PM to 10:00 PM. Our bar remains open until 11:30 PM on Friday and Saturday. We are closed on Mondays."
      },
      {
        question: "Is there a time limit for dining?",
        answer: "For à la carte dining, tables are allotted 2 hours. For our tasting menu experience, we allow 3 hours to ensure a relaxed, enjoyable experience. If you require more time, please let us know when making your reservation."
      },
      {
        question: "Do you have parking available?",
        answer: "We offer complimentary valet parking for all dinner guests. For lunch service, street parking is available, or you may use public parking facilities within walking distance. We also offer validation for the garage on 5th Street."
      }
    ]
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1>CONTACT US</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>
      
      {/* Main Contact Section */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-intro">
            <h2>Get in Touch</h2>
            <div className="decorative-line"></div>
            <p>
              Whether you have a question about our menu, hours, or special events,
              we're here to help you with anything you need.
            </p>
          </div>
          
          <div className="contact-content">
            {/* Contact Form */}
            <div className={`contact-form-wrapper ${formVisible ? 'visible' : ''}`} ref={formRef}>
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and we'll get back to you as soon as possible</p>
              </div>
              
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h4>Thank You!</h4>
                  <p>Your message has been sent successfully. We'll be in touch within 48 hours.</p>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit} 
                  className="contact-form"
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                >
                  <div className="form-group">
                    <label htmlFor="name">Your Name <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required 
                      placeholder="Full Name"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address <span className="required">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        placeholder="example@email.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)}
                      required 
                      placeholder="What is your message about?"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Your Message <span className="required">*</span></label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)}
                      required 
                      placeholder="How can we help you?"
                      rows={6}
                    ></textarea>
                  </div>
                  
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="_subject" value="New Message from Contact Page" />
                  
                  <button type="submit" className="submit-button" disabled={submitting}>
                    <FontAwesomeIcon icon={faUtensils} className="button-icon" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            {/* Contact Information */}
            <div className={`contact-info ${infoVisible ? 'visible' : ''}`} ref={infoRef}>
              <div className="info-card">
                <h3>Contact Information</h3>
                <p className="info-intro">We look forward to hearing from you and answering any questions you may have.</p>
                
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className="info-content">
                      <h4>Our Location</h4>
                      <p>123 Culinary Avenue<br />Metropolitan City, ST 12345</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="info-content">
                      <h4>Phone Number</h4>
                      <p>(123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="info-content">
                      <h4>Email Address</h4>
                      <p>info@piquant.com</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="info-content">
                      <h4>Hours of Operation</h4>
                      <p>Tuesday-Sunday: 12pm - 10pm<br />Closed Mondays</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970386!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1652813100933!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Piquant Restaurant Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section" ref={faqRef}>
        <div className="faq-container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <div className="decorative-line"></div>
            <p>Find answers to common questions about dining at Piquant</p>
          </div>
          
          <div className={`faq-content ${faqVisible ? 'visible' : ''}`}>
            <div className="faq-categories">
              {Object.entries(faqCategories).map(([key, label]) => (
                <button 
                  key={key}
                  className={`category-button ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="faq-list">
              {faqs[activeCategory].map((faq, index) => (
                <div className="faq-item" key={index}>
                  <div 
                    className={`faq-question ${openFaqs.includes(index) ? 'open' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <h4>{faq.question}</h4>
                    <span className="faq-icon">
                      <FontAwesomeIcon icon={openFaqs.includes(index) ? faChevronUp : faChevronDown} />
                    </span>
                  </div>
                  <div className={`faq-answer ${openFaqs.includes(index) ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
