import { create } from 'zustand';

// Type simple pour l'utilisateur
type User = {
  id: string;
  email: string;
  role: 'patient' | 'admin'; // extensible plus tard (doctor)
};

// Structure complète du store Auth
type AuthState = {
  user: User | null;          // utilisateur connecté
  isAuthenticated: boolean;  // état global d'authentification
  adminPinVerified: boolean; // sécurité pour le dashboard admin

  login: (user: User) => void;
  logout: () => void;
  verifyAdminPin: (pin: string) => boolean;
};

export const useAuthStore = create<AuthState>((set) => ({
  // =====================
  // ÉTAT INITIAL
  // =====================
  user: null,
  isAuthenticated: false,
  adminPinVerified: false,

  // =====================
  // CONNEXION
  // =====================
  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  // =====================
  // DÉCONNEXION
  // =====================
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      adminPinVerified: false, // reset sécurité admin
    }),

  // =====================
  // VÉRIFICATION PIN ADMIN
  // =====================
  verifyAdminPin: (pin) => {
    const ADMIN_PIN = '123456'; // mock (sera remplacé par l’API)

    if (pin === ADMIN_PIN) {
      set({ adminPinVerified: true });
      return true;
    }

    return false;
  },
}));
