"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FitnessRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
      const data = await response.json();
      setRecipes(data.meals);
    };

    fetchRecipes();
  }, []);

  const fetchRecipeDetails = async (id) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setSelectedRecipe(data.meals[0]);
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
        <div className="flex flex-col items-center mb-8">
          <Image src="/fitness-logo.png" alt="Fitness Recipes Logo" width={300} height={300} />
        </div>

        {selectedRecipe ? (
          <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg w-2/3 text-white">
            <div className="flex flex-col items-center mb-4">
              <Image src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} width={200} height={200} className="rounded" />
              <h2 className="text-3xl font-semibold mt-4">{selectedRecipe.strMeal}</h2>
            </div>
            <div className="bg-black bg-opacity-60 p-4 rounded-lg mb-4">
              <h3 className="text-2xl font-semibold mb-2">Ingredients:</h3>
              <ul>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                  const ingredient = selectedRecipe[`strIngredient${i}`];
                  const measure = selectedRecipe[`strMeasure${i}`];
                  return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
                })}
              </ul>
            </div>
            <div className="bg-black bg-opacity-60 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">Instructions:</h3>
              {selectedRecipe.strInstructions.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">
                  <strong>Step {index + 1}:</strong> {paragraph}
                </p>
              ))}
            </div>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            >
              Back to Recipes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {recipes.map(recipe => (
              <div
                key={recipe.idMeal}
                className="bg-gray-800 bg-opacity-40 p-4 rounded-lg flex flex-col items-center cursor-pointer"
                onClick={() => fetchRecipeDetails(recipe.idMeal)}
              >
                <Image src={recipe.strMealThumb} alt={recipe.strMeal} width={150} height={150} className="rounded-full" />
                <span className="text-xl font-semibold text-white mt-2 text-center">{recipe.strMeal}</span>
              </div>
            ))}
          </div>
        )}
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
