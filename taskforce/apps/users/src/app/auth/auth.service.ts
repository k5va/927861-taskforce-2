import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, User, Subscriber } from '@taskforce/shared-types';
import { TaskUserRepository } from '../task-user/repository/task-user.repository';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { RABBITMQ_SERVICE, AuthToken, AuthError } from './auth.const';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '@taskforce/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    const { name, email, city, password, role, birthDate } = dto;
    const taskUser: User = {
      name,
      email,
      city,
      passwordHash: '',
      role,
      birthDate: new Date(birthDate),
    };

    const existingUser = await this.taskUserRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(AuthError.EmailAlreadyExists);
    }

    const userEntity = new TaskUserEntity(taskUser);
    await userEntity.setPassword(password);

    const newUser = await this.taskUserRepository.create(userEntity);

    this.rabbitClient.emit<void, Subscriber>(
      { cmd: CommandEvent.AddSubscriber },
      {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        userId: newUser._id.toString(),
      }
    );

    return newUser;
  }

  async verifyUser(dto: LoginUserDto): Promise<User> {
    const { email, password } = dto;
    const existingUser = await this.taskUserRepository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException(AuthError.UserNotFound);
    }

    const userEntity = new TaskUserEntity(existingUser);
    if (!(await userEntity.comparePassword(password))) {
      throw new UnauthorizedException(AuthError.UserNotFound);
    }

    return userEntity.toObject();
  }

  async getUser(id: string): Promise<User> {
    const existingUser = await this.taskUserRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException(AuthError.UserNotFound);
    }

    return existingUser;
  }

  async updateUser(
    userId: string,
    tokenUserId: string,
    dto: UpdateUserDto
  ): Promise<User> {
    const existingUser = await this.taskUserRepository.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(AuthError.UserNotFound);
    }

    if (tokenUserId !== userId) {
      throw new UnauthorizedException(AuthError.UserMismatch);
    }

    return this.taskUserRepository.update(userId, {
      ...dto,
      birthDate: dto.birthDate && new Date(dto.birthDate),
    });
  }

  async setAvatar(userId: string, fileName: string): Promise<User> {
    const existingUser = await this.taskUserRepository.findById(userId);

    if (!existingUser) {
      throw new UnauthorizedException(AuthError.UserNotFound);
    }

    if (existingUser._id.toString() !== userId) {
      throw new UnauthorizedException(AuthError.UserMismatch);
    }

    return this.taskUserRepository.update(userId, {
      avatar: fileName,
    });
  }

  async changePassword(
    userId: string,
    tokenUserId: string,
    dto: ChangePasswordDto
  ): Promise<User> {
    const { newPassword, oldPassword } = dto;
    const existingUser = await this.taskUserRepository.findById(userId);

    if (!existingUser) {
      throw new UnauthorizedException(AuthError.UserNotFound);
    }

    if (tokenUserId !== userId) {
      throw new UnauthorizedException(AuthError.UserMismatch);
    }

    const userEntity = new TaskUserEntity(existingUser);
    if (!(await userEntity.comparePassword(oldPassword))) {
      throw new UnauthorizedException(AuthError.UserNotFound);
    }
    await userEntity.setPassword(newPassword);

    return this.taskUserRepository.update(userId, {
      passwordHash: userEntity.passwordHash,
    });
  }

  async loginUser(user: User) {
    const { token, refreshToken } = await this.generateTokens(user);

    const userEntity = new TaskUserEntity(user);
    await userEntity.setRefreshToken(refreshToken);
    await this.taskUserRepository.update(user._id, {
      refreshTokenHash: userEntity.refreshTokenHash,
    });

    return { token, refreshToken };
  }

  async refresh(userId: string, refreshToken: string) {
    const existingUser = await this.taskUserRepository.findById(userId);
    if (!existingUser) {
      throw new UnauthorizedException(AuthError.UserNotFound);
    }

    const userEntity = new TaskUserEntity(existingUser);
    if (!(await userEntity.compareRefreshToken(refreshToken))) {
      throw new UnauthorizedException(AuthError.InvalidToken);
    }

    const { token, refreshToken: newRefreshToken } = await this.generateTokens(
      userEntity
    );

    await userEntity.setRefreshToken(newRefreshToken);
    await this.taskUserRepository.update(userId, {
      refreshTokenHash: userEntity.refreshTokenHash,
    });

    return { token, refreshToken: newRefreshToken };
  }

  private async generateRefreshToken({ _id, email, role, name }: User) {
    const payload = { sub: _id, email, role, name };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('rt.secret'),
      expiresIn: AuthToken.RefreshExpire,
    });
  }

  private async generateAccessToken({ _id, email, role, name }: User) {
    const payload = { sub: _id, email, role, name };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: AuthToken.AccessExpire,
    });
  }

  private async generateTokens(user: User) {
    const [token, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return { token, refreshToken };
  }
}
