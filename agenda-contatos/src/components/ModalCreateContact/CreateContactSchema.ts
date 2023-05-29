import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .min(3, "O nome é obrigatório e precisa conter pelo menos 3 caracteres."),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Forneça um e-mail válido"),
  phone: z
    .string().max(14, 'O telefone deve ter no máximo 14 caracteres')
    .nonempty('O telefone é obrigatório')    
    
});

export type TContactData = z.infer<typeof createContactSchema>;
