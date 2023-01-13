export const TaskStatusError = {
  InvalidCommand: 'command cannot be applied to current task status',
  ContractorNotResponded: 'Contractor has not responded to task',
  ContractorNotFree: 'Contractor has another task to do',
} as const;
