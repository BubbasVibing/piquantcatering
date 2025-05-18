import React, { useState, useEffect } from 'react';
import '../styles/passwordProtection.css';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const auth = localStorage.getItem('piquantAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'Kimo') {
      setIsAuthenticated(true);
      localStorage.setItem('piquantAuth', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setShake(true);
      // Remove shake class after animation completes
      setTimeout(() => setShake(false), 500);
    }
  };

  // Logout function to clear authentication
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('piquantAuth');
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <>
        {children}
        <button className="logout-button" onClick={handleLogout} title="Logout">
          🔒
        </button>
      </>
    );
  }

  return (
    <div className="password-protection">
      <div className={`password-container ${shake ? 'shake' : ''}`}>
        <div className="password-logo">
          <h1>PIQUANT</h1>
        </div>
        <h2>Password Protected</h2>
        <p>Please enter the password to access this site.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="password-input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="password-input"
              autoFocus
            />
            <button type="submit" className="password-submit-btn">
              Enter
            </button>
          </div>
          {error && <div className="password-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection; 