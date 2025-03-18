export function formatRg(rg: string) {
  if (!rg) return "";
  
  rg = rg.replace(/\D/g, "");
  rg = rg.substring(0, 9);
  
  rg = rg.replace(/(\d{2})(\d)/, "$1.$2"); 
  rg = rg.replace(/(\d{3})(\d)/, "$1.$2"); 
  rg = rg.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 

  return rg;
}