// app/pages/dashboard.tsx
import Navbar from '../components/Navbar';
import FoodSearch from '../components/FoodSearch';
import IntakeTracker from '../components/IntakeTracker';

const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <FoodSearch />
        <IntakeTracker />
      </main>
    </div>
  );
};

//comment from Arthur

export default DashboardPage;
