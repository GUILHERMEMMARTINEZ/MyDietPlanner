// app/page.tsx
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao MyDiet Planner!</h1>
        <p className="mb-4">
          Calcule suas necessidades diárias de calorias e macronutrientes e acompanhe sua dieta com facilidade.
        </p>
        <a
          href="/login"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Comece Agora
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
