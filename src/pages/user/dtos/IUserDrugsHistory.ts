export interface IUserDrugsHistory {
  userId: string;
  drugId: string;
  drugName: string;
  frequency?: string;
  startUsing?: string;
  endUsing?: string;
  isDaimeHelp?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
