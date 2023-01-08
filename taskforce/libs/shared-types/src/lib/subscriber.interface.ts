import { UserRole } from './user-role.type';

export interface Subscriber {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  userId: string;
}
