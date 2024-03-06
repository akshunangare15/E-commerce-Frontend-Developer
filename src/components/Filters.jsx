import React, { useState } from 'react'; // Importing necessary React hooks for state management
import '../css/Filters.css'; // Importing the CSS file for styling

const Filters = ({ areas, onAreaChange, onSortChange, onFilterApply }) => {
  // State variables
  const [selectedArea, setSelectedArea] = useState('');

  // Function to handle area change
  const handleAreaChange = (event) => {
    const area = event.target.value;
    setSelectedArea(area); // Set the selected area
  };

  // Function to handle applying filter
  const handleApplyFilter = () => {
    onFilterApply(selectedArea); // Call the onFilterApply function with the selected area
  };

  // Function to handle sort change
  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    onSortChange(selectedSort); // Call the onSortChange function with the selected sort option
  };

  // JSX to render the Filters component
  return (
    <div className="filter-section">
      <h1 className="filter-heading">Restaurants with online food delivery in Pune</h1>
      <div className="filters">
        {/* Area filter dropdown */}
        <div className="dropdown">
          <button className="filter-btn">Filter By Area</button>
          <div className="dropdown-content">
            <form>
              {/* Radio buttons for each area */}
              {areas.map(area => (
                <label key={area} className="area-label">
                  <input type="radio" name="area" value={area} checked={selectedArea === area} onChange={handleAreaChange} />
                  {area}
                </label>
              ))}
              <button type="button" onClick={handleApplyFilter} className="apply-btn">Apply</button>
            </form>
          </div>
        </div>
        {/* Filter options */}
        <div className="filter-options">
          <button className="filter-option">Fast Delivery</button>
          <button className="filter-option">New on Swiggy</button>
          <button className="filter-option">Pure Veg</button>
          <button className="filter-option">Offers</button>
          <button className="filter-option">Rs 300 - Rs 600</button>
          <button className="filter-option">Less than 200</button>
        </div>
        {/* Sort by dropdown */}
        <div className="sort-by">
          <label className="sort-label">Sort By:</label>
          <select onChange={handleSortChange} className="sort-select">
            <option value="">Select</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters; // Export the Filters component
