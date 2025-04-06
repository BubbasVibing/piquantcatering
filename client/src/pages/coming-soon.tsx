import React from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { Link } from 'react-router-dom';
import '../styles/coming-soon.css';

const ComingSoon: React.FC = () => {
  return (
    <div className="coming-soon-page">
      <Navbar />
      
      <div className="coming-soon-content">
        <div className="coming-soon-overlay"></div>
        <div className="coming-soon-container">
          <h1>Coming Soon</h1>
          <p>We're working on something exceptional for you.</p>
          <p className="coming-soon-subtitle">This page is currently under development.</p>
          <Link to="/" className="return-home-btn">
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ComingSoon; 