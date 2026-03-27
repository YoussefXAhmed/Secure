import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import VaultPage from './pages/VaultPage';
import TrashPage from './pages/TrashPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={token ? <DashboardPage /> : <LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/trash" element={<TrashPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;