import { create } from 'zustand';

// Données personnelles + médicales du patient
type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Données médicales
  bloodType?: string;
  allergies?: string;
  chronicDiseases?: string;
};

type ProfileState = {
  profile: Profile | null;
  isLoading: boolean;

  setProfile: (profile: Profile) => void;
  updateProfile: (data: Partial<Profile>) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  // État initial
  profile: null,
  isLoading: false,

  // Charger le profil depuis l'API
  setProfile: (profile) => set({ profile }),

  // Mise à jour partielle (édition profil)
  updateProfile: (data) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, ...data }
        : null,
    })),

  // Nettoyage à la déconnexion
  clearProfile: () => set({ profile: null }),
}));
