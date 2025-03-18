import { DateTime, Settings } from "luxon";

Settings.defaultZone = "America/Sao_Paulo";
Settings.defaultLocale = "pt-BR";

declare module "luxon/src/datetime" {
  export interface DateTime {
    toPresentationFormat(): string;
    toFormatWithHours(): string;
  }
}

DateTime.prototype.toPresentationFormat = function (): string {
  const _self = this as DateTime;
  return _self.toFormat("dd/MM/yyyy");
};

DateTime.prototype.toFormatWithHours = function (): string {
  const _self = this as DateTime;
  return _self.setLocale("pt-BR").toFormat("dd/MM/yyyy HH:mm");
};
