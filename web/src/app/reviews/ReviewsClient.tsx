'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAward,
  faCakeCandles,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faLeaf,
  faMedal,
  faMugHot,
  faQuoteLeft,
  faRankingStar,
  faStar,
  faStarHalfAlt,
  faThumbsUp,
  faUserCircle,
  faUsers,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faYelp } from '@fortawesome/free-brands-svg-icons';
import CountUp from '@/components/CountUp/CountUp';
import { reviews } from '@/data/reviews';
import type { Review, ReviewSource } from '@/types/content';
import '@/styles/reviews.css';

const REVIEWS_PER_PAGE = 6;

const AVATAR_ICONS = [faUserCircle, faUsers, faMugHot, faLeaf];

const FOOD_IMAGES = [
  {
    src: '/assets/menuimages/piquantsignature.png',
    alt: 'Piquant signature dish presentation',
  },
  { src: '/assets/hummusmeal.jpg', alt: 'Mediterranean spread with hummus and fresh vegetables' },
  { src: '/assets/herosectionpiquant1.jpg', alt: 'Traditional Greek salad with feta cheese' },
];

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return Array.from({ length: 5 }, (_, index) => {
    const star = index + 1;
    if (star <= fullStars) return <FontAwesomeIcon key={star} icon={faStar} />;
    if (star === fullStars + 1 && hasHalfStar) {
      return <FontAwesomeIcon key={star} icon={faStarHalfAlt} />;
    }
    return <FontAwesomeIcon key={star} icon={faStar} style={{ opacity: 0.3 }} />;
  });
}

function SourceBadge({ source }: { source: ReviewSource }) {
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
  }
}

function ReviewCard({ review }: { review: Review }) {
  const avatar = AVATAR_ICONS[review.id % AVATAR_ICONS.length];
  return (
    <article className="review-card">
      <div className="review-header">
        <div className="reviewer-image">
          <FontAwesomeIcon icon={avatar} className="avatar-icon" />
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
        <SourceBadge source={review.source} />
      </div>
    </article>
  );
}

export default function ReviewsClient() {
  const [activePage, setActivePage] = useState(1);

  const { averageRating, ratingCounts } = useMemo(() => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const counts = reviews.reduce<Record<number, number>>((acc, review) => {
      acc[review.rating] = (acc[review.rating] ?? 0) + 1;
      return acc;
    }, {});
    return {
      averageRating: (total / reviews.length).toFixed(1),
      ratingCounts: counts,
    };
  }, []);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const currentReviews = reviews.slice(
    (activePage - 1) * REVIEWS_PER_PAGE,
    activePage * REVIEWS_PER_PAGE,
  );

  return (
    <div className="reviews-page">
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

      <div className="decorative-blob top" />
      <div className="decorative-blob middle" />
      <div className="decorative-blob bottom" />

      <section className="reviews-hero">
        <div className="reviews-hero-overlay" />
        <div className="reviews-hero-content">
          <h1>OUR REVIEWS</h1>
          <p>See what our clients have to say about their experience with Piquant</p>
        </div>
      </section>

      <section className="reviews-overview">
        <div className="reviews-overview-container">
          <div className="reviews-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="stat-value">
                <CountUp target={200} duration={2000} suffix="+" />
              </div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="stat-value">
                <CountUp target={97} duration={2500} suffix="%" />
              </div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faRankingStar} />
              </div>
              <div className="stat-value">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>

          <div className="overview-content">
            <div className="rating-overview">
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
                  <div className="stars-container">{renderStars(parseFloat(averageRating))}</div>
                  <div className="rating-text">Exceptional service</div>
                </div>
              </div>

              <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div className="rating-bar" key={rating}>
                    <div className="rating-level">
                      {rating}{' '}
                      <span className="rating-stars">
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                    </div>
                    <div className="rating-progress">
                      <div
                        className="rating-fill"
                        style={{
                          width: `${((ratingCounts[rating] ?? 0) / reviews.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="rating-count">{ratingCounts[rating] ?? 0}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="food-image-container">
              <div className="image-stack">
                {FOOD_IMAGES.map(({ src, alt }) => (
                  <div className="food-image" key={src}>
                    <Image
                      src={src}
                      alt={alt}
                      width={500}
                      height={500}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-grid-section">
        <div className="reviews-container">
          <div className="reviews-grid-header">
            <h2>Customer Testimonials</h2>
            <p>
              Read what our clients have to say about their experiences with our catering services
              on Google
            </p>
          </div>

          <div className="reviews-filter">
            <button type="button" className="filter-btn active">
              <FontAwesomeIcon icon={faGoogle} /> Google Reviews
            </button>
          </div>

          <div className="reviews-grid">
            {currentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="reviews-pagination">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
                disabled={activePage === 1}
                aria-label="Previous page"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  type="button"
                  key={index + 1}
                  className={`pagination-btn ${activePage === index + 1 ? 'active' : ''}`}
                  onClick={() => setActivePage(index + 1)}
                  aria-label={`Page ${index + 1}`}
                  aria-current={activePage === index + 1 ? 'page' : undefined}
                >
                  {index + 1}
                </button>
              ))}

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setActivePage((prev) => Math.min(prev + 1, totalPages))}
                disabled={activePage === totalPages}
                aria-label="Next page"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
