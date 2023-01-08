import { AbstractEntity } from '@taskforce/core';
import { User, UserRole } from '@taskforce/shared-types';
import { genSalt, compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.const';

export class TaskUserEntity extends AbstractEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public city: string;
  public passwordHash: string;
  public role: UserRole;
  public avatar: string;
  public birthDate: Date;
  public description?: string;
  public skills?: string[];
  public refreshTokenHash?: string;

  constructor(data: User) {
    super();

    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.city = data.city;
    this.passwordHash = data.passwordHash;
    this.role = data.role;
    this.avatar = data.avatar;
    this.birthDate = data.birthDate;
    this.description = data.description;
    this.skills = data.skills;
    this.refreshTokenHash = data.refreshTokenHash;
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async setRefreshToken(token: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.refreshTokenHash = await hash(token, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public async compareRefreshToken(token: string): Promise<boolean> {
    return compare(token, this.refreshTokenHash);
  }
}
