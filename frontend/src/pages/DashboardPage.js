import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState({});
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://16.170.159.191:5000/passwords', {
      headers: { authorization: token }
    });
    setData(res.data);
  };

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredData = data.filter(item =>
    item.site.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="text-white">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold">📊 Dashboard</h1>

          <input
            placeholder="Search sites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
            <p className="text-gray-300 text-sm">Total Passwords</p>
            <h2 className="text-2xl font-bold">{data.length}</h2>
          </div>

          <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
            <p className="text-gray-300 text-sm">Visible</p>
            <h2 className="text-2xl font-bold">
              {Object.values(show).filter(Boolean).length}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
            <p className="text-gray-300 text-sm">Hidden</p>
            <h2 className="text-2xl font-bold">
              {data.length - Object.values(show).filter(Boolean).length}
            </h2>
          </div>
        </div>

        {/* Cards */}
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            😕 No passwords found
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {filteredData.map(item => (
              <div
                key={item._id}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-lg border border-white/20 hover:scale-105 transition duration-300"
              >
                {/* Site Name */}
                <h2 className="text-lg font-semibold capitalize mb-2">
                  {item.site}
                </h2>

                {/* Username */}
                <p className="text-gray-400 text-sm">
                  {item.username}
                </p>

                {/* Password */}
                <p className="text-indigo-300 mt-2 tracking-widest">
                  {show[item._id] ? item.password : '••••••••'}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() =>
                      setShow(prev => ({
                        ...prev,
                        [item._id]: !prev[item._id]
                      }))
                    }
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg text-sm transition"
                  >
                    {show[item._id] ? '🙈 Hide' : '👁 Show'}
                  </button>

                  <button
                    onClick={() => copy(item.password, item._id)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg text-sm transition"
                  >
                    {copiedId === item._id ? '✅ Copied' : '📋 Copy'}
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}