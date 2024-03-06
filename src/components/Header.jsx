import React from 'react'; // Importing React
import '../css/Header.css'; // Importing CSS for styling
import logo from './swiggy-logo.png'; // Importing Swiggy logo image

const Header = () => {
  return (
    // Header component
    <header className="header">
      {/* Swiggy logo */}
      <div className="header-logo">
        <img src={logo} alt="Swiggy" />
      </div>
      {/* Search bar */}
      <div className="header-search">
        <input type="text" placeholder="Search for restaurants or dishes" disabled /> {/* Disabled search input */}
        <button className="search-btn">Search</button> {/* Search button */}
      </div>
    </header>
  );
};

export default Header; // Exporting Header component
