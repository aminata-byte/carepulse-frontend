import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { Button } from '@/components/Button/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { PinAdminSchema } from '@/lib/validators';

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface AdminPinVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinVerificationModal: React.FC<AdminPinVerificationModalProps> = ({ 
  isOpen, 
  onClose,
  onSuccess 
}) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyAdminPin = useAuthStore((state) => state.verifyAdminPin);

  const handlePinChange = (index: number, value: string) => {
    // Accepter seulement les chiffres
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    // Focus sur le champ suivant
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace : revenir au champ précédent
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = pin.join('');

    // Validation avec Zod
    const result = PinAdminSchema.safeParse({ code });

    if (!result.success) {
      setError(result.error.flatten().fieldErrors.code?.[0] || 'Code PIN invalide');
      return;
    }

    setIsLoading(true);

    try {
      // Vérifier le PIN avec le store
      const isValid = verifyAdminPin(code);

      if (isValid) {
        // PIN valide, accès autorisé
        onSuccess();
      } else {
        setError('Code PIN incorrect');
        setPin(['', '', '', '', '', '']);
        // Focus sur le premier champ
        document.getElementById('pin-0')?.focus();
      }
    } catch (error) {
      console.error('PIN verification error:', error);
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit quand tous les champs sont remplis
  useEffect(() => {
    if (pin.every(digit => digit !== '')) {
      handleSubmit();
    }
  }, [pin]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-dark-light rounded-2xl shadow-xl overflow-hidden border border-dark-lighter">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-lighter">
          <h2 className="text-white text-xl font-semibold">
            Access Verification
          </h2>
          <button
            onClick={onClose}
            className="text-gray-secondary hover:text-white transition p-1 hover:bg-dark-lighter rounded-lg"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-secondary text-sm mb-6">
            To access the admin page, please enter the passkey...
          </p>

          {/* Erreur */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* PIN Inputs */}
          <div className="flex justify-center gap-3 mb-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold bg-dark border-2 border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary transition"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={pin.some(digit => digit === '')}
          >
            Enter admin panel
          </Button>

          {/* Info pour test */}
          <div className="mt-4 p-3 bg-dark rounded-lg border border-dark-lighter">
            <p className="text-gray-secondary text-xs">
              <strong className="text-white">Test PIN:</strong> 123456
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};