import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfilPatientCompletSchema } from '@/lib/validators';
import { useProfileStore } from '@/store/useProfileStore';

export const usePatientForm = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useProfileStore();

  const [formData, setFormData] = useState({
    nomComplet: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim(),
    email: profile?.email || '',
    telephone: profile?.phone || '',
    dateNaissance: '',
    genre: '',
    adresse: '',
    profession: '',
    nomContactUrgence: '',
    telephoneContactUrgence: '',
    medecinTraitant: '',
    fournisseurAssurance: '',
    numeroPoliceAssurance: '',
    allergies: '',
    medicamentsActuels: '',
    antecedentsFamiliaux: '',
    antecedentsMedicaux: '',
    typeIdentification: '',
    numeroIdentification: '',
    documentIdentification: null as File | null,
    consentementTraitement: false,
    consentementConfidentialite: false,
    consentementDivulgation: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, documentIdentification: file }));
    if (errors.documentIdentification) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.documentIdentification;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = ProfilPatientCompletSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const errorsObj: Record<string, string> = {};

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const nameParts = result.data.nomComplet.split(' ');
      setProfile({
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' ') || '',
        email: result.data.email,
        phone: result.data.telephone,
        allergies: result.data.allergies,
        chronicDiseases: result.data.antecedentsMedicaux,
      });

      navigate('/demande-rendez-vous');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};