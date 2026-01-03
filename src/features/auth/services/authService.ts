import type { InscriptionPatientData } from '../types/auth.types';

// TODO: Importer ton API client depuis lib/api.ts

export const authService = {
  // Inscription patient
  async inscrire(data: InscriptionPatientData) {
    // TODO: Appel API réel
    // const response = await apiClient.post('/auth/register', data);
    // return response.data;
    
    // Mock pour le moment
    return {
      id: crypto.randomUUID(),
      email: data.email,
      role: 'patient',
    };
  },

  // Connexion
  async login(email: string, _password: string) {
    // TODO: Appel API réel
    return { token: 'fake-token', user: { id: '1', email, role: 'patient' } };
  },

  // Déconnexion
  async logout() {
    // TODO: Appel API réel
    return true;
  },
};