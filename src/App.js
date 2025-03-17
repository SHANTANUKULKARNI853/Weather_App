import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

const backgroundStyle = {
  background: 'linear-gradient(to bottom, #4a90e2, #87ceeb)',  // Sky-like gradient
  backgroundSize: 'cover',
  height: '100vh',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
};

const cloudOverlayStyle = {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(https://www.transparenttextures.com/patterns/clouds.png)',  // Subtle cloud pattern
  opacity: 0.2,  // Light cloud effect
};

const contentStyle = {
  position: 'relative',
  zIndex: 1,
  color: '#fff',
  textAlign: 'center',
  padding: '20px',
};

const navStyle = {
  textAlign: 'center',
  margin: '20px',
};

const linkStyle = ({ isActive }) => ({
  marginRight: '15px',
  textDecoration: 'none',
  color: isActive ? '#ffeb3b' : '#fff',  // Bright yellow when active
  fontWeight: isActive ? 'bold' : 'normal',
  padding: '5px 10px',
  borderRadius: '5px',
  backgroundColor: isActive ? '#00000033' : 'transparent',  // Slight black overlay for active
});

const App = () => {
  return (
    <div style={backgroundStyle}>
      <div style={cloudOverlayStyle}></div>
      <div style={contentStyle}>
        <h1>Weather Forecast</h1>
        <Router>
          <nav style={navStyle}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/search" style={linkStyle}>Search</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
