import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import DonorRegister from './pages/DonorRegister';
import DonorLogin from './pages/DonorLogin';
import DonorDashboard from './pages/DonorDashboard';
import EditDonorProfile from './pages/EditDonorProfile';

import RecipientRegister from './pages/RecipientRegister';
import RecipientLogin from './pages/RecipientLogin';
import RecipientDashboard from './pages/RecipientDashboard';
import SearchDonors from './pages/SearchDonors';
import CreateRequest from './pages/CreateRequest';
import ViewRequests from './pages/ViewRequests';

import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/donor/register" element={<DonorRegister />} />
          <Route path="/donor/login" element={<DonorLogin />} />
          <Route path="/donor/dashboard" element={<ProtectedRoute role="donor"><DonorDashboard /></ProtectedRoute>} />
          <Route path="/donor/edit" element={<ProtectedRoute role="donor"><EditDonorProfile /></ProtectedRoute>} />

          <Route path="/recipient/register" element={<RecipientRegister />} />
          <Route path="/recipient/login" element={<RecipientLogin />} />
          <Route path="/recipient/dashboard" element={<ProtectedRoute role="recipient"><RecipientDashboard /></ProtectedRoute>} />
          <Route path="/recipient/request/new" element={<ProtectedRoute role="recipient"><CreateRequest /></ProtectedRoute>} />
          <Route path="/recipient/requests" element={<ProtectedRoute role="recipient"><ViewRequests /></ProtectedRoute>} />

          <Route path="/search" element={<SearchDonors />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
