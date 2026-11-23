import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LenisProvider } from './context/LenisContext';
import { PageTransitionProvider } from './context/PageTransitionContext';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <PageTransitionProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransitionProvider>
      </LenisProvider>
    </BrowserRouter>
  );
}
