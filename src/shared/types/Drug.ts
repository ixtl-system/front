export type IFrequency = "NEVER" | "SOMETIMES" | "ALWAYS" | "STOPPED";
export type IUsingTime = "SIX_MONTH" | "ONE_YEAR" | "TWO_YEARS" | "THREE_YEARS" | "MORE_THAN_THREE_YEARS";

export type IDrug = {
  id?: string;
  userId: string;
  drugId: string;
  drugName?: string;
  frequency: IFrequency;
  startUsing?: IUsingTime;
  endUsing?: IUsingTime;
  isDaimeHelp?: boolean;
};
