import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen p-24 bg-cover bg-center" style={{ backgroundImage: "url('/background.png')" }}>
      <header className="fixed top-0 w-full bg-gray-800 bg-opacity-80 text-white flex justify-between items-center p-4">
        <nav className="flex space-x-4 header-nav">
          <Link href="/">
            <span className="hover:text-yellow-300 cursor-pointer">Home</span>
          </Link>
        </nav>
        <div className="font-mono text-sm">
          <Link href="/user-page">
            <span className="hover:text-yellow-300 cursor-pointer">Login</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-grow flex flex-col items-center justify-center space-y-8 mt-16 w-full">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Diet Planner Logo" width={500} height={500} />
        </div>
        <div className="bg-gray-800 bg-opacity-40 p-4 rounded-lg w-2/3">
          <Link href="/plan-your-diet">
            <div className="flex items-center space-x-4">
              <Image src="/diet.png" alt="dietPlanner" width={150} height={150} className="rounded-full" />
              <span className="text-2xl font-semibold text-white cursor-pointer">
                Plan your diet
              </span>
            </div>
          </Link>
        </div>
        <div className="bg-gray-800 bg-opacity-40 p-4 rounded-lg w-2/3">
          <Link href="/fitness-recipes">
            <div className="flex items-center space-x-4">
              <Image src="/fitnessrecipes.png" alt="fitnessRecipes" width={150} height={150} className="rounded-full" />
              <span className="text-2xl font-semibold text-white cursor-pointer">
                Fitness recipes
              </span>
            </div>
          </Link>
        </div>
        <div className="bg-gray-800 bg-opacity-40 p-4 rounded-lg w-2/3">
          <Link href="/training-tips">
            <div className="flex items-center space-x-4">
              <Image src="/trainingtips.png" alt="trainingTips" width={150} height={150} className="rounded-full" />
              <span className="text-2xl font-semibold text-white cursor-pointer">
                Training Tips
              </span>
            </div>
          </Link>
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
