export const TaskDtoError = {
  DueDateLessThanCurrent: 'Task due date should be more than current date',
  TagFormatNotValid: 'Tag should start with letter and not containe spaces',
} as const;

export const TaskTitleLength = {
  Min: 20,
  Max: 50,
};

export const TaskDescriptionLength = {
  Min: 100,
  Max: 1024,
};

export const TaskAddressLength = {
  Min: 10,
  Max: 255,
};

export const TASK_PRICE_MIN_VALUE = 0;
export const TASK_TAGS_MAX_NUM = 5;

export const TaskTagLength = {
  Min: 3,
  Max: 10,
};

export const TAG_FORMAT_PATTERN = /^[A-Za-zА-Яа-я]\S+$/;

export const TaskImage = {
  MaxSize: 1024 * 1024,
  FileType: /image\/(jpeg|png)$/,
} as const;
