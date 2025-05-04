export type IUserSurgery = {
  id: string;
  userId: string;
  name: string;
  surgeryDate: string;
  medicine?: string | null,
  observation?: string | null,
  createdAt: string;
  updatedAt: string;
}

export type ICreateSurgeryParams = {
  name: string;
  surgeryDate: string;
  medicine?: string;
  medicineDescription?: string;
  observation?: string;
}