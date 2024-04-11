export { User };

interface User {
  uid: string;
  accountId: string; 
  state: string;
  fullName: string;
  description: string;
  image: string;
  email: string;
  phone: string;
  telegram: string;
  preferences: object,
  createdUTC: Date;
  updatedUTC: Date;
  approvedUTC: Date | null;
};
