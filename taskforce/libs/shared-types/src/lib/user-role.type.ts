import { UserRoles } from './user-roles';

export type UserRole = typeof UserRoles[keyof typeof UserRoles];
