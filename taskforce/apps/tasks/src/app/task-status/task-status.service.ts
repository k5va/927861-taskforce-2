import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Task,
  TaskStatuses,
  UserRole,
  UserRoles,
} from '@taskforce/shared-types';
import { ResponseService } from '../response/response.service';
import { TaskRepository } from '../task/repository/task.repository';
import { TaskService } from '../task/task.service';
import { ChangeTaskStatusDto } from '@taskforce/core';
import {
  CONTRACTOR_NOT_FREE_ERROR,
  INVALID_COMMAND_ERROR,
  NO_RESPONSE_CONTRACTOR_ERROR,
} from './task-status.const';
import { createTaskStateMachine } from './task-status.utils';

@Injectable()
export class TaskStatusService {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskRepository: TaskRepository,
    private readonly reponseService: ResponseService
  ) {}

  async changeTaskStatus(
    userId: string,
    userRole: UserRole,
    taskId: number,
    dto: ChangeTaskStatusDto
  ): Promise<Task> {
    const existingTask = await this.taskService.getTask(taskId);

    // create task state machine to validate changing task status
    const taskStateMachine = createTaskStateMachine(existingTask.status);
    if (!taskStateMachine.initialState.can(dto.command)) {
      // can't make state transition with recieved command
      throw new BadRequestException(INVALID_COMMAND_ERROR);
    }

    // make state transition to get a new state
    const nextState = taskStateMachine.transition(
      taskStateMachine.initialState,
      {
        type: dto.command,
      }
    );

    const newStatus = nextState.value.toString();

    if (userRole === UserRoles.Contractor) {
      if (newStatus !== TaskStatuses.Failed) {
        // only contractor can fail task
        throw new UnauthorizedException();
      }

      if (existingTask.contractor !== userId) {
        throw new UnauthorizedException();
      }
    }

    if (userRole === UserRoles.Customer) {
      this.validateTaskOwner(existingTask, userId);

      if (newStatus === TaskStatuses.InProgress) {
        //check if contractor responded to task
        const responses = await this.reponseService.findAllByTaskAndContractor(
          taskId,
          dto.contractor
        );
        if (responses.length === 0) {
          throw new BadRequestException(NO_RESPONSE_CONTRACTOR_ERROR);
        }

        // check if contractor has no other tasks in work
        const contractorTasks = await this.taskRepository.findByContractor(
          dto.contractor,
          { statuses: [TaskStatuses.InProgress] }
        );
        if (contractorTasks.length !== 0) {
          throw new BadRequestException(CONTRACTOR_NOT_FREE_ERROR);
        }
      }
    }

    return this.taskRepository.update(taskId, {
      status: newStatus,
      contractor: dto.contractor,
    });
  }

  private validateTaskOwner(task: Task, customer: string) {
    if (task.customer !== customer) {
      throw new UnauthorizedException();
    }
  }
}
