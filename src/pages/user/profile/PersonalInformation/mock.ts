type FormField = {
  name: "number" | "name" | "email" | "gender" | "rg" | "cpf" | "street" | "neighborhood" | "city" | "state" | "zipCode" | "phone" | "cellPhone" | "passport" | "birth";
  placeholder: string
}

export const formFields: FormField[] = [
  {
    name: "name",
    placeholder: "Nome"
  },
  {
    name: "email",
    placeholder: "Email"
  },
  {
    name: "rg",
    placeholder: "RG"
  },
  {
    name: "cpf",
    placeholder: "CPF"
  },
  {
    name: "gender",
    placeholder: ""
  },
  {
    name: "street",
    placeholder: "Rua"
  },
  {
    name: "number",
    placeholder: "Número"
  },
  {
    name: "neighborhood",
    placeholder: "Bairro"
  },
  {
    name: "city",
    placeholder: "Cidade"
  },
  {
    name: "state",
    placeholder: "Estado"
  },
  {
    name: "zipCode",
    placeholder: "CEP"
  },
  {
    name: "phone",
    placeholder: "Telefone"
  },
  {
    name: "cellPhone",
    placeholder: "Celular"
  },
  {
    name: "passport",
    placeholder: "Passaporte"
  }]