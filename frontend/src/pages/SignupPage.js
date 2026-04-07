// src/pages/SignupPage.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nav = useNavigate();

  const signup = async () => {
    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    try {
      setLoading(true);
      setError('');

      await axios.post('http://13.60.209.185:5000/signup', { email, password });

      nav('/');
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
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

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            onClick={signup}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition duration-300 font-semibold shadow-lg"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}