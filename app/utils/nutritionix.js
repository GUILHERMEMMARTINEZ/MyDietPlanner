// utils/nutritionix.js
import axios from 'axios';

const API_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

export const getNutritionData = async (query) => {
  try {
    const response = await axios.post(
      API_URL,
      { query },
      {
        headers: {
          'x-app-id': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID,
          'x-app-key': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    throw error;
  }
};
