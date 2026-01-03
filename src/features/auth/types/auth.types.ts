// Type pour les données d'inscription
export interface InscriptionPatientData {
  nomComplet: string;
  email: string;
  telephone: string;
}

// Type pour l'utilisateur authentifié
export interface User {
  id: string;
  email: string;
  role: 'patient' | 'admin' | 'doctor';
}

// Type pour les erreurs de formulaire
export interface FormErrors {
  [key: string]: string;
}