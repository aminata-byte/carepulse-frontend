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
  // ✅ Docteurs par défaut (mock data en attendant l'API)
  doctors: [
    { 
      id: 'dr-smith', 
      name: 'Dr. Adam Smith', 
      specialty: 'General Practitioner',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    { 
      id: 'dr-johnson', 
      name: 'Dr. Sarah Johnson', 
      specialty: 'Cardiologist',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    { 
      id: 'dr-williams', 
      name: 'Dr. Michael Williams', 
      specialty: 'Pediatrician',
      avatar: 'https://i.pravatar.cc/150?img=33'
    },
  ],
  
  selectedDoctor: null,

  // Charger les docteurs depuis API (remplacera les mocks plus tard)
  setDoctors: (doctors) => set({ doctors }),

  // Sélection depuis dropdown
  selectDoctor: (doctor) => set({ selectedDoctor: doctor }),
}));