import { TaskStatuses } from './task-statuses';

export type TaskStatus = typeof TaskStatuses[keyof typeof TaskStatuses];
