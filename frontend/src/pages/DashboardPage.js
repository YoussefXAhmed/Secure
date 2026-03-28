import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState({});

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

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Layout>
      <h1 className="text-3xl mb-6 font-bold">📊 Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-5">
        {data.map(item => {
          const domain = item.site.includes('.')
            ? item.site
            : item.site + '.com';

          return (
            <div
              key={item._id}
              className="bg-gray-800 p-5 rounded-xl shadow hover:scale-105 transition border border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://logo.clearbit.com/${domain}`}
                  className="w-10 h-10 rounded bg-white"
                  onError={(e) => (e.target.style.display = 'none')}
                />

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

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    setShow(prev => ({
                      ...prev,
                      [item._id]: !prev[item._id]
                    }))
                  }
                  className="bg-yellow-500 px-3 py-1 rounded text-sm"
                >
                  👁
                </button>

                <button
                  onClick={() => copy(item.password)}
                  className="bg-green-500 px-3 py-1 rounded text-sm"
                >
                  📋
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}