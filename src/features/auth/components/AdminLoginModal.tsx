import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/Modal/Modal';
import { Input } from '@/components/Input/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { AdminPinVerificationModal } from './AdminPinVerificationModal';
import { z } from 'zod';

/* ================= ICONS ================= */

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

/* ================= ZOD ================= */

const AdminLoginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

/* ================= COMPONENT ================= */

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // ✅ DÉPLACÉ ICI, À L'INTÉRIEUR DU COMPOSANT
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const login = useAuthStore((state) => state.login);

  /* ================= HANDLERS ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  const handleSubmit = async () => {
    setErrors({});

    const parsed = AdminLoginSchema.safeParse(formData);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setIsLoading(true);

    // ✅ NORMALISATION ICI
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    await new Promise(res => setTimeout(res, 1000));

    if (email === 'admin@carepulse.com' && password === 'admin123') {
      setShowPinModal(true);
    } else {
      setErrors({ general: 'Email ou mot de passe incorrect' });
    }

    setIsLoading(false);
  };

  const handlePinSuccess = () => {
    console.log('✅ PIN verified successfully');
    
    // PIN valide → Connexion complète
    login({
      id: 'admin-001',
      email: formData.email,
      role: 'admin',
    });

    // Fermer tous les modals
    setShowPinModal(false);
    onClose();

    // Rediriger vers le dashboard admin
    navigate('/admin/dashboard');
    
    console.log('✅ Connexion admin complète - Redirection vers /admin/dashboard');
  };

  /* ================= RENDER ================= */

  return (
    <>
      <Modal isOpen={isOpen && !showPinModal} onClose={onClose}>
        <div className="bg-dark-light rounded-2xl border border-dark-lighter shadow-xl">
          <div className="flex justify-between items-center p-6 border-b border-dark-lighter">
            <h2 className="text-white text-xl font-semibold">Connectez-vous à votre compte</h2>
            <button 
              onClick={onClose}
              className="text-gray-secondary hover:text-white transition"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-6 space-y-5">

            {errors.general && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-500 text-sm">{errors.general}</p>
              </div>
            )}

            <Input
              name="email"
              type="email"
              label="E-mail"
              placeholder="admin@carepulse.com"
              value={formData.email}
              onChange={handleChange}
              icon={<MailIcon />}
              error={errors.email?.[0]}
            />

            <Input
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              icon={<LockIcon />}
              error={errors.password?.[0]}
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 py-3 rounded-lg text-white font-semibold transition-colors shadow-green"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>

            <div className="p-3 bg-dark rounded-lg border border-dark-lighter">
              <p className="text-xs text-gray-secondary">
                <strong className="text-white">Test :</strong> admin@carepulse.com / admin123
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <AdminPinVerificationModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
      />
    </>
  );
};