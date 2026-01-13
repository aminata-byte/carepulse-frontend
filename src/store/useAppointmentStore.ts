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
  appointments: [
  {
    id: '1',
    patientName: 'Phoenix Baker',
    doctorId: 'Dr. John Smith',
    reason: 'Annual monthly check-up',
    date: '2026-01-15T10:00:00',
    status: 'scheduled',
  },
  {
    id: '2',
    patientName: 'Candice Wu',
    doctorId: 'Dr. Sarah Johnson',
    reason: 'Follow-up consultation',
    date: '2026-01-16T14:30:00',
    status: 'pending',
  },
  {
    id: '3',
    patientName: 'Lana Steiner',
    doctorId: 'Dr. Michael Williams',
    reason: 'Routine checkup',
    date: '2026-01-18T09:00:00',
    status: 'cancelled',
  },
  {
    id: '4',
    patientName: 'Drew Cano',
    doctorId: 'Dr. John Smith',
    reason: 'Blood test results review',
    date: '2026-01-20T11:00:00',
    status: 'scheduled',
  },
  {
    id: '5',
    patientName: 'Natali Craig',
    doctorId: 'Dr. Sarah Johnson',
    reason: 'Physical examination',
    date: '2026-01-22T15:00:00',
    status: 'pending',
  },
],

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
