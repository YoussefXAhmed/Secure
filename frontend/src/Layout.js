import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const linkStyle = (path) =>
    `block px-3 py-2 rounded transition ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700'
    }`;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900/80 backdrop-blur-lg p-6 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-8">🔐 SECURE</h2>

        <nav className="space-y-2">
          <Link to="/dashboard" className={linkStyle('/dashboard')}>Dashboard</Link>
          <Link to="/vault" className={linkStyle('/vault')}>Passwords</Link>
          <Link to="/trash" className={linkStyle('/trash')}>Trash</Link>
          <Link to="/settings" className={linkStyle('/settings')}>Settings</Link>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-semibold">Welcome 👋</h1>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded transition"
          >
            Logout
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}