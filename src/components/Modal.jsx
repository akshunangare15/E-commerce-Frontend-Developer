import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import axios from 'axios'; // Importing axios for making HTTP requests
import '../css/Modal.css'; // Importing CSS for styling

const Modal = ({ data, onClose }) => {
  // State variable to store additional information
  const [additionalInfo, setAdditionalInfo] = useState(null);

  // Function to fetch additional information from the API
  const fetchAdditionalInfo = async () => {
    try {
      // Making HTTP GET request to fetch additional information
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.idMeal}`);
      const meal = response.data.meals[0];
      setAdditionalInfo(meal.strInstructions); // Setting additional information
    } catch (error) {
      console.error('Error fetching additional info:', error); // Logging error if fetching fails
    }
  };

  // Effect hook to fetch additional information when the modal component mounts
  useEffect(() => {
    fetchAdditionalInfo(); // Calling fetchAdditionalInfo function
  }, []); // Empty dependency array ensures this effect runs only once

  // JSX to render the modal
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span> {/* Close button */}
        <img src={data.strMealThumb} alt={data.strMeal} className="modal-image" /> {/* Image */}
        <div className="modal-details">
          <h2>{data.strMeal}</h2> {/* Meal name */}
          <p>{data.strInstructions}</p> {/* Instructions */}
          {additionalInfo && <p>{additionalInfo}</p>} {/* Display additional info if available */}
        </div>
      </div>
    </div>
  );
};

export default Modal; // Exporting Modal component
