import { User, UserRole } from '@taskforce/shared-types';
import { genSalt, compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.const';

export class TaskUserEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public city: string;
  public passwordHash: string;
  public role: UserRole;
  public avatar: string;
  public birthDate: Date;
  public registerDate?: Date;
  public description?: string;
  public skills?: string[];


  constructor(data: User) {
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.city = data.city;
    this.passwordHash = data.passwordHash;
    this.role = data.role;
    this.avatar = data.avatar;
    this.birthDate = data.birthDate;
    this.registerDate = data.registerDate;
    this.description = data.description;
    this.skills = data.skills;
  }

  public toObject(): User {
    return {...this};
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

}
