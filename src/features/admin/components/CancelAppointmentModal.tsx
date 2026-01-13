import React, { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { Textarea } from '@/components/Textarea/Textarea';
import { AnnulationRendezVousSchema } from '@/lib/validators';

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
  patientName: string;
  onCancel: (appointmentId: string, reason: string) => void;
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  appointmentId,
  patientName,
  onCancel,
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');

    // ✅ Validation avec votre schema Zod
    const result = AnnulationRendezVousSchema.safeParse({ raisonAnnulation: reason });

    if (!result.success) {
      const fieldError = result.error.flatten().fieldErrors.raisonAnnulation?.[0];
      setError(fieldError || 'Raison invalide');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onCancel(appointmentId, reason);
      onClose();
      setReason('');
    } catch (err) {
      console.error('Cancel error:', err);
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-dark-light rounded-xl border border-dark-lighter w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-lighter">
          <h2 className="text-white text-lg font-semibold">Cancel Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-secondary hover:text-white transition"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-gray-secondary text-sm mb-5">
            Are you sure you want to cancel your appointment?
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Reason for cancellation */}
            <Textarea
              name="raisonAnnulation"
              label="Reason for cancellation"
              placeholder="ex: Urgent meeting came up"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError('');
              }}
              error={error}
              rows={3}
            />

            {/* Cancel Button - Rouge */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !reason.trim()}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Cancelling...</span>
                </div>
              ) : (
                'Cancel appointment'
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};