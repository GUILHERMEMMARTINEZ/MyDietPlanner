import { useState } from 'react';

interface FoodItem {
  name: string;
  calories: number;
}

const IntakeTracker = () => {
  const [intakeList, setIntakeList] = useState<FoodItem[]>([]);

  const addFoodItem = (foodItem: FoodItem) => {
    setIntakeList((prevList) => [...prevList, foodItem]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Intake Tracker</h2>
      <ul>
        {intakeList.map((item, index) => (
          <li key={index} className="mb-2">
            {item.name} - {item.calories} calories
          </li>
        ))}
      </ul>
      <button
        className="bg-green-500 text-white p-2"
        onClick={() => addFoodItem({ name: 'Apple', calories: 95 })}
      >
        Add Apple
      </button>
    </div>
  );
};

export default IntakeTracker;
