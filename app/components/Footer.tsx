// app/components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          MyDiet Planner
        </Link>
        <div className="flex space-x-4">
          <Link href="/dashboard" className="text-white hover:text-blue-300">
            Dashboard
          </Link>
          <Link href="/profile" className="text-white hover:text-blue-300">
            Profile
          </Link>
          <Link href="/login" className="text-white hover:text-blue-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
