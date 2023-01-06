import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CommandEvent,
  Task,
  TaskNotification,
  TaskStatuses,
  UserRole,
  UserRoles,
} from '@taskforce/shared-types';
import { CommentService } from '../comment/comment.service';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery, PersonalTaskQuery } from './query';
import { TaskRepository } from './repository/task.repository';
import {
  INVALID_COMMAND_ERROR,
  RABBITMQ_SERVICE,
  TASK_NOT_FOUND_ERROR,
} from './task.const';
import { TaskEntity } from './task.entity';
import { createTaskStateMachine } from './task.utils';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly commentService: CommentService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async create(customerId: string, dto: CreateTaskDto): Promise<Task> {
    const taskEntity = new TaskEntity({
      ...dto,
      status: TaskStatuses.New,
      customer: customerId,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      comments: [],
      responses: [],
    });

    const newTask = await this.taskRepository.create(taskEntity);

    // send task notification event
    this.rabbitClient.emit<void, TaskNotification>(
      { cmd: CommandEvent.AddTaskNotification },
      {
        title: newTask.title,
        price: newTask.price,
        dueDate: newTask.dueDate,
        address: newTask.address,
        taskId: newTask.id,
      }
    );

    return newTask;
  }

  async getTask(id: number): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return existingTask;
  }

  async updateTask(
    userId: string,
    taskId: number,
    dto: UpdateTaskDto
  ): Promise<Task> {
    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    if (existingTask.customer !== userId) {
      throw new UnauthorizedException();
    }

    return this.taskRepository.update(taskId, {
      ...dto,
      dueDate: dto.dueDate && new Date(dto.dueDate),
    });
  }

  async setImage(
    userId: string,
    taskId: number,
    fileName: string
  ): Promise<Task> {
    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    if (existingTask.customer !== userId) {
      throw new UnauthorizedException();
    }

    return this.taskRepository.update(taskId, {
      image: fileName,
    });
  }

  async deleteTask(userId: string, taskId: number): Promise<void> {
    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    if (existingTask.customer !== userId) {
      // TODO: move check to method?
      throw new UnauthorizedException();
    }

    await this.commentService.deleteAll(taskId); // TODO: delete comments in transaction
    return this.taskRepository.destroy(taskId);
  }

  async findNew(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.findNew(query);
  }

  async findByCustomer(id: string, query: PersonalTaskQuery): Promise<Task[]> {
    return this.taskRepository.findByCustomer(id, query);
  }

  async findByContractor(
    id: string,
    query: PersonalTaskQuery
  ): Promise<Task[]> {
    return this.taskRepository.findByContractor(id, query);
  }

  async changeTaskStatus(
    userId: string,
    userRole: UserRole,
    taskId: number,
    dto: ChangeTaskStatusDto
  ): Promise<Task> {
    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    // create task state machine to validate changing task status
    const taskStateMachine = createTaskStateMachine(existingTask.status);
    if (!taskStateMachine.initialState.can(dto.command)) {
      // can't make state transition with recieved command
      throw new Error(INVALID_COMMAND_ERROR);
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
      if (existingTask.customer !== userId) {
        throw new UnauthorizedException();
      }
    }

    return this.taskRepository.update(taskId, {
      status: newStatus,
      contractor: dto.contractor,
    });
  }
}
