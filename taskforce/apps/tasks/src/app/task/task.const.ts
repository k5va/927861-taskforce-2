export const TASK_NOT_FOUND_ERROR = 'task not found';
export const DUE_DATE_LESS_THAN_CURRENT_ERROR =
  'Task due date should be more than current date';
export const TAG_FORMAT_NOT_VALID_ERROR =
  'Tag should start with letter and not containe spaces';

export const TASK_TITLE_MIN_LENGTH = 20;
export const TASK_TITLE_MAX_LENGTH = 50;
export const TASK_DESCRIPTION_MIN_LENGTH = 100;
export const TASK_DESCRIPTION_MAX_LENGTH = 1024;
export const TASK_ADDRESS_MIN_LENGTH = 10;
export const TASK_ADDRESS_MAX_LENGTH = 255;
export const TASK_PRICE_MIN_VALUE = 0;
export const TASK_TAGS_MAX_NUM = 5;
export const TAG_MIN_LENGTH = 3;
export const TAG_MAX_LENGTH = 10;
export const DEFAULT_TASKS_LIMIT = 25;

export const TASK_SORT_TYPES = ['created', 'popular', 'discussed'] as const;
export const DEFAULT_TASK_SORT_TYPE = 'created';
export const TASK_SORT: Record<typeof TASK_SORT_TYPES[number], unknown> = {
  created: { registerDate: 'desc' },
  popular: {
    responses: {
      _count: 'desc',
    },
  },
  discussed: {
    comments: {
      _count: 'desc',
    },
  },
};

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const MAX_TASK_IMAGE_SIZE = 1024 * 1024;
export const TASK_IMAGE_FILE_TYPE = /image\/(jpeg|png)$/;
export const TAG_FORMAT_PATTERN = /^[A-Za-zА-Яа-я]\S+$/;
