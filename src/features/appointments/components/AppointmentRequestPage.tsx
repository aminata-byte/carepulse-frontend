// Page principale
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Select } from '@/components/Select/Select';
import { Textarea } from '@/components/Textarea/Textarea';
import { useAppointmentRequest } from '../hooks/useAppointmentRequest';

export const AppointmentRequestPage = () => {
  const { formData, errors, isLoading, handleChange, handleSubmit } = useAppointmentRequest();

  const docteurs = [
    { value: 'dr-smith', label: 'Dr. Adam Smith' },
    { value: 'dr-johnson', label: 'Dr. Sarah Johnson' },
    { value: 'dr-williams', label: 'Dr. Michael Williams' },
  ];

  return (
    <div className="min-h-screen bg-dark py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ==================== CARD PRINCIPALE ==================== */}
        <div className="bg-dark-light rounded-2xl border border-dark-lighter shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* ==================== PARTIE GAUCHE : FORMULAIRE ==================== */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
                <span className="text-white text-2xl font-bold">CarePulse</span>
              </div>

              {/* Titre */}
              <h1 className="text-white text-4xl font-bold mb-2">
                Hey there 👋
              </h1>
              <p className="text-gray-secondary mb-8">
                Request a new appointment in 10 seconds
              </p>

              {/* Erreur générale */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                  <p className="text-red-500 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Docteur */}
                <Select
                  label="Doctor"
                  name="docteurId"
                  options={docteurs}
                  placeholder="Select a doctor"
                  value={formData.docteurId}
                  onChange={handleChange}
                  error={errors.docteurId}
                />

                {/* Raison & Commentaires */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Textarea
                    label="Reason for appointment"
                    name="raison"
                    placeholder="ex. Annual monthly check-up"
                    value={formData.raison}
                    onChange={handleChange}
                    error={errors.raison}
                  />
                  <Textarea
                    label="Additional comments/notes"
                    name="commentairesSupplementaires"
                    placeholder="ex. Prefer afternoon appointments, if possible"
                    value={formData.commentairesSupplementaires}
                    onChange={handleChange}
                    error={errors.commentairesSupplementaires}
                  />
                </div>

                {/* Date */}
                <Input
                  label="Expected appointment date"
                  name="dateRendezVous"
                  type="datetime-local"
                  placeholder="Select your appointment date"
                  value={formData.dateRendezVous}
                  onChange={handleChange}
                  error={errors.dateRendezVous}
                />

                {/* Bouton */}
                <Button type="submit" isLoading={isLoading}>
                  Submit and continue
                </Button>
              </form>
            </div>

            {/* ==================== PARTIE DROITE : GRAPHIQUE MÉDICAL ==================== */}
            <div className="hidden lg:block relative bg-[#0D0F10] overflow-hidden">
              {/* Graphique médical stylisé (lignes ECG) */}
              <svg 
                className="absolute inset-0 w-full h-full opacity-30" 
                viewBox="0 0 600 400"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Grille de fond */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(36, 174, 124, 0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Ligne ECG principale */}
                <path
                  d="M 50 200 L 100 200 L 120 150 L 140 250 L 160 180 L 180 200 L 250 200 L 270 150 L 290 250 L 310 180 L 330 200 L 400 200 L 420 150 L 440 250 L 460 180 L 480 200 L 550 200"
                  fill="none"
                  stroke="#24AE7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
                
                {/* Ligne ECG secondaire */}
                <path
                  d="M 50 280 L 100 280 L 115 260 L 130 300 L 145 275 L 160 280 L 250 280 L 265 260 L 280 300 L 295 275 L 310 280 L 400 280 L 415 260 L 430 300 L 445 275 L 460 280 L 550 280"
                  fill="none"
                  stroke="#24AE7C"
                  strokeWidth="1.5"
                  opacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Formes décoratives */}
              <div className="absolute top-1/4 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              
              {/* Points lumineux */}
              <div className="absolute top-1/3 right-32 w-3 h-3 bg-primary rounded-full animate-ping" />
              <div className="absolute bottom-1/2 right-16 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};