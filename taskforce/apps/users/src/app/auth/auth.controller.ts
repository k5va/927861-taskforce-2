import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ContractorRdo } from './rdo/contractor.rdo';
import { CustomerRdo } from './rdo/customer.rdo';
import { LoggedInUserRdo } from './rdo/logged-in-user.rdo';
import { UserRdo } from './rdo/user.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User was successfully created'
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedInUserRdo,
    status: HttpStatus.OK,
    description: 'User was successfully logged in'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User such login or password not found'
  })
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const {_id: id, email} = verifiedUser;
    return fillObject(LoggedInUserRdo, {id, email, token: 'JWT token'});
  }

  @Get('user/:id')
  @ApiResponse({
    type: CustomerRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: ContractorRdo,
    status: HttpStatus.OK,
  })
  async show(@Param('id') id: string) {
    const existingUser = await this.authService.getUser(id);
    return existingUser.role === UserRole.Customer ?
      fillObject(CustomerRdo, existingUser) :
      fillObject(ContractorRdo, existingUser);
  }

  @Patch('user/:id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User was successfully updated'
  })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @Put('user/:id/password')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Password was successfully updated'
  })
  async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    const updatedUser = await this.authService.changePassword(id, dto);
    return fillObject(UserRdo, updatedUser);
  }
}
