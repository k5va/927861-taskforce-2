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
import { fillObject, GetUser, JwtAuthGuard } from '@taskforce/core';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiHeader,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  ContractorRdo,
  CustomerRdo,
  LoggedInUserRdo,
  UserRdo,
} from '@taskforce/core';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { RtAuthGuard } from './guards';
import { UserRoles } from '@taskforce/shared-types';
import { FileInterceptor } from '@nestjs/platform-express';
import { AVATAR_FILE_TYPE, MAX_AVATAR_SIZE } from './auth.const';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user')
  @ApiOperation({ summary: 'Creates new user' })
  @ApiCreatedResponse({
    type: UserRdo,
    description: 'User was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConflictResponse({
    description: 'User with this email exists',
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiOkResponse({
    type: LoggedInUserRdo,
    description: 'User was successfully logged in',
  })
  @ApiUnauthorizedResponse({
    description: 'User with such login or password not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const { token, refreshToken } = await this.authService.loginUser(
      verifiedUser
    );
    const { _id, email } = verifiedUser;

    return fillObject(LoggedInUserRdo, { _id, email, token, refreshToken });
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({
    type: CustomerRdo,
  })
  @ApiOkResponse({
    type: ContractorRdo,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existingUser = await this.authService.getUser(id);
    return existingUser.role === UserRoles.Customer
      ? fillObject(CustomerRdo, existingUser)
      : fillObject(ContractorRdo, existingUser);
  }

  @Patch('user/:id')
  @ApiOperation({ summary: 'Updates user data' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: UserRdo,
    description: 'User was successfully updated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
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
  @ApiOperation({ summary: 'Changes user password' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: UserRdo,
    description: 'Password was successfully updated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
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
  @ApiOperation({ summary: 'Uploads user avatar image' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: UserRdo,
    description: 'Avatar was sussessfully uploaded',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
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
  @ApiOperation({ summary: 'Refreshes authorization token' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer refresh token',
  })
  @ApiOkResponse({
    type: LoggedInUserRdo,
    description: 'Token was refreshed',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid refresh token',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({
    description: 'User not found',
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
