import { z } from "zod";


export const eventSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(5, 'A descrição deve ter pelo menos 5 caracteres'),
  availability: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Deve ser um número válido maior que 0'),
  date: z.string().min(1, 'A data é obrigatória'),
});

export type EventFormData = z.infer<typeof eventSchema>;