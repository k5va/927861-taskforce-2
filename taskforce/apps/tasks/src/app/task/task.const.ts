export const TASK_NOT_FOUND_ERROR = 'task not found';
export const CATEGORY_NOT_FOUND_ERROR = 'Category not found';
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
