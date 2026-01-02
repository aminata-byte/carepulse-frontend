import { z } from 'zod';
export const signupSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit faire au moins 2 lettres"),
  lastName: z.string().min(2, "Le nom doit faire au moins 2 lettres"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{8,15}$/, "Numéro de téléphone invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit faire au moins 6 caractères"),
});
