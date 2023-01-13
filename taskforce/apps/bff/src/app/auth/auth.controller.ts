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
  UseInterceptors,
  Headers,
} from '@nestjs/common';
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
  UserAvatar,
} from '@taskforce/core';
import { FileInterceptor } from '@nestjs/platform-express';

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
    return this.authService.createUser(dto);
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
    return this.authService.loginUser(dto);
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
  async show(@Param('id') userId: string) {
    return this.authService.getUser(userId);
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
  async update(
    @Param('id') userId: string,
    @Body() dto: UpdateUserDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.authService.updateUser(userId, dto, authHeader);
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
  async changePassword(
    @Param('id') userId: string,
    @Body() dto: ChangePasswordDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.authService.changePassword(userId, dto, authHeader);
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
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: UserAvatar.MaxSize }),
          new FileTypeValidator({ fileType: UserAvatar.FileType }),
        ],
      })
    )
    file: Express.Multer.File,
    @Headers('authorization') authHeader: string
  ) {
    return this.authService.setAvatar(file, authHeader);
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
  async refreshToken(@Headers('authorization') authHeader: string) {
    return this.authService.refreshToken(authHeader);
  }
}
