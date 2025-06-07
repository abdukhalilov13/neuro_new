import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LanguageProvider, AdminProvider } from "./contexts";
import {
  HomePage,
  AboutPage,
  DepartmentsPage,
  DoctorsPage,
  ServicesPage,
  NewsPage,
  ContactPage,
  AppointmentPage,
  DoctorDashboard,
  AdminPanel
} from "./components";

function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <div className="App min-h-screen bg-white">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AdminProvider>
    </LanguageProvider>
  );
}

export default App;