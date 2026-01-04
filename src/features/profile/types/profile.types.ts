// Types
export interface PatientFormData {
  // Personal Information
  nomComplet: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  genre: string;
  adresse: string;
  profession: string;
  nomContactUrgence: string;
  telephoneContactUrgence: string;

  // Medical Information
  medecinTraitant: string;
  fournisseurAssurance: string;
  numeroPoliceAssurance: string;
  allergies: string;
  medicamentsActuels: string;
  antecedentsFamiliaux: string;
  antecedentsMedicaux: string;

  // Identification
  typeIdentification: string;
  numeroIdentification: string;
  documentIdentification: File | null;

  // Consent
  consentementTraitement: boolean;
  consentementConfidentialite: boolean;
  consentementDivulgation: boolean;
}

export interface FormErrors {
  [key: string]: string;
}