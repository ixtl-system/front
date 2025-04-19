export interface IMedication {
  id: string;
  name: string;
}

export interface IUserMedication {
  id: string;
  diseaseId: string;
  name: string;
  startUsing: string;
  createdAt: string;
}
