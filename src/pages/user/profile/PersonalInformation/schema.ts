import { z } from "zod";

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
  rg: z
    .string()
    .length(9, "O RG deve conter exatamente 9 caracteres!"),
  cpf: z
    .string()
    .length(11, "O CPF deve conter exatamente 11 caracteres!"),
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
    .min(5, "O celular deve conter no mínimo 5 caracteres!")
    .max(30, "O celular deve conter no máximo 30 caracteres!"),
  passport: z
    .string()
    .max(30, "O passaporte deve conter no máximo 30 caracteres!")
    .nullable()
    .optional(),
  birth: z
    .string()
    .min(10, "A data de nascimento deve estar no formato válido (DD/MM/AAAA)"),
});
