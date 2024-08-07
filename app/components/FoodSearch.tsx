// app/components/FoodSearch.tsx
import { useState } from 'react';
import { getNutritionData } from '../utils/nutritionix';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [foodData, setFoodData] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await getNutritionData(query);
      setFoodData(data);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search for Food</h2>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Enter food name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleSearch}>
        Search
      </button>
      {foodData && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Nutrition Data</h3>
          <pre>{JSON.stringify(foodData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
