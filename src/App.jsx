// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Filters from './components/Filters';
import FoodItems from './components/FoodItems';
import Footer from './components/Footer';
import './css/Header.css'; // Import custom CSS

function App() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [sortedFoodItems, setSortedFoodItems] = useState([]);

  useEffect(() => {
    // Fetch areas from API
    axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(response => {
        setAreas(response.data.meals.map(area => area.strArea));
      })
      .catch(error => {
        console.error('Error fetching areas:', error);
      });
  }, []);

  useEffect(() => {
    fetchFoodItems(selectedArea);
  }, [selectedArea]);

  const fetchFoodItems = (area) => {
    let apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
    if (area !== '') {
      apiUrl += area;
    } else {
      apiUrl += 'Indian'; // Default to Indian if no area is selected
    }
    axios.get(apiUrl)
      .then(response => {
        setFoodItems(response.data.meals);
        setSortedFoodItems(response.data.meals);
      })
      .catch(error => {
        console.error(`Error fetching ${area} food items:`, error);
      });
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };

  const handleSortChange = (sort) => {
    // Sorting logic here
  };

  const handleFilterApply = (area) => {
    fetchFoodItems(area);
  };

  return (
    <div className="App">
      <Header />
      <Filters areas={areas} onAreaChange={handleAreaChange} onSortChange={handleSortChange} onFilterApply={handleFilterApply} />
      <FoodItems foodItems={sortedFoodItems} />
      <Footer />
    </div>
  );
}

export default App;