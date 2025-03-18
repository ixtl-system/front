export function formatCpf(cpf: string) {
  if (!cpf) return "";
  
  cpf = cpf.replace(/\D/g, "");

  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.substring(0, 11);
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpf;
}