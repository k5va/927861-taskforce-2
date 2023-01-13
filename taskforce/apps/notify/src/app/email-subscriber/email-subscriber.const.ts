export const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

export const EmailSubscriberError = {
  EmailNotValid: 'Email is not valid',
  NameIsEmpty: 'name is required',
  RoleNotValid: 'role is not valid',
  UserIdIsEmpty: 'userId is required',
  AlreadyExists: 'Subscriber with such email already exists',
} as const;
