export const ReviewError = {
  AlreadyExists: "Customer's review on this task already exists",
  CustomerMismatch: "Can't add reviews to other users' tasks",
  ContractorMismatch: "Contractor doesn't match task",
  TaskStatusNotDone: 'Can only add reviews to tasks with status === done',
} as const;
