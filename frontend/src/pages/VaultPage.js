import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import toast from 'react-hot-toast';

export default function VaultPage() {
  const [data, setData] = useState([]);
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState({});

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/passwords', {
      headers: { authorization: token }
    });
    setData(res.data);
  };

  const add = async () => {
    if (!site || !username || !password) {
      return toast.error("Fill all fields ❌");
    }

    await axios.post(
      'http://localhost:5000/passwords',
      { site, username, password },
      { headers: { authorization: token } }
    );

    toast.success("Saved 🔐");

    setSite('');
    setUsername('');
    setPassword('');
    fetchData();
  };

  const del = async (id) => {
    await axios.delete(`http://localhost:5000/passwords/${id}`, {
      headers: { authorization: token }
    });

    toast("Moved to Trash 🗑️");
    fetchData();
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied 📋");
  };

  const strength = password.length > 10 ? "Strong 💪" : "Weak ⚠️";

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl mb-6 font-bold">🔐 Vault</h1>

      {/* Add Form */}
      <div className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-xl mb-6 flex gap-2 flex-wrap border border-gray-700">
        <input
          className="bg-gray-700 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Site (example: facebook)"
          value={site}
          onChange={e => setSite(e.target.value)}
        />

        <input
          className="bg-gray-700 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          className="bg-gray-700 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={add}
          className="bg-blue-600 hover:bg-blue-700 px-5 rounded transition"
        >
          Add
        </button>

        <p className="text-sm text-gray-400 w-full">{strength}</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {data.map(item => {
          const domain = item.site.includes('.')
            ? item.site
            : item.site + '.com';

          return (
            <div
              key={item._id}
              className="bg-gray-800/70 backdrop-blur-lg p-5 rounded-xl shadow hover:scale-105 hover:shadow-blue-500/20 transition duration-300 border border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">

                {/* Logo */}
                <img
                  src={`https://logo.clearbit.com/${domain}`}
                  alt="logo"
                  className="w-10 h-10 rounded bg-white"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Site name */}
                <h2 className="text-xl font-semibold capitalize">
                  {item.site}
                </h2>
              </div>

              {/* Username */}
              <p className="text-gray-400 text-sm">{item.username}</p>

              {/* Password */}
              <p className="text-yellow-400 mt-1 tracking-widest">
                {show[item._id] ? item.password : '••••••••'}
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setShow(prev => ({
                        ...prev,
                        [item._id]: !prev[item._id]
                      }))
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    👁
                  </button>

                  <button
                    onClick={() => copy(item.password)}
                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
                  >
                    📋
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSite(item.site);
                      setUsername(item.username);
                      setPassword(item.password);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => del(item._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    🗑
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}