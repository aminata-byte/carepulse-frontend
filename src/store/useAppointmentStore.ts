import { create } from 'zustand';

export type AppointmentStatus = 'pending' | 'scheduled' | 'cancelled';

export type Appointment = {
  id: string;
  patientName: string;
  doctorId: string;
  reason: string;
  date: string;
  status: AppointmentStatus;
};

type AppointmentState = {
  appointments: Appointment[];

  addAppointment: (appointment: Appointment) => void;
  updateStatus: (id: string, status: AppointmentStatus) => void;
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  // Liste globale des RDV
  appointments: [],

  // Patient crée une demande de RDV
  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment],
    })),

  // Admin change le statut (schedule / cancel)
  updateStatus: (id, status) =>
    set((state) => ({
      appointments: state.appointments.map((appt) =>
        appt.id === id ? { ...appt, status } : appt
      ),
    })),
}));
