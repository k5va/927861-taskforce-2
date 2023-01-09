export const USER_EXISTS_ERROR = 'User with this email exists';
export const USER_NOT_FOUND_ERROR =
  'User with this email or password not found';
export const DIFFERENT_USER_ERROR = "Can't change another user's data";
export const INVALID_REFRESH_TOKEN_ERROR = 'Invalid refresh toren';

export const REFRESH_TOKEN_EXPIRE = 60 * 60 * 24 * 7;
export const ACCESS_TOKEN_EXPIRE = 60 * 60;

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export const MAX_AVATAR_SIZE = 500 * 1024;
export const AVATAR_FILE_TYPE = /image\/(jpeg|png)$/;
