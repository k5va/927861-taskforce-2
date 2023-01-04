import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { fillObject } from '@taskforce/core';
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
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { JwtAuthGuard, RtAuthGuard } from './guards';
import { GetUser } from './decorators';
import { UserRoles } from '@taskforce/shared-types';
import { FileInterceptor } from '@nestjs/platform-express';
import { AVATAR_FILE_TYPE, MAX_AVATAR_SIZE } from './auth.const';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User was successfully created',
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
    description: 'User was successfully logged in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User such login or password not found',
  })
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const { token, refreshToken } = await this.authService.loginUser(
      verifiedUser
    );
    const { _id: id, email } = verifiedUser;

    return fillObject(LoggedInUserRdo, { id, email, token, refreshToken });
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
  async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existingUser = await this.authService.getUser(id);
    return existingUser.role === UserRoles.Customer
      ? fillObject(CustomerRdo, existingUser)
      : fillObject(ContractorRdo, existingUser);
  }

  @Patch('user/:id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User was successfully updated',
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() dto: UpdateUserDto
  ) {
    const updatedUser = await this.authService.updateUser(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @Put('user/:id/password')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Password was successfully updated',
  })
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() dto: ChangePasswordDto
  ) {
    const updatedUser = await this.authService.changePassword(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @Post('avatar')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Avatar was sussessfully uploaded',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @GetUser('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_AVATAR_SIZE }),
          new FileTypeValidator({ fileType: AVATAR_FILE_TYPE }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const updatedUser = await this.authService.setAvatar(userId, file.filename);
    return fillObject(UserRdo, updatedUser);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedInUserRdo,
    status: HttpStatus.OK,
    description: 'Token was refreshed',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid refresh token',
  })
  @UseGuards(RtAuthGuard)
  async refresh(@GetUser() user) {
    const { id, email, refreshToken } = user;
    const { token, refreshToken: newRefreshToken } =
      await this.authService.refresh(id, refreshToken);

    return fillObject(LoggedInUserRdo, {
      id,
      email,
      token,
      refreshToken: newRefreshToken,
    });
  }
}
