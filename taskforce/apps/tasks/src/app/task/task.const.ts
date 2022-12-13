export const TASK_NOT_FOUND_ERROR = 'task not found';
export const TASK_TITLE_MIN_LENGTH = 20;
export const TASK_TITLE_MAX_LENGTH = 50;
export const TASK_DESCRIPTION_MIN_LENGTH = 100;
export const TASK_DESCRIPTION_MAX_LENGTH = 1024;
export const TASK_ADDRESS_MIN_LENGTH = 10;
export const TASK_ADDRESS_MAX_LENGTH = 255;
export const TASK_PRICE_MIN_VALUE = 0;
export const TASK_TAGS_MAX_NUM = 5;
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
