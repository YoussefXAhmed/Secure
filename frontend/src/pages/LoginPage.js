import { BASE_URL } from '../api';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome 👋
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">

          <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition duration-300 font-semibold shadow-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}