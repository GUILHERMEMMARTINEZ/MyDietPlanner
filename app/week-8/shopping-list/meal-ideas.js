"use client";

import { useState, useEffect } from 'react';

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient]);

  const loadMealIdeas = async () => {
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals);
  };

  const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Meal Ideas for "{ingredient}"</h2>
      <ul className="space-y-4">
        {meals.map((meal) => (
          <li key={meal.idMeal} className="flex items-center space-x-4">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-16 h-16 rounded-lg"/>
            <span>{meal.strMeal}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
