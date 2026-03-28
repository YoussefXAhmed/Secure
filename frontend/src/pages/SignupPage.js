// src/pages/SignupPage.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const signup = async () => {
    await axios.post('http://16.170.159.191:5000/signup', { email, password });
    nav('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-80">
        <h2 className="text-2xl mb-4">Signup</h2>
        <input className="w-full mb-2 p-2 bg-gray-700" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="w-full mb-2 p-2 bg-gray-700" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={signup} className="w-full bg-green-600 p-2">Signup</button>
      </div>
    </div>
  );
}