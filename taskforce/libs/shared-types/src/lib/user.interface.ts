import { UserRole } from './user-role.type';

export interface User {
  _id?: string;
  name: string;
  email: string;
  city: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  birthDate: Date;
  registerDate?: Date;
  description?: string;
  skills?: string[];
  refreshTokenHash?: string;
}
