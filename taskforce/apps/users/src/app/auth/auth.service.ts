import { Injectable } from '@nestjs/common';
import { User } from '@taskforce/shared-types';
import { TaskUserRepository } from '../task-user/repository/task-user.repository';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { USER_EXISTS_ERROR, USER_NOT_FOUND_ERROR } from './auth.const';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly taskUserRepository: TaskUserRepository) {}

  async register(dto: CreateUserDto): Promise<User> {
    const { name, email, city, password, role, birthDate } = dto;
    const taskUser: User = {
      name,
      email,
      city,
      passwordHash: '',
      role,
      birthDate: new Date(birthDate),
      avatar: '',
    };

    const existingUser = await this.taskUserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error(USER_EXISTS_ERROR);
    }

    const userEntity = await new TaskUserEntity(taskUser).setPassword(password);

    return this.taskUserRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto): Promise<User> {
    const { email, password } = dto;
    const existingUser = await this.taskUserRepository.findByEmail(email);

    if (!existingUser) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    const userEntity = new TaskUserEntity(existingUser);
    if (!(await userEntity.comparePassword(password))) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    return userEntity.toObject();
  }

  async getUser(id: string): Promise<User> {
    const existingUser = await this.taskUserRepository.findById(id);

    if (!existingUser) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    return existingUser;
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const existingUser = await this.taskUserRepository.findById(id);

    if (!existingUser) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    const userEntity = new TaskUserEntity({
      ...existingUser,
      ...dto,
      birthDate: dto.birthDate
        ? new Date(dto.birthDate)
        : existingUser.birthDate,
    });

    return this.taskUserRepository.update(id, userEntity);
  }

  async changePassword(id: string, dto: ChangePasswordDto): Promise<User> {
    const { newPassword, oldPassword } = dto;
    const existingUser = await this.taskUserRepository.findById(id);

    if (!existingUser) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    const userEntity = new TaskUserEntity(existingUser);
    if (!(await userEntity.comparePassword(oldPassword))) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    return this.taskUserRepository.update(
      id,
      await userEntity.setPassword(newPassword)
    );
  }
}
