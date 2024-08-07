// app/pages/profile.tsx
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Perfil</h1>
        <p>Atualize suas informações pessoais e metas de dieta.</p>
        {/* Formulário para atualizar informações do usuário */}
      </main>
    </div>
  );
};

export default ProfilePage;
