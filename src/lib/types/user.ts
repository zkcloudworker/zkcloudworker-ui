export type { User };

interface User {
  uid: string;
  accountId: string; 
  fullName: string;
  alias: string; 
  email: string;
  preferences: object,
  discord: string,
  JWT: string,
  state?: string;
  description?: string;
  image?: string;
  phone?: string;
  telegram?: string;
  createdUTC?: Date;
  updatedUTC?: Date;
  approvedUTC?: Date | null;
};
