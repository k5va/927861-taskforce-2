export const UserDtoError = {
  EmailNotValid: 'Email is not valid',
  BirthdateNotValid: 'Birth date is not valid',
  CityNotValid: 'City should be one of Москва, Санкт-Петербург, Владивосток',
  RoleNotValid: 'Role should be one of Customer, Contractor',
  TooYoung: 'User should be at least 18 years old',
} as const;

export const USER_BIRTHDATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const USER_MIN_AGE = 18;

export const UserNameLength = {
  Min: 3,
  Max: 50,
} as const;

export const PasswordLength = {
  Min: 6,
  Max: 12,
} as const;

export const USER_DESCRIPTON_MAX_LENGTH = 300;

export const UserSkillsCount = {
  Min: 1,
  Max: 5,
} as const;

export const UserAvatar = {
  MaxSize: 500 * 1024,
  FileType: /image\/(jpeg|png)$/,
} as const;
