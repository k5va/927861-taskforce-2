import { UserRole } from './user-role.enum';

export interface Subscriber {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  userId: string;
}
