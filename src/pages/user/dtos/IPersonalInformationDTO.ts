export interface IPersonalInformation {
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
  phone?: string;
  cellPhone: string;
  passport?: string;
  birth: string;
  role: "ADMIN" | "USER"
}
