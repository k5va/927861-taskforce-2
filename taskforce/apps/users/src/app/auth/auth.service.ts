import { Injectable } from '@nestjs/common';
import { User } from '@taskforce/shared-types';
import { TaskUserMemoryRepository } from '../task-user/repository/task-user-memory.repository';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { USER_EXISTS_ERROR, USER_NOT_FOUND_ERROR } from './auth.const';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly blogUserRepository: TaskUserMemoryRepository) {}

  async register(dto: CreateUserDto) {
    const {name, email, city, password, role, birthDate} = dto;
    const taskUser: User = {_id: '', name, email, city, passwordHash: '', role, birthDate, avatar: ''};

    const existingUser = await this.blogUserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error(USER_EXISTS_ERROR);
    }

    const userEntity = await new TaskUserEntity(taskUser).setPassword(password);

    return this.blogUserRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existingUser = await this.blogUserRepository.findByEmail(email);

    if (!existingUser) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    const userEntity = new TaskUserEntity(existingUser);
    if (! await userEntity.comparePassword(password)) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }
}
