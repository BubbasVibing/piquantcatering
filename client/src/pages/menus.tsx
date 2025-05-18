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
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [menuVisible, setMenuVisible] = useState(false);
  const [packageVisible, setPackageVisible] = useState(false);
  
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
    { id: 'breakfast', name: 'Breakfast', icon: faUtensils },
    { id: 'lunch', name: 'Lunch', icon: faDrumstickBite },
    { id: 'dinner', name: 'Dinner', icon: faUtensils },
    { id: 'desserts', name: 'Desserts', icon: faBirthdayCake }
  ];

  // Menu items
  const menuItems: MenuItem[] = [
    {
      id: 'fruit-platter',
      name: 'Signature Sliced Fruit Platter',
      description: "Handpicked selection of seasonal and exotic fruits and berries",
      price: '',
      image: '/assets/images/menu/fruit-platter.jpg',
      category: 'breakfast',
      popular: true
    },
    {
      id: 'granola-yogurt',
      name: 'Organic Oat Granola & Yogurt',
      description: 'Cranberry pecan granola or sunflower wheat germ muesli, low fat yogurt or low-fat honey yogurt, bananas, berries',
      price: '',
      image: '/assets/images/menu/granola-yogurt.jpg',
      category: 'breakfast'
    },
    {
      id: 'mini-bagels',
      name: 'Assorted Mini Bagels',
      description: 'Imported French butter, fruit preserves, assorted cream cheeses',
      price: '',
      image: '/assets/images/menu/mini-bagels.jpg',
      category: 'breakfast'
    },
    {
      id: 'pastries-bagels',
      name: 'House Baked Mini Pastries and Bagels',
      description: 'Miniature muffins, scones, danish, croissants, mini bagels, imported French butter, assorted cream cheeses, fruit preserves',
      price: '',
      image: '/assets/images/menu/pastries-bagels.jpg',
      category: 'breakfast',
      popular: true
    },
    {
      id: 'smoked-salmon',
      name: 'Smoked Salmon and Mini Bagels',
      description: 'Double smoked Atlantic salmon, assorted cream cheeses, Italian mascarpone cheese, shaved red onions, tomatoes, calamata olives, Persian cucumbers, capers',
      price: '',
      image: '/assets/images/menu/smoked-salmon.jpg',
      category: 'breakfast'
    },
    {
      id: 'british-scones',
      name: 'British Tradition',
      description: 'Mini currant tea scones, mascarpone cheese, strawberry preserves, fresh strawberries',
      price: '',
      image: '/assets/images/menu/british-scones.jpg',
      category: 'breakfast'
    },
    {
      id: 'salmon-torta',
      name: 'Smoked Salmon Torta',
      description: 'Layers of double smoked Atlantic salmon, goat cheese, cream cheese, fresh herbs, scallions, capers, served with whole grain bread, mini bagels or extra virgin olive oil crostini',
      price: '',
      image: '/assets/images/menu/salmon-torta.jpg',
      category: 'lunch'
    },
    {
      id: 'breakfast-sandwiches',
      name: 'Grilled Pressed Whole Wheat English Muffins',
      description: 'Assortment including: organic scrambled eggs with spinach & smoked gouda; organic scrambled eggs with cured turkey ham, spinach & smoked gouda; organic scrambled eggs with turkey, apple and sage sausage, harissa aioli & white cheddar; organic scrambled eggs with fresh mozzarella, basil pesto & sun dried tomato pesto',
      price: '',
      image: '/assets/images/menu/breakfast-sandwiches.jpg',
      category: 'breakfast'
    },
    {
      id: 'egg-white-wraps',
      name: 'Grilled Pressed Baked Egg White Wraps',
      description: 'Assortment including: baked egg white omelette with jack cheese, organic pinto beans, avocado & hot sauce; cured turkey ham with baked egg white omelette, jack cheese, avocado & hot sauce; baked egg white omelette with sautéed onions, peppers, turkey, apple and sage sausage, cheddar & harissa sauce',
      price: '',
      image: '/assets/images/menu/egg-white-wraps.jpg',
      category: 'breakfast',
      popular: true
    },
    {
      id: 'vegan-sandwich',
      name: 'Vegan Coconut "Bacon" Sandwich',
      description: 'Smoked coconut, avocado, vegan aioli on seven grains bread',
      price: '',
      image: '/assets/images/menu/vegan-sandwich.jpg',
      category: 'lunch'
    },
    {
      id: 'fresh-mozzarella',
      name: 'Fresh Mozzarella Sandwich',
      description: 'Basil pesto, balsamic, tomatoes on focaccia',
      price: '',
      image: '/assets/images/menu/fresh-mozzarella.jpg',
      category: 'lunch'
    },
    {
      id: 'albacore-tuna',
      name: 'Albacore Tuna Sandwich',
      description: 'With spinach and tomato on seven grains bread',
      price: '',
      image: '/assets/images/menu/albacore-tuna.jpg',
      category: 'lunch'
    },
    {
      id: 'pecan-blt',
      name: 'Pecan BLT',
      description: 'Brown sugar beef bacon, lettuce, tomato, honey dijon, chipotle aioli on ciabatta',
      price: '',
      image: '/assets/images/menu/pecan-blt.jpg',
      category: 'lunch',
      popular: true
    },
    {
      id: 'chicken-cobb',
      name: 'Chicken Cobb Club Wrap',
      description: 'Avocado, brown sugar beef bacon, lettuce, tomato, blue cheese',
      price: '',
      image: '/assets/images/menu/chicken-cobb.jpg',
      category: 'lunch'
    },
    {
      id: 'organic-greens',
      name: 'Organic Mesclun Greens',
      description: 'Assorted baby lettuce, cherry tomatoes, Persian cucumbers, sesame-soy vinaigrette',
      price: '',
      image: '/assets/images/menu/organic-greens.jpg',
      category: 'dinner'
    },
    {
      id: 'chopped-salad',
      name: 'Chopped Salad',
      description: 'Tomatoes, Persian cucumbers, red onions, fresh lemon juice, extra virgin olive oil dressing',
      price: '',
      image: '/assets/images/menu/chopped-salad.jpg',
      category: 'dinner'
    },
    {
      id: 'garden-vegetables',
      name: 'Garden Vegetables',
      description: 'Cherry tomatoes, green beans, radish, Persian cucumber, carrots, asparagus, fennel, romaine hearts, organic mesclun, miso dressing',
      price: '',
      image: '/assets/images/menu/garden-vegetables.jpg',
      category: 'dinner',
      popular: true
    },
    {
      id: 'greek-salad',
      name: 'Classic Greek Salad',
      description: 'Imported Greek feta, plum tomatoes, red peppers, Persian cucumbers, calamata olives, red onions, oregano, romaine hearts, balsamic herb dressing',
      price: '',
      image: '/assets/images/menu/greek-salad.jpg',
      category: 'dinner'
    },
    {
      id: 'moroccan-chicken',
      name: 'Moroccan Chicken',
      description: 'Bone-in chicken marinated with preserved lemon, green olives, and traditional Moroccan spices, slow roasted to perfection',
      price: '',
      image: '/assets/images/menu/moroccan-chicken.jpg',
      category: 'dinner',
      popular: true
    },
    {
      id: 'merguez-lamb',
      name: 'Merguez Lamb and Organic Cracked Wheat',
      description: 'Traditional lamb preparation with aromatic Moroccan spices, served with organic cracked wheat and a side of yogurt mint sauce',
      price: '',
      image: '/assets/images/menu/merguez-lamb.jpg',
      category: 'dinner'
    },
    {
      id: 'strawberries',
      name: 'Brownies and Strawberries',
      description: 'A luscious display of our signature fudge-brownies and strawberries',
      price: '',
      image: '/assets/images/menu/brownies-strawberries.jpg',
      category: 'desserts'
    },
    {
      id: 'seasonal-berries',
      name: 'Seasonal Berries and Cream',
      description: 'A luscious presentation of assorted seasonal berries served with lightly sweetened whipped cream',
      price: '',
      image: '/assets/images/menu/berries-cream.jpg',
      category: 'desserts',
      popular: true
    },
    {
      id: 'chocolate-cookies',
      name: 'Chewy Dark Chocolate Walnut Cookies',
      description: 'Our signature flourless cookies, no fat added',
      price: '',
      image: '/assets/images/menu/chocolate-cookies.jpg',
      category: 'desserts'
    },
    {
      id: 'chocolate-strawberries',
      name: 'Chocolate Covered Strawberries',
      description: 'Long-stem California strawberries covered with semi-sweet Belgian chocolate',
      price: '',
      image: '/assets/images/menu/chocolate-strawberries.jpg',
      category: 'desserts'
    }
  ];

  // Filter menu items by category
  const filteredMenuItems = menuItems.filter(item => item.category === activeCategory);

  // Catering packages
  const cateringPackages = [
    {
      title: 'Essential Package',
      description: 'Perfect for intimate gatherings and small events',
      price: '$',
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
      price: '$$',
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
      price: '$$$',
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
          
          <div className="menu-address">
            <p>Pennsauken, NJ | Englewood, NJ</p>
            <p>T: 917 822 6951 | E: info@piquantcatering.com</p>
          </div>
          
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

          <div className={`menu-list ${menuVisible ? 'animate-section' : ''}`}>
            {filteredMenuItems.map(item => (
              <div className="menu-item-text" key={item.id}>
                <div className="menu-item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-description">{item.description}</p>
                {item.popular && <span className="menu-popular-tag">Chef's Choice</span>}
              </div>
            ))}
          </div>
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
              <div className="modal-footer" style={{ 
                padding: '15px 25px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'stretch', 
                gap: '15px'
              }}>
                <p className="form-privacy" style={{ 
                  fontSize: '0.85rem', 
                  margin: '0', 
                  lineHeight: '1.5', 
                  textAlign: 'left'
                }}>
                  Your information is secure. A member of our culinary team will contact you within 48 hours.
                </p>
                <button 
                  type="submit" 
                  form="custom-form" 
                  className="submit-btn"
                  disabled={submitting}
                  style={{ 
                    padding: '12px 15px',
                    alignSelf: 'stretch'
                  }}
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
