import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import toast from 'react-hot-toast';

export default function TrashPage() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const res = await axios.get('http://16.170.159.191:5000/trash', {
      headers: { authorization: token }
    });
    setData(res.data);
  };

  const restore = async (id) => {
    await axios.put(`http://16.170.159.191:5000/restore/${id}`, {}, {
      headers: { authorization: token }
    });

    toast.success("Restored ✅");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl text-red-400 mb-4">🗑️ Trash</h1>

      {data.map(item => (
        <div key={item._id} className="bg-gray-800 p-3 mb-2 rounded">
          <p>{item.site}</p>

          <button
            onClick={() => restore(item._id)}
            className="bg-green-600 px-3 py-1 rounded mt-2"
          >
            Restore
          </button>
        </div>
      ))}
    </Layout>
  );
}