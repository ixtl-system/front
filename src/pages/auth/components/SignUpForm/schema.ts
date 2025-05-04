import { z } from "zod";

export const signUpSchema = z.object({
  email: z
  .string()
  .min(1, "E-mail é obrigatório!")
  .regex(/\S+@\S+\.\S+/, "Informe um endereço de e-mail valido!"),
  password: z.string().min(6, 'Informe a senha para fazer Login!'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;