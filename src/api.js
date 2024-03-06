// api.js

const API_BASE_URL = 'https://www.themealdb.com/api.php';

export const getAreas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/areas`);
    const data = await response.json();
    return data.areas; // Adjust this based on the actual structure of the response
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
};

// Define other API functions as needed
