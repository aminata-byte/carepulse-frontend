import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InscriptionPatient } from '@/features/auth/components/InscriptionPatient';
import { PatientFormPage } from '@/features/profile/components/PatientFormPage';
import { AppointmentRequestPage } from '@/features/appointments/components/AppointmentRequestPage';
import { AppointmentSuccessPage } from '@/features/appointments/components/AppointmentSuccessPage';
import { AdminDashboard } from '@/features/auth/components/AdminDashboard'; // ← AJOUTER

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1️⃣ Inscription */}
        <Route path="/" element={<InscriptionPatient />} />
        
        {/* 2️⃣ Formulaire patient complet */}
        <Route path="/complete-profile" element={<PatientFormPage />} />
        
        {/* 3️⃣ Demande de rendez-vous */}
        <Route path="/demande-rendez-vous" element={<AppointmentRequestPage />} />
        
        {/* 4️⃣ Page de succès */}
        <Route path="/appointment-success" element={<AppointmentSuccessPage />} />
        
        {/* 5️⃣ Dashboard Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* ← AJOUTER */}
        
        {/* Redirection si route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
