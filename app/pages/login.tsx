import { useRouter } from 'next/router';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Sign in with Google
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
