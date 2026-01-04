import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InscriptionPatientSchema } from '@/lib/validators';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import type { InscriptionPatientData, FormErrors } from '../types/auth.types';

export const useInscription = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const setProfile = useProfileStore((state) => state.setProfile);

  // États
  const [formData, setFormData] = useState<InscriptionPatientData>({
    nomComplet: '',
    email: '',
    telephone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Gérer les changements d'input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Gérer la soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation avec Zod
    const result = InscriptionPatientSchema.safeParse(formData);

    if (!result.success) {
      // Récupérer les erreurs
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

    // Simulation API (à remplacer par authService.ts plus tard)
    try {
      // TODO: Appeler l'API réelle
      // const response = await authService.inscrire(result.data);
      
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulation

      // Créer l'utilisateur
      const newUser = {
        id: crypto.randomUUID(),
        email: result.data.email,
        role: 'patient' as const,
      };

      // Sauvegarder dans Zustand
      login(newUser);
      
      // Extraire prénom et nom
      const nameParts = result.data.nomComplet.split(' ');
      setProfile({
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' ') || '',
        email: result.data.email,
        phone: result.data.telephone,
      });

      // Redirection
      navigate('/complete-profile');
    } catch (error) {
      console.error('Erreur inscription:', error);
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
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