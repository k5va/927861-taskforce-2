export const TaskError = {
  NotFound: 'task not found',
  CategoryNotFound: 'Category not found',
} as const;

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
