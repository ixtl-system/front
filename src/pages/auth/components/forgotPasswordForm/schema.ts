import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório!")
    .regex(/\S+@\S+\.\S+/, "Informe um endereço de e-mail valido!"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
