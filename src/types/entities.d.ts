type Gender = "male" | "female" | "other";

export interface User {
  id: number;
  clerk_id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  avatar?: string;
  specialty?: string;
  phone?: number;
  nationality?: string;
  gender?: Gender;
  birthDay?: number;
  occupation?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  numHouse?: string;
  createdAt?: number;
}
