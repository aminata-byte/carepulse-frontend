export interface AppointmentRequestData {
  docteurId: string;
  raison: string;
  commentairesSupplementaires: string;
  dateRendezVous: string;
}

export interface FormErrors {
  [key: string]: string;
}