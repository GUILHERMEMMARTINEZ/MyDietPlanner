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

      <footer className="fixed bottom-0 w-full bg-gray-800 bg-opacity-80 text-white flex justify-between items-center p-4">
        <div className="font-mono text-sm">
          Developed by Art and Gui
        </div>
      </footer>
    </main>
  );
}
