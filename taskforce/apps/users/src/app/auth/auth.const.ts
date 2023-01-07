export const USER_EXISTS_ERROR = 'User with this email exists';
export const USER_NOT_FOUND_ERROR =
  'User with this email or password not found';
export const DIFFERENT_USER_ERROR = "Can't change another user's data";
export const INVALID_REFRESH_TOKEN_ERROR = 'Invalid refresh toren';
export const USER_EMAIL_NOT_VALID_ERROR = 'Email is not valid';
export const USER_DATE_BIRTH_NOT_VALID_ERROR = 'Birth date is not valid';
export const CITY_NOT_VALID_ERROR =
  'City should be one of Москва, Санкт-Петербург, Владивосток';
export const ROLE_NOT_VALID_ERROR =
  'Role should be one of Customer, Contractor';
export const USER_TOO_YOUNG_ERROR = 'User should be at least 18 years old';

export const USER_BIRTHDATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const USER_MIN_AGE = 18;
export const USER_NAME_MIN_LENGTH = 3;
export const USER_NAME_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 12;
export const USER_DESCRIPTON_MAX_LENGTH = 300;
export const USER_SKILLS_MAX_NUM = 5;
export const USER_SKILLS_MIN_NUM = 1;

export const REFRESH_TOKEN_EXPIRE = 60 * 60 * 24 * 7;
export const ACCESS_TOKEN_EXPIRE = 60 * 60;

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export const MAX_AVATAR_SIZE = 500 * 1024;
export const AVATAR_FILE_TYPE = /image\/(jpeg|png)$/;
