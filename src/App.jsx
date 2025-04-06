import { AuthProvider, useAuth } from './Contexts/AuthContext';
import Auth from './Components/Auth';
import Header from './Components/Header';
import NoteList from './Components/NoteList';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <>
          <Header />
          <main>
            <NoteList />
          </main>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}