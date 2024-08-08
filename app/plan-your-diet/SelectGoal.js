import { useState } from 'react';

export default function SelectGoal() {
  const [selectedGoal, setSelectedGoal] = useState('');

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
  };

  return (
    <div className="panel panel-primary w-full max-w-2xl bg-black bg-opacity-90 p-4 rounded-lg">
      <div className="panel-heading bg-blue-500 text-white p-4 rounded-t-lg">Step 2: Choose Your Goal</div>
      <div className="panel-body bg-black text-white p-4 rounded-b-lg">
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`p-4 text-center ${selectedGoal === 'cutting' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
            onClick={() => handleGoalSelection('cutting')}
          >
            Cutting (Lose weight/Definition)
            <br />
            Calories/Day
          </button>
          <button
            className={`p-4 text-center ${selectedGoal === 'maintain' ? 'bg-gray-400 text-white' : 'bg-white text-red-600'}`}
            onClick={() => handleGoalSelection('maintain')}
          >
            Maintain Weight
            <br />
            Calories/Day
          </button>
          <button
            className={`p-4 text-center ${selectedGoal === 'bulking' ? 'bg-black text-red-600' : 'bg-white text-red-600'}`}
            onClick={() => handleGoalSelection('bulking')}
          >
            Bulking (Gain weight/Hypertrophy)
            <br />
            Calories/Day
          </button>
          <button
            className={`p-4 text-center ${selectedGoal === 'custom' ? 'bg-white text-red-600' : 'bg-white text-red-600'}`}
            onClick={() => handleGoalSelection('custom')}
          >
            Custom
            <br />
            Calories/Day
          </button>
        </div>
      </div>
    </div>
  );
}
