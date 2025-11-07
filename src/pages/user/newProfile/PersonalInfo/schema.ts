import { z } from "zod";

import { validateCpf, validatePhone } from "@/shared/utils/validate";

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve conter no mínimo 3 caracteres!")
    .max(100, "O nome deve conter no máximo 100 caracteres!"),
  email: z
    .string()
    .email("Informe um e-mail válido!")
    .max(100, "O e-mail deve conter no máximo 100 caracteres!"),
  gender: z.enum(["MASCULINE", "FEMININE", "OTHER"], {
    errorMap: () => ({ message: "Selecione um gênero válido!" }),
  }),
  rg: z.string().refine((rg) => /^\d{1,2}\.?\d{3}\.?\d{3}-?[0-9Xx]$/.test(rg), "Informe um RG válido!"),
  cpf: z.string().refine((cpf) => validateCpf(cpf), "Informe um CPF válido!"),
  street: z
    .string()
    .min(3, "O nome da rua deve conter no mínimo 3 caracteres!")
    .max(200, "O nome da rua deve conter no máximo 200 caracteres!"),
  number: z
    .string()
    .min(1, "O número deve conter no mínimo 1 caractere!")
    .max(10, "O número deve conter no máximo 10 caracteres!"),
  neighborhood: z
    .string()
    .min(3, "O bairro deve conter no mínimo 3 caracteres!")
    .max(200, "O bairro deve conter no máximo 200 caracteres!"),
  city: z
    .string()
    .min(3, "O nome da cidade deve conter no mínimo 3 caracteres!")
    .max(200, "O nome da cidade deve conter no máximo 200 caracteres!"),
  state: z
    .string()
    .length(2, "O estado deve conter exatamente 2 caracteres!"),
  zipCode: z
    .string()
    .max(20, "O CEP deve conter no máximo 20 caracteres!"),
  phone: z
    .string()
    .max(30, "O telefone deve conter no máximo 30 caracteres!")
    .optional(),
  cellPhone: z
    .string()
    .refine((mobile_number) => validatePhone(mobile_number), "Informe um número válido!"),
  passport: z
    .string()
    .max(30, "O passaporte deve conter no máximo 30 caracteres!")
    .optional(),
  birth: z
    .string()
    .min(10, "A data de nascimento deve estar no formato válido (DD/MM/AAAA)"),
});

export type profileFormData = {
  name: string;
  email: string;
  gender: "MASCULINE" | "FEMININE" | "OTHER";
  rg: string;
  cpf: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  cellPhone: string;
  birth: string;
  phone?: string;
  passport?: string;
};
