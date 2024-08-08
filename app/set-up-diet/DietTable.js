"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const fetchFoodData = async () => {
  const appId = process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID;
  const apiKey = process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY;
  try {
    const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=*&detailed=true`, {
      headers: {
        'x-app-id': appId,
        'x-app-key': apiKey,
        'x-remote-user-id': '0'
      }
    });
    const data = await response.json();
    console.log("Fetched Food Data: ", data); // Adicionando log para depuração
    return data.common;
  } catch (error) {
    console.error("Error fetching food data: ", error);
    return [];
  }
};

export default function SetupDiet() {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealType, setMealType] = useState('');
  const [meals, setMeals] = useState({
    breakfast: [],
    morningSnack: [],
    lunch: [],
    afternoonSnack: [],
    dinner: []
  });
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const getFoodData = async () => {
      const foodData = await fetchFoodData();
      setFoods(foodData);
    };
    getFoodData();
  }, []);

  useEffect(() => {
    const calculateTotalCalories = () => {
      const mealCalories = Object.values(meals).flat().reduce((acc, food) => acc + food.nf_calories, 0);
      setTotalCalories(mealCalories);
    };
    calculateTotalCalories();
  }, [meals]);

  const handleAddFood = () => {
    if (selectedFood && mealType) {
      setMeals((prevMeals) => ({
        ...prevMeals,
        [mealType]: [...prevMeals[mealType], selectedFood]
      }));
      setSelectedFood(null);
    }
  };

  const handleRemoveFood = (mealType, foodIndex) => {
    setMeals((prevMeals) => {
      const updatedMeals = { ...prevMeals };
      updatedMeals[mealType].splice(foodIndex, 1);
      return updatedMeals;
    });
  };

  return (
    <main className="relative flex flex-col items-center min-h-screen p-24 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
      <header className="fixed top-0 w-full bg-gray-800 bg-opacity-80 text-white flex justify-between items-center p-4">
        <nav className="flex space-x-4 header-nav">
          <Link href="/">
            <span className="hover:text-yellow-300 cursor-pointer">Home</span>
          </Link>
        </nav>
        <div className="font-mono text-sm">
          <Link href="/week-8">
            <span className="hover:text-yellow-300 cursor-pointer">Login</span>
          </Link>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center space-y-8 mt-16 w-full">
        <div className="panel panel-primary w-full max-w-2xl bg-black bg-opacity-90 p-4 rounded-lg">
          <div className="panel-heading bg-blue-500 text-white p-4 rounded-t-lg">Set Up Your Diet</div>
          <div className="panel-body bg-black text-white p-4 rounded-b-lg">
            <div className="form-group mb-4">
              <label className="block mb-2">Select Meal Type:</label>
              <select className="form-control border p-2 w-full bg-black text-white mb-4" value={mealType} onChange={(e) => setMealType(e.target.value)}>
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="morningSnack">Morning Snack</option>
                <option value="lunch">Lunch</option>
                <option value="afternoonSnack">Afternoon Snack</option>
                <option value="dinner">Dinner</option>
              </select>
              <label className="block mb-2">Select Food:</label>
              <select className="form-control border p-2 w-full bg-black text-white" value={selectedFood?.food_name || ''} onChange={(e) => setSelectedFood(foods.find(food => food.food_name === e.target.value))}>
                <option value="">Select Food</option>
                {foods.map((food, index) => (
                  <option key={index} value={food.food_name}>{`${food.food_name} - ${food.nf_calories} calories`}</option>
                ))}
              </select>
              <button className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={handleAddFood}>Add Food</button>
            </div>

            {Object.keys(meals).map((mealType) => (
              <div key={mealType} className="form-group mb-4">
                <label className="block mb-2">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</label>
                <ul className="list-disc list-inside">
                  {meals[mealType].map((food, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{`${food.food_name} - ${food.nf_calories} calories`}</span>
                      <div>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemoveFood(mealType, index)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-info p-4 mt-4 text-center font-semibold text-lg bg-black text-white rounded-lg">
              <div>Total Calories: {totalCalories}</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full bg-gray-800 bg-opacity-80 text-white flex justify-between items-center p-4">
        <nav className="flex space-x-4 footer-nav">
          <Link href="/week-7">
            <span className="hover:text-yellow-300 cursor-pointer">To be Developed</span>
          </Link>
        </nav>
        <div className="font-mono text-sm">
          Developed by Art and Gui
        </div>
      </footer>
    </main>
  );
}
