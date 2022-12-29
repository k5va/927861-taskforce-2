export const USER_EXISTS_ERROR = 'User with this email exists';
export const USER_NOT_FOUND_ERROR =
  'User with this email or password not found';
export const INVALID_REFRESH_TOKEN_ERROR = 'Invalid refresh toren';
export const USER_EMAIL_NOT_VALID_ERROR = 'Email id not valid';
export const USER_DATE_BIRTH_NOT_VALID_ERROR = 'Birth date id not valid';
export const CITY_NOT_VALID_ERROR =
  'City should be one of Москва, Санкт-Петербург, Владивосток';
export const ROLE_NOT_VALID_ERROR =
  'Role should be one of Customer, Contractor';

export const USER_NAME_MIN_LENGTH = 3;
export const USER_NAME_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 12;
export const USER_DESCRIPTON_MAX_LENGTH = 300;
export const USER_SKILLS_MAX_NUM = 5;

export const REFRESH_TOKEN_EXPIRE = 60 * 60 * 24 * 7;
export const ACCESS_TOKEN_EXPIRE = 60;

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
