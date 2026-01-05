import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { useDoctorStore } from '@/store/useDoctorStore';
import { Button } from '@/components/Button/Button';

export const AppointmentSuccessPage = () => {
  const navigate = useNavigate();
  const appointments = useAppointmentStore((state) => state.appointments);
  const doctors = useDoctorStore((state) => state.doctors);

  // Récupérer le dernier rendez-vous créé
  const lastAppointment = appointments[appointments.length - 1];

  // Trouver le docteur correspondant
  const doctor = doctors.find((doc) => doc.id === lastAppointment?.doctorId);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + ' - ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-dark py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* ==================== CARD DE SUCCÈS ==================== */}
        <div className="bg-dark-light rounded-2xl border border-dark-lighter shadow-xl p-8 lg:p-12">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <span className="text-white text-2xl font-bold">CarePulse</span>
          </div>

          {/* Contenu principal */}
          <div className="text-center">
            
            {/* Icône de succès */}
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Animation pulse */}
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            </div>

            {/* Titre */}
            <h1 className="text-white text-3xl lg:text-4xl font-bold mb-3">
              Your <span className="text-primary">appointment request</span> has been successfully submitted!
            </h1>

            {/* Sous-titre */}
            <p className="text-gray-secondary text-lg mb-12">
              We'll be in touch shortly to confirm.
            </p>

            {/* ✅ Détails du rendez-vous STYLE SIMPLE */}
            {lastAppointment && (
              <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-gray-secondary text-sm">
                <span>Requested appointment details:</span>
                
                {/* Docteur */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-white">
                    {doctor?.name || 'Dr. Adam Smith'}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white">
                    {formatDate(lastAppointment.date)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="w-full"
            >
              New Appointment
            </Button>

            <button
              onClick={() => navigate('/admin')}
              className="w-full text-gray-secondary hover:text-primary transition text-sm"
            >
              Go to Admin Dashboard →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};