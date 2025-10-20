import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './layouts/AppShell.jsx';
import Welcome from './pages/Welcome.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Login from './pages/Login.jsx';
import RegisterUser from './pages/RegisterUser.jsx';
import Home from './pages/Home.jsx';
import AddPet from './pages/AddPet.jsx';
import Pets from './pages/Pets.jsx';
import Services from './pages/Services.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Welcome />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="home" element={<Home />} />
        <Route path="pets" element={<Pets />} />
        <Route path="pets/add" element={<AddPet />} />
        <Route path="services" element={<Services />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
