import { z } from "zod";

const optionalTrimmedString = (schema: z.ZodString) =>
  z.preprocess((value) => {
    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    }

    return value;
  }, schema.optional());

export const inviteGuestSchema = z.object({
  name: z
    .string({ required_error: "Informe o nome do convidado." })
    .trim()
    .min(1, "Informe o nome do convidado."),
  email: optionalTrimmedString(
    z.string().email("Informe um e-mail válido."),
  ),
  phone: optionalTrimmedString(
    z
      .string()
      .refine((value) => value.replace(/\D/g, "").length >= 10, {
        message: "Informe um telefone válido com DDD.",
      })
      .refine((value) => value.replace(/\D/g, "").length <= 15, {
        message: "Telefone deve conter no máximo 15 dígitos.",
      }),
  ),
  gender: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(["MASCULINE", "FEMININE", "OTHER"]).optional(),
  ),
  firstTimer: z.boolean().optional(),
  hasPaid: z.boolean(),
});

export type InviteGuestFormData = z.infer<typeof inviteGuestSchema>;
