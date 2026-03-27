import { useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const token = localStorage.getItem('token');

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      return toast.error("Fill all fields ❌");
    }

    try {
      await axios.put(
        'http://localhost:5000/change-password',
        { oldPassword, newPassword },
        { headers: { authorization: token } }
      );

      toast.success("Password Updated 🔐");

      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error("Wrong old password ❌");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl mb-6">⚙️ Settings</h1>

      <div className="bg-gray-800 p-5 rounded w-96">
        <h2 className="mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          className="w-full mb-3 p-2 bg-gray-700 rounded"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2 bg-gray-700 rounded"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />

        <button
          onClick={changePassword}
          className="bg-blue-600 px-4 py-2 rounded w-full"
        >
          Change Password
        </button>
      </div>
    </Layout>
  );
}