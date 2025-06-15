import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LanguageProvider, AdminProvider } from "./contexts";
import {
  HomePage,
  AboutPage
} from "./components";
import {
  DepartmentsPage,
  DoctorsPage,
  ServicesPage,
  NewsPage,
  ContactPage,
  AppointmentPage
} from "./pages";
import { DoctorDashboard } from "./doctor-admin-components";
import UnifiedAdminPanel from "./unified-admin";
import { TestAccountsPage } from "./TestAccounts";
import { VacanciesPage, GalleryPage } from "./AdditionalPages";
import { NewsDetailPage } from "./NewsDetail";

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
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/admin" element={<UnifiedAdminPanel />} />
              <Route path="/test-accounts" element={<TestAccountsPage />} />
              <Route path="/vacancies" element={<VacanciesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AdminProvider>
    </LanguageProvider>
  );
}

export default App;