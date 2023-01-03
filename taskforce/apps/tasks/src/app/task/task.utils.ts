import { createMachine } from 'xstate';
import { TaskCommands, TaskStatuses } from '@taskforce/shared-types';

export const createTaskStateMachine = (state: string) =>
  createMachine({
    initial: state,
    states: {
      new: {
        on: {
          [TaskCommands.start]: TaskStatuses.InProgress,
          [TaskCommands.cancel]: TaskStatuses.Canceled,
        },
      },
      inProgress: {
        on: {
          [TaskCommands.fail]: TaskStatuses.Failed,
          [TaskCommands.finish]: TaskStatuses.Done,
        },
      },
      failed: {
        type: 'final',
      },
      done: {
        type: 'final',
      },
      canceled: {
        type: 'final',
      },
    },
  });
