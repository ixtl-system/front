import Cpf from "../validations/CPF";
import Rg from "../validations/RG";
import cleanString from "./cleanString";

export function validateCpf(value: string) {
  if (!value) return false;

  const cpf = new Cpf();
  return cpf.validate(value);
}

export function validateRg(value: string) {
  if (!value) return false;
  
  const rg = new Rg();
  return rg.validate(value);
}

export function validateEmail(email: string) {
  const validate = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return validate.test(email);
}

export function validatePhone(phone_number: string) {
  const mobile_number = cleanString(phone_number);

  const exp =
    "^(?<DDI>(\\+|00|\\+00)?[\\s\\-\\.]?(\\(?[5]{2}\\)?)?)?[\\s\\-\\.]?(?<DDD>\\(?0?([1-9]{2})\\)?)[\\s\\-\\.]?(?<Digito>9)?[\\s\\-\\.]?(?<Numero>(?<PrimeiraParte>[1-9][0-9]{3})[\\s\\-\\.]?(?<SegundaParte>[0-9]{4}))\\s?$";
  const regex = new RegExp(exp, "g");

  const result = regex.exec(mobile_number);

  if (!result || !result.groups) {
    return false;
  }

  const DDD = result.groups.DDD || "";
  const Digito = result.groups.Digito || "";
  const Numero = result.groups.Numero || "";

  const fixed = `${DDD}${Digito}${Numero}`;

  return fixed.length == 11;
}

export function validateResidentialPhone(phone_number: string) {
  const cleanNumber = cleanString(phone_number); 
  const exp = 
    /^(?:(?:\+|00)?(55)[\s-]?)?(?:\(?([1-9][0-9])\)?[\s-]?)?([2-5][0-9]{3}[\s-]?[0-9]{4})$/;
  
  const match = exp.exec(cleanNumber);

  if (!match) {
    return false;
  }

  const fullNumber = (match[2] || '') + (match[3] || '');

  return fullNumber.length === 10;
}