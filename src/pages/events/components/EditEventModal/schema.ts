import dayjs from "dayjs";
import { z } from "zod";

const integerRegex = /^\d+$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const editEventSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  availability: z
    .string()
    .min(1, "Informe a quantidade de lugares disponíveis")
    .refine((val) => integerRegex.test(val), "Deve ser um número inteiro positivo")
    .refine((val) => Number(val) > 0, "Deve ser um número inteiro positivo"),
  date: z
    .string()
    .min(1, "A data é obrigatória")
    .refine((val) => dayjs(val).isValid(), "Informe uma data válida")
    .refine(
      (val) => !dayjs(val).isBefore(dayjs().startOf("day"), "day"),
      "Selecione uma data a partir de hoje"
    ),
  time: z.string().min(1, "O horário é obrigatório").refine((val) => timeRegex.test(val), "Informe um horário válido"),
});

export type EditEventFormData = z.infer<typeof editEventSchema>;
