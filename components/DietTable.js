import { useState, useEffect } from 'react';

const foodsList = [
  { name: 'Apple', calories: 43 },
  { name: 'Banana', calories: 81 },
  { name: 'Grapefruit', calories: 34 },
  { name: 'Mango', calories: 48 },
  { name: 'Broccoli', calories: 34 },
  { name: 'Carrot', calories: 34 },
  { name: 'Spinach', calories: 25 },
  { name: 'Zucchini', calories: 16 },
  { name: 'Brown rice', calories: 132 },
  { name: 'Quinoa', calories: 111 },
  { name: 'Oats (rolled)', calories: 381 },
  { name: 'Black beans', calories: 120 },
  { name: 'Chicken breast', calories: 106 },
  { name: 'Beef mince (lean)', calories: 169 },
  { name: 'Turkey (white meat)', calories: 104 },
  { name: 'Sausage (pork)', calories: 301 },
  { name: 'Salmon', calories: 230 },
  { name: 'Cod', calories: 80 },
  { name: 'Tuna', calories: 120 },
  { name: 'Shrimp', calories: 106 },
  { name: 'Cheddar cheese', calories: 416 },
  { name: 'Skim milk', calories: 34 },
  { name: 'Yogurt, whole milk', calories: 61 },
  { name: 'Cottage cheese (1%)', calories: 103 },
];

export default function DietTable() {
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
    const calculateTotalCalories = () => {
      const mealCalories = Object.values(meals).flat().reduce((acc, food) => acc + food.calories, 0);
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

  const handlePrintDiet = () => {
    const dietData = {
      totalCalories,
      meals,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dietData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "diet.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
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
          <label className="block mb-2">Search Food:</label>
          <input type="text" className="form-control border p-2 w-full bg-black text-white mb-4" placeholder="Enter food name" onChange={(e) => {
            const filteredFoods = foodsList.filter(food => food.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setSelectedFood(filteredFoods[0]);
          }} />
          <label className="block mb-2">Select Food:</label>
          <select className="form-control border p-2 w-full bg-black text-white" value={selectedFood?.name || ''} onChange={(e) => setSelectedFood(foodsList.find(food => food.name === e.target.value))}>
            <option value="">Select Food</option>
            {foodsList.map((food, index) => (
              <option key={index} value={food.name}>{`${food.name} - ${food.calories} calories`}</option>
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
                  <span>{`${food.name} - ${food.calories} calories`}</span>
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
        
        <button className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={handlePrintDiet}>Print Diet</button>
      </div>
    </div>
  );
}
