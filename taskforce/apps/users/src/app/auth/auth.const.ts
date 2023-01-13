export const AuthError = {
  EmailAlreadyExists: 'User with this email exists',
  UserNotFound: 'User with this email or password not found',
  UserMismatch: "Can't change another user's data",
  InvalidToken: 'Invalid refresh toren',
} as const;

export const AuthToken = {
  RefreshExpire: 60 * 60 * 24 * 7,
  AccessExpire: 60 * 60,
} as const;

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
