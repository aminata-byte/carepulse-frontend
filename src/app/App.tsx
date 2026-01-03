import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InscriptionPatient } from '@/features/auth/components/InscriptionPatient';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InscriptionPatient />} />
        {/* Ajouter d'autres routes ici */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;




// ✅ features/auth/components/InscriptionPatient.tsx  → UI
// ✅ features/auth/hooks/useInscription.ts            → Logique
// ✅ features/auth/services/authService.ts            → API
// ✅ features/auth/types/auth.types.ts                → Types
// ✅ components/Input/Input.tsx                       → Réutilisable
// ✅ components/Button/Button.tsx                     → Réutilisable
// ✅ store/useAuthStore.ts                            → État global
// ✅ lib/validators.ts                                → Validation