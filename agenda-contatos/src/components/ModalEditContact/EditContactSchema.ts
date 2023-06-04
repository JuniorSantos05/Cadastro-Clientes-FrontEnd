import { z } from "zod";

export const editContactSchema = z.object({
  name: z
    .string()
    .min(3, "O nome precisa conter pelo menos 3 caracteres.")
    .optional(),
  email: z
    .string()
    .email("Forneça um e-mail válido")
    .optional(),
  phone: z
    .string()
    .max(14, 'O telefone deve ter no máximo 14 caracteres')
    .optional()
})
export type TContactUpdateData = z.infer<typeof editContactSchema>;

