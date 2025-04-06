import { useAuth } from '../Contexts/AuthContext';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Note Taking App
        </h1>
        {user && (
          <div className="flex items-center space-x-6">
            <span className="text-white text-lg font-medium">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}