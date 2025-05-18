import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, faStarHalfAlt, faQuoteLeft, faUserCircle, 
  faChevronLeft, faChevronRight, faUtensils, faHeart,
  faCakeCandles, faAward, faMedal, faThumbsUp, faImage,
  faUsers, faRankingStar, faMugHot, faLeaf, faPizzaSlice
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faYelp } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import '../styles/reviews.css';

// Sample review data
const reviews = [
  {
    id: 1,
    author: 'Sarah Cohen',
    avatar: '', // Using FontAwesome icons instead of images
    event: 'Wedding Reception',
    content: 'Piquant truly exceeded our expectations for our wedding day! The food was absolutely exceptional - our guests are still talking about the appetizers and main courses months later. The presentation was beautiful and the service was impeccable.',
    date: 'July 15, 2023',
    source: 'google',
    rating: 5
  },
  {
    id: 2,
    author: 'Benjamin Levine',
    avatar: '',
    event: 'Corporate Event',
    content: 'Our company hired Piquant for our annual gala, and they delivered an outstanding experience. The menu was diverse and accommodated all dietary restrictions. The chef worked closely with us to customize every detail. Highly recommend!',
    date: 'September 3, 2023',
    source: 'google',
    rating: 5
  },
  {
    id: 3,
    author: 'Rachel Goldstein',
    avatar: '',
    event: 'Birthday Celebration',
    content: 'The team at Piquant created an unforgettable culinary experience for my 50th birthday. The food was innovative yet approachable, and the presentation was Instagram-worthy! Their attention to detail and personalized service made the event truly special.',
    date: 'October 22, 2023',
    source: 'google',
    rating: 5
  },
  {
    id: 4,
    author: 'Noah Bernstein',
    avatar: '',
    event: 'Anniversary Dinner',
    content: 'We hired Piquant for an intimate anniversary dinner at home, and it was magical. The chef prepared a custom menu that perfectly captured our preferences and included special touches from our first date. The service was unobtrusive yet attentive.',
    date: 'November 8, 2023',
    source: 'google',
    rating: 5
  },
  {
    id: 5,
    author: 'Leah Silverstein',
    avatar: '',
    event: 'Charity Gala',
    content: 'Our nonprofit organization has used Piquant for three consecutive annual galas, and they never disappoint. Their team manages to create elegant, delicious food for hundreds of guests while maintaining quality and presentation. The staff is professional and accommodating.',
    date: 'December 12, 2023',
    source: 'google',
    rating: 5
  },
  {
    id: 6,
    author: 'Daniel Rosenberg',
    avatar: '',
    event: 'Bar Mitzvah',
    content: 'Piquant transformed our son\'s Bar Mitzvah into a gourmet experience! The chef\'s creativity and skill were evident in every course. Our guests were impressed by the flavors and beautiful plating. The staff was professional, friendly, and handled everything perfectly.',
    date: 'January 20, 2024',
    source: 'google',
    rating: 4
  },
  {
    id: 7,
    author: 'Rebecca Katz',
    avatar: '',
    event: 'Baby Shower',
    content: 'We wanted something special for my sister\'s baby shower, and Piquant delivered! The themed menu was perfect, and they created beautiful food stations that were both delicious and visually stunning. The team was a pleasure to work with from planning to execution.',
    date: 'February 15, 2024',
    source: 'google',
    rating: 5
  },
  {
    id: 8,
    author: 'Avi Shapiro',
    avatar: '',
    event: 'Corporate Luncheon',
    content: 'Our company hired Piquant for an important business luncheon, and they helped make it a huge success. The food was innovative and elegant. Their team was professional, punctual, and the service was flawless. I highly recommend them for corporate events.',
    date: 'March 10, 2024',
    source: 'google',
    rating: 5
  },
  {
    id: 9,
    author: 'David Abramowitz',
    avatar: '',
    event: 'Engagement Party',
    content: 'Piquant catered our engagement party, and we couldn\'t be happier with the experience! The food was incredible, and their team worked within our budget to create a memorable menu. The chef was attentive to our preferences and dietary needs, and everything was beautifully executed.',
    date: 'April 5, 2024',
    source: 'google',
    rating: 5
  },
  {
    id: 10,
    author: 'Hannah Friedman',
    avatar: '',
    event: 'Graduation Celebration',
    content: 'The catering service provided by Piquant for my graduation celebration was exceptional. They accommodated all our dietary requirements with creativity and flair. Every guest commented on how delicious the food was. I would definitely use their services again for future events.',
    date: 'May 10, 2024',
    source: 'google',
    rating: 5
  },
  {
    id: 11,
    author: 'Eli Katz',
    avatar: '',
    event: 'Bar Mitzvah',
    content: 'The team at Piquant made my son\'s bar mitzvah a truly special celebration. They created a beautiful kosher menu that honored our traditions while also offering modern flavors. The attention to detail and presentation were impeccable. Thank you for making our day memorable!',
    date: 'June 8, 2024',
    source: 'google',
    rating: 5
  },
  {
    id: 12,
    author: 'Maya Weiss',
    avatar: '',
    event: 'Bat Mitzvah',
    content: 'We chose Piquant for my daughter\'s bat mitzvah celebration and couldn\'t be happier with our choice. They respected our cultural preferences while adding their own creative touches. The food was exceptional and the service was warm and professional. Everyone was impressed!',
    date: 'July 1, 2024',
    source: 'google',
    rating: 5
  }
];

