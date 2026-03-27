import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const login = async () => {
    const res = await axios.post('http://localhost:5000/login', { email, password });
    localStorage.setItem('token', res.data.token);
    nav('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded w-80">
        <h2 className="text-2xl mb-4">Login</h2>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 bg-gray-700" />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full mb-2 p-2 bg-gray-700" />

        <button onClick={login} className="w-full bg-blue-600 p-2">Login</button>

        <p className="mt-4 text-center">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}