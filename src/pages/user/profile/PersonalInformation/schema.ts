import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().max(100),
  gender: z.enum(["MASCULINE", "FEMININE", "OTHER"]),
  rg: z.string().length(9),
  cpf: z.string().length(11),
  street: z.string().min(3).max(200),
  number: z.string().min(1).max(10),
  neighborhood: z.string().min(3).max(200),
  city: z.string().min(3).max(200),
  state: z.string().length(2),
  zipCode: z.string().max(20),
  phone: z.string().max(30).optional(),
  cellPhone: z.string().min(5).max(30),
  passport: z.string().max(30).nullable().optional(),
  birth: z.string(),
});