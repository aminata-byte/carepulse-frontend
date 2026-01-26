import { useState } from 'react';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { useInscription } from '../hooks/useInscription';
import { AdminLoginModal } from './AdminLoginModal';

// Icônes SVG
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const InscriptionPatient = () => {
  const { formData, errors, isLoading, handleChange, handleSubmit } = useInscription();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <>
      {/* WRAPPER PLEIN ÉCRAN */}
      <div className="h-screen w-screen bg-dark">
        
        {/* CARD PLEIN ÉCRAN */}
        <div className="w-full h-full bg-dark-light border border-dark-lighter shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

            {/* PARTIE GAUCHE */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">

              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
                <span className="text-white text-2xl font-bold">CarePulse</span>
              </div>

              <h1 className="text-white text-4xl font-bold mb-2">
                Hi there, ....
              </h1>
              <p className="text-gray-secondary mb-8">
                Get Started with Appointments.
              </p>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                  <p className="text-red-500 text-sm">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  name="nomComplet"
                  label="Full name"
                  placeholder="Aminata DIANE"
                  icon={<UserIcon />}
                  value={formData.nomComplet}
                  onChange={handleChange}
                  error={errors.nomComplet}
                />

                <Input
                  type="email"
                  name="email"
                  label="Email address"
                  placeholder="aminata175@gmail.com"
                  icon={<MailIcon />}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <Input
                  type="tel"
                  name="telephone"
                  label="Phone number"
                  placeholder="+221 77 044 30 34"
                  icon={<PhoneIcon />}
                  value={formData.telephone}
                  onChange={handleChange}
                  error={errors.telephone}
                />

                <Button type="submit" isLoading={isLoading}>
                  Get Started
                </Button>
              </form>

              <div className="mt-8 flex justify-between text-sm">
                <p className="text-gray-secondary">© carepulse copyright</p>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="text-primary hover:text-primary-light transition"
                >
                  Admin
                </button>
              </div>
            </div>

            {/* PARTIE DROITE */}
            <div className="hidden lg:block relative bg-[#0D0F10]">
              <img
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg"
                alt="Doctor"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-dark-light/30" />
            </div>

          </div>
        </div>
      </div>

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
};
