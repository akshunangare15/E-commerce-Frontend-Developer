import React, { useState, useEffect } from 'react'; // React and hooks for state management
import Modal from './Modal'; // Importing the Modal component
import '../css/FoodItems.css'; // CSS file for styling

const FoodItems = ({ foodItems }) => {
  // State variables
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [paginatedItems, setPaginatedItems] = useState([]);

  // Update paginatedItems when dependencies change
  useEffect(() => {
    setPaginatedItems(foodItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [foodItems, currentPage, itemsPerPage]);

  // Handle click event on food item
  const handleClick = async (item) => {
    setSelectedItem(item);
    setShowModal(true);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`);
      const data = await response.json();
      setAdditionalInfo(data.meals[0]);
    } catch (error) {
      console.error('Error fetching additional meal info:', error);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setAdditionalInfo(null);
  };

  // Render food items
  const renderFoodItems = () => {
    if (!paginatedItems) {
      return null;
    }

    return paginatedItems.map((item, index) => (
      <div key={index} className="food-item-card" onClick={() => handleClick(item)}>
        <img src={item.strMealThumb} alt={item.strMeal} className="food-item-image" />
        <div className="food-item-details">
          <div className="food-item-name">{item.strMeal}</div>
          <div className="food-item-ratings">{generateRandomRating()} Stars</div>
        </div>
      </div>
    ));
  };

  // Generate random rating between 1 and 5
  const generateRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  // Handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(foodItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // JSX to render the FoodItems component
  return (
    <div className="food-items-container">
      <div className="food-items-section grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderFoodItems()}
        {showModal && selectedItem && (
          <Modal data={selectedItem} additionalInfo={additionalInfo} onClose={handleCloseModal} />
        )}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
