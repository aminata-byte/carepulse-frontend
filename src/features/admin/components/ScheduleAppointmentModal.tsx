import React, { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { Select } from '@/components/Select/Select';
import { Input } from '@/components/Input/Input';
import { Textarea } from '@/components/Textarea/Textarea';
import { Button } from '@/components/Button/Button';
import { useDoctorStore } from '@/store/useDoctorStore';
import { PlanifierRendezVousSchema } from '@/lib/validators';

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
  patientName: string;
  onSchedule: (appointmentId: string, scheduleData: any) => void;
}

export const ScheduleAppointmentModal: React.FC<ScheduleAppointmentModalProps> = ({
  isOpen,
  onClose,
  appointmentId,
  patientName,
  onSchedule,
}) => {
  const { doctors } = useDoctorStore();
  
  const [formData, setFormData] = useState({
    docteurId: '',
    raison: '',
    dateRendezVous: '',
  });
  
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  const handleSubmit = async () => {
    setErrors({});

    const result = PlanifierRendezVousSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        docteurId: fieldErrors.docteurId?.[0],
        raison: fieldErrors.raison?.[0],
        dateRendezVous: fieldErrors.dateRendezVous?.[0],
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSchedule(appointmentId, formData);
      onClose();
      setFormData({
        docteurId: '',
        raison: '',
        dateRendezVous: '',
      });
    } catch (error) {
      console.error('Schedule error:', error);
      setErrors({ general: 'Une erreur est survenue' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-dark-light rounded-xl border border-dark-lighter w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-lighter">
          <h2 className="text-white text-lg font-semibold">Schedule Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-secondary hover:text-white transition"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-gray-secondary text-xs mb-5">
            Please fill in the following details to schedule
          </p>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Doctor */}
            <Select
              name="docteurId"
              label="Doctor"
              value={formData.docteurId}
              onChange={handleChange}
              error={errors.docteurId}
              options={[
                { value: '', label: 'Select a doctor' },
                ...doctors.map(doctor => ({
                  value: doctor.id,
                  label: `Dr. ${doctor.name}`,
                })),
              ]}
            />

            {/* Reason */}
            <Textarea
              name="raison"
              label="Reason for appointment"
              placeholder="ex: Annual monthly check-up"
              value={formData.raison}
              onChange={handleChange}
              error={errors.raison}
              rows={2}
            />

            {/* Date */}
            <Input
              type="datetime-local"
              name="dateRendezVous"
              label="Expected appointment date"
              placeholder="Select your appointment date"
              icon={<CalendarIcon />}
              value={formData.dateRendezVous}
              onChange={handleChange}
              error={errors.dateRendezVous}
            />

            <Button onClick={handleSubmit} isLoading={isLoading}>
              Schedule appointment
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};