"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DietTable from './DietTable';

export default function Home() {
  const searchParams = useSearchParams();
  const bmr = searchParams.get('bmr');
  const tdee = searchParams.get('tdee');

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

      <div className="mt-16 w-full max-w-2xl bg-black bg-opacity-90 p-4 rounded-lg text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">Diet Setup</h2>
        {bmr && tdee && (
          <div className="bg-info p-4 mt-4 text-center font-semibold text-lg bg-black text-white rounded-lg">
            <div>Your Basal Metabolic Rate (BMR): <b className="label label-success">{bmr}</b></div>
            <div>Your Total Daily Energy Expenditure (TDEE): <b className="label label-success">{tdee}</b></div>
          </div>
        )}
        <DietTable />
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
