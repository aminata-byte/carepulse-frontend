import { z } from "zod";

/**
 * ========================================
 * 1️⃣ FORMULAIRE : INSCRIPTION PATIENT
 * Page : "Get Started with Appointments"
 * ========================================
 */
export const InscriptionPatientSchema = z.object({
  // Nom complet
  nomComplet: z
    .string()
    .min(2, "Le nom complet doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  // Email
  email: z
    .string()
    .email("Adresse email invalide")
    .min(5, "L'email est obligatoire"),

  // Numéro de téléphone
  telephone: z
    .string()
    .regex(
      /^\+?[0-9]{8,15}$/,
      "Le numéro de téléphone doit contenir entre 8 et 15 chiffres"
    ),
});

/**
 * ========================================
 * 2️⃣ FORMULAIRE : DEMANDE DE RENDEZ-VOUS
 * Page : "Request a new appointment in 10 seconds"
 * ========================================
 */
export const DemandeRendezVousSchema = z.object({
  // Sélection du docteur
  docteurId: z
    .string()
    .min(1, "Veuillez sélectionner un docteur"),

  // Raison du rendez-vous
  raison: z
    .string()
    .min(5, "La raison doit contenir au moins 5 caractères")
    .max(200, "La raison ne peut pas dépasser 200 caractères"),

  // Commentaires / notes supplémentaires (optionnel)
  commentairesSupplementaires: z
    .string()
    .max(500, "Les commentaires ne peuvent pas dépasser 500 caractères")
    .optional(),

  // Date du rendez-vous
  dateRendezVous: z
    .string()
    .min(1, "Veuillez sélectionner une date")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date invalide",
    })
    .refine(
      (val) => new Date(val) >= new Date(),
      "La date ne peut pas être dans le passé"
    ),
});

/**
 * ========================================
 * 3️⃣ MODAL : VÉRIFICATION PIN ADMIN
 * Modal : "Access Verification"
 * ========================================
 */
export const PinAdminSchema = z.object({
  // PIN à 6 chiffres
  code: z
    .string()
    .length(6, "Le code PIN doit contenir exactement 6 chiffres")
    .regex(/^[0-9]{6}$/, "Le PIN ne doit contenir que des chiffres"),
});

/**
 * ========================================
 * 4️⃣ MODAL : PLANIFIER UN RENDEZ-VOUS (ADMIN)
 * Modal : "Schedule Appointment"
 * ========================================
 */
export const PlanifierRendezVousSchema = z.object({
  // Sélection du docteur
  docteurId: z
    .string()
    .min(1, "Veuillez sélectionner un docteur"),

  // Raison du rendez-vous
  raison: z
    .string()
    .min(5, "La raison doit contenir au moins 5 caractères")
    .max(200, "La raison ne peut pas dépasser 200 caractères"),

  // Date prévue du rendez-vous
  dateRendezVous: z
    .string()
    .min(1, "Veuillez sélectionner une date")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date invalide",
    }),
});

/**
 * ========================================
 * 5️⃣ FORMULAIRE COMPLET : PROFIL PATIENT
 * Page : Inscription détaillée avec toutes les sections
 * ========================================
 */
export const ProfilPatientCompletSchema = z.object({
  /* =====================
     INFORMATIONS PERSONNELLES
     ===================== */
  nomComplet: z
    .string()
    .min(2, "Le nom complet est obligatoire")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  email: z
    .string()
    .email("Adresse email invalide"),

  telephone: z
    .string()
    .regex(/^\+?[0-9]{8,15}$/, "Numéro de téléphone invalide"),

  dateNaissance: z
    .string()
    .min(1, "La date de naissance est obligatoire")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date de naissance invalide",
    })
    .refine(
      (val) => new Date(val) < new Date(),
      "La date de naissance doit être dans le passé"
    ),

  genre: z.enum(["Homme", "Femme", "Autre"], {
    errorMap: () => ({ message: "Veuillez sélectionner un genre" }),
  }),

  adresse: z
    .string()
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères"),

  profession: z
    .string()
    .min(2, "La profession est obligatoire")
    .max(50, "La profession ne peut pas dépasser 50 caractères"),

  nomContactUrgence: z
    .string()
    .min(2, "Le nom du contact d'urgence est obligatoire")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  telephoneContactUrgence: z
    .string()
    .regex(/^\+?[0-9]{8,15}$/, "Téléphone du contact d'urgence invalide"),

  /* =====================
     INFORMATIONS MÉDICALES
     ===================== */
  medecinTraitant: z
    .string()
    .min(2, "Le médecin traitant est obligatoire"),

  fournisseurAssurance: z
    .string()
    .optional(),

  numeroPoliceAssurance: z
    .string()
    .optional(),

  allergies: z
    .string()
    .max(500, "Les allergies ne peuvent pas dépasser 500 caractères")
    .optional(),

  medicamentsActuels: z
    .string()
    .max(500, "Les médicaments actuels ne peuvent pas dépasser 500 caractères")
    .optional(),

  antecedentsFamiliaux: z
    .string()
    .max(1000, "L'historique familial ne peut pas dépasser 1000 caractères")
    .optional(),

  antecedentsMedicaux: z
    .string()
    .max(1000, "L'historique médical ne peut pas dépasser 1000 caractères")
    .optional(),

  /* =====================
     IDENTIFICATION
     ===================== */
  typeIdentification: z
    .string()
    .min(2, "Le type d'identification est obligatoire"),

  numeroIdentification: z
    .string()
    .min(3, "Le numéro d'identification est invalide")
    .max(50, "Le numéro ne peut pas dépasser 50 caractères"),

  documentIdentification: z
    .any()
    .refine((file) => file !== null && file !== undefined, {
      message: "Le document d'identification est requis",
    })
    .refine(
      (file) => {
        if (!file) return false;
        const typesValides = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
        return typesValides.includes(file.type);
      },
      {
        message: "Le document doit être au format JPG, PNG ou PDF",
      }
    )
    .refine(
      (file) => {
        if (!file) return false;
        const tailleMax = 5 * 1024 * 1024; // 5MB
        return file.size <= tailleMax;
      },
      {
        message: "Le fichier ne doit pas dépasser 5MB",
      }
    ),

  /* =====================
     CONSENTEMENT
     ===================== */
  consentementTraitement: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter le consentement de traitement",
    }),

  consentementConfidentialite: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter la politique de confidentialité",
    }),

  consentementDivulgation: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter la divulgation des informations",
    }),
});

/**
 * ========================================
 * 6️⃣ MODAL : ANNULATION DE RENDEZ-VOUS
 * Modal admin pour annuler un RDV
 * ========================================
 */
export const AnnulationRendezVousSchema = z.object({
  // Raison de l'annulation
  raisonAnnulation: z
    .string()
    .min(10, "La raison doit contenir au moins 10 caractères")
    .max(500, "La raison ne peut pas dépasser 500 caractères"),
});

/**
 * ========================================
 * 💡 UTILISATION EXEMPLE DANS UN COMPOSANT
 * ========================================
 */

/*
import { InscriptionPatientSchema } from '@/lib/validators';

const handleSubmit = (formData: any) => {
  const result = InscriptionPatientSchema.safeParse(formData);
  
  if (!result.success) {
    // Récupérer les erreurs
    const erreurs = result.error.flatten().fieldErrors;
    console.log(erreurs);
    return;
  }
  
  // Données valides ✅
  console.log("Données valides", result.data);
  
  // Envoyer au store Zustand ou à l'API
  useAuthStore.getState().login(result.data);
};
*/