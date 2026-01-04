// Logique
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DemandeRendezVousSchema } from '@/lib/validators';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { useAuthStore } from '@/store/useAuthStore';
import type { AppointmentRequestData, FormErrors } from '../types/appointment.types';

export const useAppointmentRequest = () => {
  const navigate = useNavigate();
  const addAppointment = useAppointmentStore((state) => state.addAppointment);
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<AppointmentRequestData>({
    docteurId: '',
    raison: '',
    commentairesSupplementaires: '',
    dateRendezVous: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation avec Zod
    const result = DemandeRendezVousSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const errorsObj: FormErrors = {};

      Object.keys(fieldErrors).forEach((key) => {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          errorsObj[key] = messages[0];
        }
      });

      setErrors(errorsObj);
      setIsLoading(false);
      return;
    }

    // Simulation API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Créer le rendez-vous
      const newAppointment = {
        id: crypto.randomUUID(),
        patientName: user?.email || 'Patient',
        doctorId: result.data.docteurId,
        reason: result.data.raison,
        date: result.data.dateRendezVous,
        status: 'pending' as const,
      };

      // Sauvegarder dans Zustand
      addAppointment(newAppointment);

      // Redirection vers page de succès
      navigate('/appointment-success');
    } catch (error) {
      console.error('Erreur:', error);
      setErrors({ general: 'Une erreur est survenue' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};