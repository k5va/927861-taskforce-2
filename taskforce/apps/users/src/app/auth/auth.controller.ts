import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ContractorRdo } from './rdo/contractor.rdo';
import { CustomerRdo } from './rdo/customer.rdo';
import { LoggedInUserRdo } from './rdo/logged-in-user.rdo';
import { UserRdo } from './rdo/user.rdo';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const {_id: id, email} = verifiedUser;
    return fillObject(LoggedInUserRdo, {id, email, token: 'JWT token'});
  }

  @Get('user/:id')
  async show(@Param('id') id: string) {
    const existingUser = await this.authService.getUser(id);
    return existingUser.role === UserRole.Customer ?
      fillObject(CustomerRdo, existingUser) :
      fillObject(ContractorRdo, existingUser);
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @Put('user/:id/password')
  async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    const updatedUser = await this.authService.changePassword(id, dto);
    return fillObject(UserRdo, updatedUser);
  }
}
