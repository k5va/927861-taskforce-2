import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ContractorResponse } from './response/contractor.response';
import { CustomerResponse } from './response/customer.response';
import { LoggedInUserResponse } from './response/logged-in-user.response';
import { UserResponse } from './response/user.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserResponse, newUser);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const {_id: id, email} = verifiedUser;
    return fillObject(LoggedInUserResponse, {id, email, token: 'JWT token'});
  }

  @Get('user/:id')
  async show(@Param('id') id: string) {
    const existingUser = await this.authService.getUser(id);
    return existingUser.role === UserRole.Customer ?
      fillObject(CustomerResponse, existingUser) :
      fillObject(ContractorResponse, existingUser);
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(id, dto);
    return fillObject(UserResponse, updatedUser);
  }

  @Put('user/:id/password')
  async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    const updatedUser = await this.authService.changePassword(id, dto);
    return fillObject(UserResponse, updatedUser);
  }
}
