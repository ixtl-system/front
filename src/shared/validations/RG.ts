export default class Rg {
  constructor() {}

  public validate(rg: string) {
    rg = this.clean(rg);
    console.log(this.isValidLength(rg));
    console.log(this.hasAllDigitEquals(rg));
    if (!this.isValidLength(rg)) return false;
    if (this.hasAllDigitEquals(rg)) return false;

    console.log(
      this.calculateDigit(rg),
      this.extractCheckDigit(rg)
    )

    const calculatedDigit = this.calculateDigit(rg);
    return this.extractCheckDigit(rg) === calculatedDigit;
  }

  private clean(rg: string) {
    return rg.replace(/\D/g, "");
  }

  private isValidLength(rg: string) {
    return rg.length === 9 || rg.length === 8;
  }

  private hasAllDigitEquals(rg: string) {
    return rg.split("").every((digit) => digit === rg[0]);
  }

  private calculateDigit(rg: string) {
    let total = 0;
    let factor = rg.length - 1;

    for (let i = 0; i < rg.length - 1; i++) {
      total += parseInt(rg[i]) * factor--;
    }

    const rest = total % 11;
    if (rest === 10) return "X";
    if (rest === 0) return "0";
    return rest.toString();
  }

  private extractCheckDigit(rg: string) {
    return rg.slice(-1).toUpperCase();
  }
}