// Sample food image paths
const foodImages = {
  mainDish: '/assets/luxurypackagecatering.jpg',
  appetizer: '/assets/hummusmeal.jpg',
  dessert: '/assets/herosectionpiquant1.jpg',
  beverage: '/assets/food-beverage.jpg',
  presentation: '/assets/food-presentation.jpg',
  eventSetup: '/assets/food-event-setup.jpg',
};

const Reviews: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [filteredReviews] = useState(reviews);
  const reviewsPerPage = 6;
  
  // Refs for intersection observer
  const statsRef = useRef<HTMLDivElement>(null);
  const ratingOverviewRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const reviewsGridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Setup intersection observer to trigger animations
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class when element is in viewport
          entry.target.classList.add('visible');
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    // Observe elements
    if (statsRef.current) observer.observe(statsRef.current);
    if (ratingOverviewRef.current) observer.observe(ratingOverviewRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (reviewsGridRef.current) observer.observe(reviewsGridRef.current);

    return () => {
      // Clean up
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (ratingOverviewRef.current) observer.unobserve(ratingOverviewRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (reviewsGridRef.current) observer.unobserve(reviewsGridRef.current);
    };
  }, []);

  // Get current reviews for pagination
  const indexOfLastReview = activePage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Calculate rating stats
  const averageRating = (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1);
  
  // Count reviews by rating
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as {[key: number]: number});

  // Create star elements
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ opacity: 0.3 }} />);
      }
    }

    return stars;
  };

  // Small stars for rating bars
  const renderSmallStars = (count: number) => {
    return <FontAwesomeIcon icon={faStar} />;
  };

  const renderSourceIcon = (source: string) => {
    switch (source) {
      case 'google':
        return (
          <span className="review-source">
            <FontAwesomeIcon icon={faGoogle} className="platform-icon" />
            <span className="google-text">Google</span>
          </span>
        );
      case 'yelp':
        return (
          <span className="review-source">
            <FontAwesomeIcon icon={faYelp} className="platform-icon" />
            <span className="yelp-text">Yelp</span>
          </span>
        );
      case 'trustpilot':
        return (
          <span className="review-source">
            <FontAwesomeIcon icon={faStar} className="platform-icon trustpilot-icon" />
            <span className="trustpilot-text">Trustpilot</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Animation counter for stats
  const CountUp = ({ target, duration = 2000, label, icon }: { target: number | string, duration?: number, label: string, icon: React.ReactNode }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );
  
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
  
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }, []);
  
    useEffect(() => {
      if (!isVisible) return;
  
      let targetNumber = typeof target === 'string' 
        ? parseFloat(target.replace(/[^0-9.]/g, '')) 
        : target;
  
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * targetNumber));
  
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(targetNumber);
        }
      };
  
      window.requestAnimationFrame(step);
    }, [isVisible, target, duration]);
  
    const displayValue = typeof target === 'string' && target.includes('+') 
      ? `${count}+` 
      : target.toString().includes('%') 
        ? `${count}%` 
        : count;
  
    return (
      <div className="stat-item" ref={elementRef}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-value">{displayValue}</div>
        <div className="stat-label">{label}</div>
      </div>
    );
  };

  return (
    <div className="reviews-page">
      {/* Decorative elements */}
      <div className="decorative-icon top-left">
        <FontAwesomeIcon icon={faUtensils} />
      </div>
      <div className="decorative-icon top-right">
        <FontAwesomeIcon icon={faCakeCandles} />
      </div>
      <div className="decorative-icon mid-left">
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="decorative-icon mid-right">
        <FontAwesomeIcon icon={faMedal} />
      </div>
      <div className="decorative-icon bottom-left">
        <FontAwesomeIcon icon={faAward} />
      </div>
      <div className="decorative-icon bottom-right">
        <FontAwesomeIcon icon={faThumbsUp} />
      </div>
      
      <div className="decorative-blob top"></div>
      <div className="decorative-blob middle"></div>
      <div className="decorative-blob bottom"></div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="reviews-hero">
        <div className="reviews-hero-overlay"></div>
        <div className="reviews-hero-content">
          <h1>OUR REVIEWS</h1>
          <p>See what our clients have to say about their experience with Piquant</p>
        </div>
      </section>
      
      {/* Reviews Overview */}
      <section className="reviews-overview">
        <div className="reviews-overview-container">
          <div className="reviews-stats" ref={statsRef}>
            <CountUp 
              target="200+" 
              duration={2000} 
              label="Happy Clients" 
              icon={<FontAwesomeIcon icon={faUsers} />}
            />
            <CountUp 
              target="97%" 
              duration={2500} 
              label="Satisfaction Rate" 
              icon={<FontAwesomeIcon icon={faStar} />}
            />
            <CountUp 
              target="4.9" 
              duration={1500} 
              label="Average Rating" 
              icon={<FontAwesomeIcon icon={faRankingStar} />}
            />
          </div>
          
          <div className="overview-content">
            <div className="rating-overview" ref={ratingOverviewRef}>
              <div className="rating-header">
                <div className="rating-badge">
                  <FontAwesomeIcon icon={faAward} className="badge-icon" />
                </div>
                <div>
                  <h3 className="rating-title">Client Feedback</h3>
                  <p className="rating-subtitle">Based on {reviews.length} verified reviews</p>
                </div>
              </div>
              
              <div className="overall-rating">
                <div className="rating-number">{averageRating}</div>
                <div className="stars-wrapper">
                  <div className="stars-container">
                    {renderStars(parseFloat(averageRating))}
                  </div>
                  <div className="rating-text">Exceptional service</div>
                </div>
              </div>
              
              <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div className="rating-bar" key={rating}>
                    <div className="rating-level">
                      {rating} <span className="rating-stars">{renderSmallStars(rating)}</span>
                    </div>
                    <div className="rating-progress">
                      <div 
                        className="rating-fill" 
                        style={{ 
                          width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="rating-count">{ratingCounts[rating] || 0}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="food-image-container">
              <div className="image-stack">
                <div className="food-image">
                  <img 
                    src="/assets/luxurypackagecatering.jpg"
                    alt="Luxury catering showcase with shrimp cocktails and appetizers" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div className="food-image">
                  <img 
                    src="/assets/hummusmeal.jpg"
                    alt="Mediterranean spread with hummus and fresh vegetables" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div className="food-image">
                  <img 
                    src="/assets/herosectionpiquant1.jpg"
                    alt="Traditional Greek salad with feta cheese" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews Grid */}
      <section className="reviews-grid-section">
        <div className="reviews-container">
          <div className="reviews-grid-header" ref={testimonialsRef}>
            <h2>Customer Testimonials</h2>
            <p>Read what our clients have to say about their experiences with our catering services on Google</p>
          </div>
          
          <div className="reviews-filter">
            <button 
              className="filter-btn active"
            >
              <FontAwesomeIcon icon={faGoogle} /> Google Reviews
            </button>
          </div>
          
          <div className="reviews-grid" ref={reviewsGridRef}>
            {currentReviews.map(review => (
              <div className="review-card" key={review.id}>
                <div className="review-header">
                  <div className="reviewer-image">
                    {/* Use different FontAwesome icons as reviewer avatars */}
                    {review.id % 4 === 0 ? (
                      <FontAwesomeIcon icon={faUserCircle} className="avatar-icon" />
                    ) : review.id % 4 === 1 ? (
                      <FontAwesomeIcon icon={faUsers} className="avatar-icon" />
                    ) : review.id % 4 === 2 ? (
                      <FontAwesomeIcon icon={faMugHot} className="avatar-icon" />
                    ) : (
                      <FontAwesomeIcon icon={faLeaf} className="avatar-icon" />
                    )}
                  </div>
                  <div className="reviewer-info">
                    <h4>{review.author}</h4>
                    <p className="review-event">{review.event}</p>
                  </div>
                </div>
                <div className="review-content">
                  <div className="quote-icon">
                    <FontAwesomeIcon icon={faQuoteLeft} />
                  </div>
                  <p>{review.content}</p>
                </div>
                <div className="review-footer">
                  <div className="review-date">{review.date}</div>
                  {renderSourceIcon(review.source)}
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="reviews-pagination">
              <button 
                className="pagination-btn" 
                onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
                disabled={activePage === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-btn ${activePage === index + 1 ? 'active' : ''}`}
                  onClick={() => setActivePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className="pagination-btn" 
                onClick={() => setActivePage(prev => Math.min(prev + 1, totalPages))}
                disabled={activePage === totalPages}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Reviews;
