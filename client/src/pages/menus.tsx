import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUtensils, 
  faBirthdayCake, 
  faBriefcase, 
  faUserTie, 
  faUsers,
  faDrumstickBite,
  faTimes,
  faCalendarAlt,
  faListAlt,
  faClock,
  faMapMarkerAlt,
  faDownload,
  faExpand
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/menus.css';
import '../styles/home.css'; // Import home.css for modal styles

interface MenuCategory {
  id: string;
  name: string;
  icon?: any;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  popular?: boolean;
}

const Menus: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuVisible, setMenuVisible] = useState(false);
  const [packageVisible, setPackageVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | 'pdf'>('pdf');
  
  // Modal states for each package and the custom menu
  const [essentialModalOpen, setEssentialModalOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [luxuryModalOpen, setLuxuryModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  
  // Form submission states
  const [essentialSubmitted, setEssentialSubmitted] = useState(false);
  const [premiumSubmitted, setPremiumSubmitted] = useState(false);
  const [luxurySubmitted, setLuxurySubmitted] = useState(false);
  const [customSubmitted, setCustomSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);

  // Animation on scroll
  useEffect(() => {
    const menuObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === menuRef.current) {
              setMenuVisible(true);
            } else if (entry.target === packageRef.current) {
              setPackageVisible(true);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (menuRef.current) {
      menuObserver.observe(menuRef.current);
    }
    if (packageRef.current) {
      menuObserver.observe(packageRef.current);
    }

    return () => {
      if (menuRef.current) {
        menuObserver.unobserve(menuRef.current);
      }
      if (packageRef.current) {
        menuObserver.unobserve(packageRef.current);
      }
      
      // Clean up modal overflow state
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Modal open/close handlers
  const openModal = (modalType: string) => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    
    switch(modalType) {
      case 'essential':
        setEssentialModalOpen(true);
        break;
      case 'premium':
        setPremiumModalOpen(true);
        break;
      case 'luxury':
        setLuxuryModalOpen(true);
        break;
      case 'custom':
        setCustomModalOpen(true);
        break;
    }
  };
  
  const closeModal = (modalType: string) => {
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    
    switch(modalType) {
      case 'essential':
        setEssentialModalOpen(false);
        // Reset form after animation completes
        setTimeout(() => setEssentialSubmitted(false), 300);
        break;
      case 'premium':
        setPremiumModalOpen(false);
        setTimeout(() => setPremiumSubmitted(false), 300);
        break;
      case 'luxury':
        setLuxuryModalOpen(false);
        setTimeout(() => setLuxurySubmitted(false), 300);
        break;
      case 'custom':
        setCustomModalOpen(false);
        setTimeout(() => setCustomSubmitted(false), 300);
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
          case 'essential':
            setEssentialSubmitted(true);
            break;
          case 'premium':
            setPremiumSubmitted(true);
            break;
          case 'luxury':
            setLuxurySubmitted(true);
            break;
          case 'custom':
            setCustomSubmitted(true);
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

  // Menu categories
  const categories: MenuCategory[] = [
    { id: 'all', name: 'All' },
    { id: 'breakfast', name: 'Breakfast', icon: faUtensils },
    { id: 'lunch', name: 'Lunch', icon: faDrumstickBite },
    { id: 'dinner', name: 'Dinner', icon: faUtensils },
    { id: 'snacks', name: 'Snacks', icon: faBirthdayCake }
  ];

  // Menu items
  const menuItems: MenuItem[] = [
    {
      id: 'egg-sauce',
      name: 'Egg sauce',
      description: "Egg sauce It's typically one of Nigerian staple food that is perfect for breakfast.",
      price: '$15.00',
      image: '/assets/images/menu/egg-sauce.jpg',
      category: 'breakfast',
      popular: true
    },
    {
      id: 'abacha',
      name: 'Abacha',
      description: 'African salad is native to the ndi Igbo (people of Igbo).',
      price: '$30.00',
      image: '/assets/images/menu/abacha.jpg',
      category: 'lunch'
    },
    {
      id: 'boiled-potatoes',
      name: 'Boiled Potatoes',
      description: 'Boiled potatoes are highly nutritious mostly for kids and everyone contains fiber.',
      price: '$10.00',
      image: '/assets/images/menu/boiled-potatoes.jpg',
      category: 'breakfast'
    },
    {
      id: 'grilled-plantain',
      name: 'Grilled plantain',
      description: 'Grilled plantain are commonly called "bole in nigeria" eaten with roasted groundnut, smoked fish, palm-oil and pepper sauce.',
      price: '$9.00',
      image: '/assets/images/menu/grilled-plantain.jpg',
      category: 'snacks'
    },
    {
      id: 'akara-pap',
      name: 'Akara and Pap',
      description: "Akara and Pap is Naija's weekend morning meal for most homes because of its light and filling nature.",
      price: '$9.00',
      image: '/assets/images/menu/akara-pap.jpg',
      category: 'breakfast'
    },
    {
      id: 'pounded-yam',
      name: 'Pounded yam and egusi soup',
      description: 'Pounded Yam and egusi is a very delicious meal.',
      price: '$20.00',
      image: '/assets/images/menu/pounded-yam.jpg',
      category: 'dinner'
    },
    {
      id: 'spaghetti',
      name: 'Spagetti',
      description: 'Spaghetti is a starchy pasta of Italian origin that is made in the form of long strings, boiled, and served with any of a variety of meat, tomato, or other sauces.',
      price: '$15.00',
      image: '/assets/images/menu/spaghetti.jpg',
      category: 'lunch'
    },
    {
      id: 'puff-puff',
      name: 'Puff Puff',
      description: 'Puff-puff, as it is called in Nigeria and Sierra Leone, sometimes Ghana, and in anglophone Cameroon, is a traditional African snack made of fried dough.',
      price: '$2.00',
      image: '/assets/images/menu/puff-puff.jpg',
      category: 'snacks'
    },
    {
      id: 'toast-bread',
      name: 'Toast Bread and Tea',
      description: 'Most homes in nigeria love our bread toasted but served with sauce or drank with hot tea or chocolate drink.',
      price: '$10.00',
      image: '/assets/images/menu/toast-bread.jpg',
      category: 'breakfast'
    },
    {
      id: 'jollof-rice',
      name: 'Jollof rice',
      description: 'Jollof, or jollof rice, is a rice dish from West Africa. It is widely eaten by all.',
      price: '$20.00',
      image: '/assets/images/menu/jollof-rice.jpg',
      category: 'dinner',
      popular: true
    },
    {
      id: 'boiled-plantain',
      name: 'Boiled plantain',
      description: 'Boiled plantain are highly nutritious for everyone, boiled plantain can be served with different sauce.',
      price: '$20.00',
      image: '/assets/images/menu/boiled-plantain.jpg',
      category: 'lunch'
    },
    {
      id: 'corn',
      name: 'Corn',
      description: 'Corn can highly nutritious and can be eaten roasted, boiled also can be eaten with coconut and pear.',
      price: '$5.00',
      image: '/assets/images/menu/corn.jpg',
      category: 'snacks'
    }
  ];

  // Filter menu items by category
  const filteredMenuItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Catering packages
  const cateringPackages = [
    {
      title: 'Essential Package',
      description: 'Perfect for intimate gatherings and small events',
      price: '$150 per person',
      features: [
        'Selection of 3 appetizers',
        '2 main course options',
        '2 side dishes',
        '1 dessert option',
        'Soft drinks and water',
        'Basic service staff'
      ],
      image: '/assets/essentialpackagecater.jpg',
      recommended: false
    },
    {
      title: 'Premium Package',
      description: 'Ideal for medium-sized events and corporate functions',
      price: '$250 per person',
      features: [
        'Selection of 5 appetizers',
        '3 main course options',
        '3 side dishes',
        '2 dessert options',
        'Soft drinks, juices, and water',
        'Professional service staff',
        'Basic table setup and decoration'
      ],
      image: '/assets/premiumcateringpackage.jpg',
      recommended: true
    },
    {
      title: 'Luxury Package',
      description: 'The ultimate catering experience for special occasions',
      price: '$450 per person',
      features: [
        'Selection of 7 appetizers',
        '4 main course options with premium ingredients',
        '4 side dishes',
        '3 dessert options',
        'Full beverage service including mocktails',
        'Professional service staff with dedicated event manager',
        'Premium table setup and decoration',
        'Custom menu planning with executive chef'
      ],
      image: '/assets/luxurypackagecatering.jpg',
      recommended: false
    }
  ];

  return (
    <div className="menus-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="menu-hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>OUR MENU</h1>
          <p>Exquisite dishes for your catering needs</p>
        </div>
      </section>

      {/* Menu Categories and Items */}
      <section className="menu-section" ref={menuRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Catering Selection</h2>
            <div className="decorative-line"></div>
            <p>Browse our diverse menu and discover culinary delights perfect for your event</p>
          </div>
          
          <div className="menu-view-toggle">
            <button 
              onClick={() => setViewMode('pdf')} 
              className={`view-toggle-btn ${viewMode === 'pdf' ? 'active' : ''}`}
            >
              PDF Menu
            </button>
            <button 
              onClick={() => setViewMode('gallery')} 
              className={`view-toggle-btn ${viewMode === 'gallery' ? 'active' : ''}`}
            >
              Gallery View
            </button>
          </div>

          {viewMode === 'gallery' ? (
            <>
              <div className="menu-filter">
                {categories.map(category => (
                  <button 
                    key={category.id}
                    className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon && <FontAwesomeIcon icon={category.icon} />}
                    {category.name}
                  </button>
                ))}
              </div>

              <div className={`menu-grid ${menuVisible ? 'animate-section' : ''}`}>
                {filteredMenuItems.map(item => (
                  <div className="menu-item" key={item.id}>
                    <div className="menu-item-image">
                      <img src={item.image} alt={item.name} />
                      {item.popular && <span className="popular-tag">Popular</span>}
                    </div>
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <h3>{item.name}</h3>
                        <span className="menu-item-price">{item.price}</span>
                      </div>
                      <p className="menu-item-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="pdf-menu-container">
              <iframe 
                src="/assets/piquant-full-menu.pdf" 
                title="Piquant Catering Menu PDF"
              />
              <div className="pdf-actions">
                <a 
                  href="/assets/piquant-full-menu.pdf" 
                  download
                  className="pdf-download-btn"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Download Menu PDF
                </a>
                <button 
                  onClick={() => window.open('/assets/piquant-full-menu.pdf', '_blank')}
                  className="pdf-fullscreen-btn"
                >
                  <FontAwesomeIcon icon={faExpand} />
                  Open Full Screen
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Catering Packages */}
      <section className="catering-packages-section" ref={packageRef}>
        <div className="container">
          <div className="section-header">
            <h2>Catering Packages</h2>
            <div className="decorative-line"></div>
            <p>Choose from our carefully curated catering packages to suit your event needs</p>
          </div>

          <div className={`packages-grid ${packageVisible ? 'animate-section' : ''}`}>
            {cateringPackages.map((pkg, index) => (
              <div className={`package-card ${pkg.recommended ? 'recommended' : ''}`} key={index}>
                {pkg.recommended && <div className="recommended-badge">Most Popular</div>}
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.title} />
                </div>
                <div className="package-content">
                  <h3>{pkg.title}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <p className="package-price">{pkg.price}</p>
                  <ul className="package-features">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <button 
                    className="package-button"
                    onClick={() => openModal(
                      index === 0 ? 'essential' : 
                      index === 1 ? 'premium' : 'luxury'
                    )}
                  >
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Menu Section */}
      <section className="custom-menu-section">
        <div className="container">
          <div className="custom-menu-content">
            <div className="custom-menu-text">
              <h2>Need a Custom Menu?</h2>
              <p>We understand that each event is unique. Our culinary team can create a customized menu tailored specifically to your preferences, dietary requirements, and event theme.</p>
              <div className="custom-menu-features">
                <div className="custom-feature">
                  <FontAwesomeIcon icon={faUserTie} />
                  <span>Personal Chef Consultation</span>
                </div>
                <div className="custom-feature">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Accommodates Any Event Size</span>
                </div>
              </div>
              <button 
                className="custom-menu-button"
                onClick={() => openModal('custom')}
              >
                Request Custom Menu
              </button>
            </div>
            <div className="custom-menu-image">
              <img src="/assets/custommenurequest.png" alt="Chef preparing custom dishes" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Essential Package Modal */}
      <div 
        className={`modal-overlay ${essentialModalOpen ? 'active' : ''}`} 
        onClick={(e) => handleOverlayClick(e, 'essential')}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{essentialSubmitted ? 'Thank You!' : 'Essential Package Inquiry'}</h3>
            <p className="modal-subtitle">
              {essentialSubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : 'Perfect for intimate gatherings of 20-50 guests'}
            </p>
            <button className="modal-close" onClick={() => closeModal('essential')}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {essentialSubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for your interest in our Essential Package. 
                Our catering team will be in touch within 48 hours to discuss your event details.
              </p>
              <button onClick={() => closeModal('essential')} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-body">
                <form 
                  id="essential-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={(e) => handleFormSubmit(e, 'essential')}
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
                      <option value="birthday">Birthday Celebration</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" name="guest_count" placeholder="Estimated Guest Count" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="event_date" placeholder="Tentative Event Date" />
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Tell us about your event and any dietary requirements..." rows={3}></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="package" value="Essential Package" />
                  <input type="hidden" name="_subject" value="Essential Package Inquiry" />
                </form>
              </div>
              <div className="modal-footer">
                <p className="form-privacy">Your information is secure and will never be shared with third parties. You will be contacted within 48 hours.</p>
                <button 
                  type="submit" 
                  form="essential-form" 
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
      
      {/* Premium Package Modal */}
      <div 
        className={`modal-overlay ${premiumModalOpen ? 'active' : ''}`} 
        onClick={(e) => handleOverlayClick(e, 'premium')}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{premiumSubmitted ? 'Thank You!' : 'Premium Package Inquiry'}</h3>
            <p className="modal-subtitle">
              {premiumSubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : 'Ideal for medium-sized events and corporate functions'}
            </p>
            <button className="modal-close" onClick={() => closeModal('premium')}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {premiumSubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for your interest in our Premium Package. 
                Our catering team will be in touch within 48 hours to discuss your event details.
              </p>
              <button onClick={() => closeModal('premium')} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-body">
                <form 
                  id="premium-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={(e) => handleFormSubmit(e, 'premium')}
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
                      <option value="gala">Gala or Charity Event</option>
                      <option value="private">Private Celebration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" name="guest_count" placeholder="Estimated Guest Count" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="event_date" placeholder="Tentative Event Date" />
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Tell us about your event, venue details, and any special requirements..." rows={3}></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="package" value="Premium Package" />
                  <input type="hidden" name="_subject" value="Premium Package Inquiry" />
                </form>
              </div>
              <div className="modal-footer">
                <p className="form-privacy">Your information is secure and will never be shared with third parties. You will be contacted within 48 hours.</p>
                <button 
                  type="submit" 
                  form="premium-form" 
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
      
      {/* Luxury Package Modal */}
      <div 
        className={`modal-overlay ${luxuryModalOpen ? 'active' : ''}`} 
        onClick={(e) => handleOverlayClick(e, 'luxury')}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{luxurySubmitted ? 'Thank You!' : 'Luxury Package Inquiry'}</h3>
            <p className="modal-subtitle">
              {luxurySubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : 'The ultimate catering experience for special occasions'}
            </p>
            <button className="modal-close" onClick={() => closeModal('luxury')}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {luxurySubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for your interest in our Luxury Package. 
                Our executive chef will personally contact you within 48 hours to discuss your event details.
              </p>
              <button onClick={() => closeModal('luxury')} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-body">
                <form 
                  id="luxury-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={(e) => handleFormSubmit(e, 'luxury')}
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
                      <option value="wedding">Luxury Wedding</option>
                      <option value="gala">Gala or Charity Event</option>
                      <option value="corporate">Executive Corporate Event</option>
                      <option value="anniversary">Anniversary Celebration</option>
                      <option value="other">Other Luxury Occasion</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" name="guest_count" placeholder="Estimated Guest Count" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="event_date" placeholder="Tentative Event Date" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" name="venue" placeholder="Event Venue (if known)" />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Tell us about your vision for this special occasion..." rows={3}></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="package" value="Luxury Package" />
                  <input type="hidden" name="_subject" value="Luxury Package Inquiry" />
                </form>
              </div>
              <div className="modal-footer">
                <p className="form-privacy">Your information is secure and will never be shared with third parties. Our executive chef will personally contact you within 48 hours.</p>
                <button 
                  type="submit" 
                  form="luxury-form" 
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Luxury Inquiry'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Custom Menu Modal */}
      <div 
        className={`modal-overlay ${customModalOpen ? 'active' : ''}`} 
        onClick={(e) => handleOverlayClick(e, 'custom')}
      >
        <div className="consultation-modal">
          <div className="modal-header">
            <h3>{customSubmitted ? 'Thank You!' : 'Custom Menu Request'}</h3>
            <p className="modal-subtitle">
              {customSubmitted 
                ? 'We have received your inquiry and will contact you within 48 hours.' 
                : 'Tell us about your unique culinary vision'}
            </p>
            <button className="modal-close" onClick={() => closeModal('custom')}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {customSubmitted ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FontAwesomeIcon 
                icon={faUtensils} 
                style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '20px' }} 
              />
              <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Thank you for your custom menu request. 
                Our culinary team will contact you within 48 hours to begin creating your personalized menu.
              </p>
              <button onClick={() => closeModal('custom')} className="submit-btn" style={{ width: 'auto', margin: '0 auto' }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto', padding: '20px 25px' }}>
                <form 
                  id="custom-form" 
                  className="compact-form" 
                  action="https://formspree.io/f/mldbzwwg" 
                  method="POST"
                  onSubmit={(e) => handleFormSubmit(e, 'custom')}
                  style={{ marginBottom: '0' }}
                >
                  <style>
                    {`
                      #custom-form input, 
                      #custom-form select, 
                      #custom-form textarea {
                        padding: 10px 12px;
                        font-size: 0.9rem;
                      }
                      #custom-form textarea {
                        min-height: 60px;
                      }
                    `}
                  </style>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-row" style={{ gap: '10px', marginBottom: '10px' }}>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <input type="tel" name="phone" placeholder="Phone Number" required />
                    </div>
                  </div>
                  <div className="form-row" style={{ gap: '10px', marginBottom: '10px' }}>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <select name="event_type" required>
                        <option value="" disabled selected>Type of Event</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="private">Private Dining</option>
                        <option value="themed">Themed Celebration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <select name="price_range" required>
                        <option value="" disabled selected>Budget Range</option>
                        <option value="economy">Economy ($75-150/person)</option>
                        <option value="mid-range">Mid-Range ($150-300/person)</option>
                        <option value="premium">Premium ($300-500/person)</option>
                        <option value="luxury">Luxury (Over $500/person)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row" style={{ gap: '10px', marginBottom: '10px' }}>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <input type="text" name="guest_count" placeholder="Estimated Guest Count" required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <input type="text" name="event_date" placeholder="Tentative Event Date" required />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <select name="cuisine_preference" required>
                      <option value="" disabled selected>Cuisine Preference</option>
                      <option value="nigerian">Nigerian Cuisine</option>
                      <option value="pan-african">Pan-African</option>
                      <option value="fusion">African Fusion</option>
                      <option value="international">International</option>
                      <option value="mixed">Mixed Cuisines</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <textarea name="dietary_requirements" placeholder="Dietary Requirements or Restrictions..." rows={2}></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <textarea name="menu_vision" placeholder="Describe your vision for the menu..." rows={3} required></textarea>
                  </div>
                  <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" name="_gotcha" />
                  </div>
                  <input type="hidden" name="request_type" value="Custom Menu" />
                  <input type="hidden" name="_subject" value="Custom Menu Request" />
                </form>
              </div>
              <div className="modal-footer" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="form-privacy" style={{ fontSize: '0.75rem', margin: '0', flex: '1' }}>Your information is secure. A member of our culinary team will contact you within 48 hours.</p>
                <button 
                  type="submit" 
                  form="custom-form" 
                  className="submit-btn"
                  disabled={submitting}
                  style={{ padding: '10px 15px', marginLeft: '15px', whiteSpace: 'nowrap' }}
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

export default Menus;
