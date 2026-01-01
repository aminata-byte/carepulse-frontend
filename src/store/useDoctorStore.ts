import { create } from 'zustand';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
};

type DoctorState = {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;

  setDoctors: (doctors: Doctor[]) => void;
  selectDoctor: (doctor: Doctor) => void;
};

export const useDoctorStore = create<DoctorState>((set) => ({
  doctors: [],
  selectedDoctor: null,

  // Charger les docteurs depuis API
  setDoctors: (doctors) => set({ doctors }),

  // Sélection depuis dropdown
  selectDoctor: (doctor) => set({ selectedDoctor: doctor }),
}));
