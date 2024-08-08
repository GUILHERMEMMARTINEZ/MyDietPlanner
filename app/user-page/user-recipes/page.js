"use client";

import { useUserAuth } from "../_utils/auth-context";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const sampleDiets = [
  { id: 1, name: 'Keto Diet', description: 'A high-fat, low-carb diet.' },
  { id: 2, name: 'Mediterranean Diet', description: 'A diet based on the eating habits of countries bordering the Mediterranean Sea.' },
  { id: 3, name: 'Vegan Diet', description: 'A diet that excludes all animal products.' },
  { id: 4, name: 'Paleo Diet', description: 'A diet based on the types of foods presumed to have been eaten by early humans.' },
  { id: 5, name: 'Low-Carb Diet', description: 'A diet that limits carbohydrates, such as those found in sugary foods, pasta, and bread.' },
];

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/user-page');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <main className="relative flex flex-col items-center min-h-screen p-24 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
      <header className="fixed top-0 w-full bg-gray-800 bg-opacity-80 text-white flex justify-between items-center p-4">
        <nav className="flex space-x-4 header-nav">
          <Link href="/">
            <span className="hover:text-yellow-300 cursor-pointer">Home</span>
          </Link>
        </nav>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center space-y-8 mt-16 w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-yellow-300">
          User Diets
        </h1>
        <div className="flex flex-col w-full max-w-4xl space-y-4">
          {sampleDiets.map((diet) => (
            <div key={diet.id} className="p-4 bg-gray-700 bg-opacity-80 rounded-lg text-white">
              <h2 className="text-2xl font-semibold">{diet.name}</h2>
              <p>{diet.description}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="fixed bottom-0 w-full bg-gray-800 bg-opacity-80 text-white flex justify-between items-center p-4">
        <div className="font-mono text-sm">
          Developed by Art and Gui
        </div>
      </footer>
    </main>
  );
}
