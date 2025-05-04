export interface IMedication {
  id: string;
  name: string;
}

export interface IUserMedication {
  id: string;
  name: string;
  startUsing: string;
  createdAt: string;
  userDiseaseId: string;
  userId: string;
  userSurgeryId: string;
}
