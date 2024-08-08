"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function PlanYourDiet() {
  const [results, setResults] = useState(null);
  const [showBodyFat, setShowBodyFat] = useState(false);

  const calculateResults = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const gender = formData.get('gender');
    const age = parseInt(formData.get('age'));
    const height = parseFloat(formData.get('height'));
    const weight = parseFloat(formData.get('weight'));
    const bodyFatKnown = formData.get('bodyfat_known') === 'yes';
    const bodyFat = bodyFatKnown ? parseFloat(formData.get('bodyfat')) : null;
    const dActivity = parseFloat(formData.get('dactivity'));
    const weightLiftingDays = parseInt(formData.get('weight_lifting_days'));
    const liftingDuration = parseInt(formData.get('lifting_duration'));
    const wlIntensity = parseFloat(formData.get('wl_intensity'));
    const cardioDays = parseInt(formData.get('cardio_days'));
    const cardioDuration = parseInt(formData.get('cardio_duration'));
    const cardioIntensity = parseFloat(formData.get('cardio_intensity'));

    // BMR Calculation
    let bmr;
    if (bodyFatKnown) {
      bmr = 370 + (21.6 * (weight * (1 - (bodyFat / 100))));
    } else if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // TDEE Calculation
    const activityFactor = dActivity;
    const weightLiftingCalories = (weightLiftingDays * liftingDuration * wlIntensity) / 7;
    const cardioCalories = (cardioDays * cardioDuration * cardioIntensity) / 7;
    const tdee = Math.round((bmr * activityFactor) + weightLiftingCalories + cardioCalories);

    setResults({
      bmr: Math.round(bmr),
      tdee,
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
    <div className="panel-heading bg-blue-500 text-white p-4 rounded-t-lg">Step 1 - Calculate Your Daily Caloric Expenditure (TDEE)</div>
    <div className="panel-body bg-black text-white p-4 rounded-b-lg">
      <form className="form-horizontal" onSubmit={calculateResults}>
        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2">Gender:</label>
          <div className="w-full sm:w-1/2">
            <label className="mr-4">
              <input type="radio" name="gender" value="male" className="mr-2" defaultChecked /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" className="mr-2" /> Female
            </label>
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2" htmlFor="age">Age:</label>
          <div className="w-full sm:w-1/2">
            <input type="number" className="form-control border p-2 w-full bg-black text-white" name="age" id="age" placeholder="in years" required />
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2" htmlFor="height">Height:</label>
          <div className="w-full sm:w-1/2">
            <input type="number" className="form-control border p-2 w-full bg-black text-white" name="height" id="height" placeholder="in cm" required />
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2" htmlFor="weight">Weight:</label>
          <div className="w-full sm:w-1/2">
            <input type="number" className="form-control border p-2 w-full bg-black text-white" name="weight" id="weight" placeholder="in kg" required />
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2">Do you know your body fat percentage (BF%)?</label>
          <div className="w-full sm:w-1/2">
            <label className="mr-4">
              <input type="radio" name="bodyfat_known" value="yes" className="mr-2" onChange={() => setShowBodyFat(true)} /> Yes
            </label>
            <label>
              <input type="radio" name="bodyfat_known" value="no" className="mr-2" onChange={() => setShowBodyFat(false)} defaultChecked /> No
            </label>
          </div>
        </div>

        {showBodyFat && (
          <div className="form-group flex flex-wrap mb-4">
            <label className="control-label w-full sm:w-1/2" htmlFor="bodyfat">Body Fat Percentage:</label>
            <div className="w-full sm:w-1/2">
              <input type="number" className="form-control border p-2 w-full bg-black text-white" name="bodyfat" id="bodyfat" placeholder="in %" />
            </div>
          </div>
        )}

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2">How would you describe your activity level (outside the gym)?</label>
          <div className="w-full sm:w-1/2">
            <label className="block">
              <input type="radio" value="1.1" name="dactivity" className="mr-2" /> Sedentary (most of the day sitting/office work)
            </label>
            <label className="block">
              <input type="radio" value="1.2" name="dactivity" className="mr-2" /> Moderately active (part of the day walking or doing some activity)
            </label>
            <label className="block">
              <input type="radio" value="1.3" name="dactivity" className="mr-2" /> Very active (manual work/delivery cycling)
            </label>
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2" htmlFor="weight_lifting_days">How many times a week do you lift weights?</label>
          <div className="w-full sm:w-1/2">
            <input type="number" className="form-control border p-2 w-full bg-black text-white" name="weight_lifting_days" id="weight_lifting_days" placeholder="times per week" required />
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2" htmlFor="lifting_duration">How long does each session usually last (in minutes)?</label>
          <div className="w-full sm:w-1/2">
            <input type="number" className="form-control border p-2 w-full bg-black text-white" name="lifting_duration" id="lifting_duration" placeholder="duration in minutes" required />
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
          <label className="control-label w-full sm:w-1/2">How intense are your workouts?</label>
          <div className="w-full sm:w-1/2">
            <label className="block">
              <input type="radio" value="3.5" name="wl_intensity" className="mr-2" /> Light (using low weights and heart rate does not elevate)
            </label>
            <label className="block">
              <input type="radio" value="5.5" name="wl_intensity" className="mr-2" /> Moderate (using challenging weights (75-80% RM), heart rate increases)
            </label>
            <label className="block">
              <input type="radio" value="7.5" name="wl_intensity" className="mr-2" /> High intensity (using maximum weights, little rest and/or advanced techniques)
            </label>
          </div>
        </div>

        <div className="form-group flex flex-wrap mb-4">
  <label className="control-label w-full sm:w-1/2" htmlFor="cardio_days">How many times a week do you do cardio?</label>
  <div className="w-full sm:w-1/2">
    <input type="number" className="form-control border p-2 w-full bg-black text-white" name="cardio_days" id="cardio_days" placeholder="times per week" required />
  </div>
</div>

<div className="form-group flex flex-wrap mb-4">
  <label className="control-label w-full sm:w-1/2" htmlFor="cardio_duration">How long does each cardio session usually last in minutes?</label>
  <div className="w-full sm:w-1/2">
    <input type="number" className="form-control border p-2 w-full bg-black text-white" name="cardio_duration" id="cardio_duration" placeholder="duration in minutes" required />
  </div>
</div>

<div className="form-group flex flex-wrap mb-4">
  <label className="control-label w-full sm:w-1/2">How intense are your cardio sessions?</label>
  <div className="w-full sm:w-1/2">
    <label className="block">
      <input type="radio" value="5" name="cardio_intensity" className="mr-2" /> Light (low intensity walking)
    </label>
    <label className="block">
      <input type="radio" value="7.5" name="cardio_intensity" className="mr-2" /> Moderate (running or cycling at moderate speed)
    </label>
    <label className="block">
      <input type="radio" value="10" name="cardio_intensity" className="mr-2" /> High intensity (HIIT or any activity where maximum effort is used)
    </label>
  </div>
</div>


              <div className="form-group flex justify-center">
                <button type="submit" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-lg">Calculate</button>
              </div>
            </form>

            {results && (
  <div className="bg-info p-4 mt-4 text-center font-semibold text-lg bg-black text-white rounded-lg">
    <div>Your Basal Metabolic Rate (BMR): <b className="label label-success">{results.bmr}</b></div>
    <div>Your Total Daily Energy Expenditure (TDEE): <b className="label label-success">{results.tdee}</b></div>
    <Link href={`/set-up-diet?bmr=${results.bmr}&tdee=${results.tdee}`}>
      <button className="btn btn-primary bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg">
        Set Up a Diet
      </button>
    </Link>
  </div>
)}

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