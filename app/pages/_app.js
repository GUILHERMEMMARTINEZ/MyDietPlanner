import '../styles/globals.css';
import { AuthContextProvider } from './_utils/auth-context';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <AuthContextProvider>
      <Component {...pageProps} key={router.route} />
    </AuthContextProvider>
  );
}

export default MyApp;
