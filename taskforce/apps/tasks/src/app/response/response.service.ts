import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Response, TaskStatuses } from '@taskforce/shared-types';
import { TaskService } from '../task/task.service';
import { ResponseRepository } from './repository/response.repository';
import { NOT_NEW_TASK, RESPONSE_ALREADY_EXISTS } from './response.const';
import { ResponseEntity } from './response.entity';

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseRepository: ResponseRepository,
    private readonly taskService: TaskService
  ) {}

  public async create(userId: string, taskId: number): Promise<Response> {
    // check task status === new
    const task = await this.taskService.getTask(taskId);
    if (task.status !== TaskStatuses.New) {
      throw new BadRequestException(NOT_NEW_TASK);
    }

    // check response already exists
    const existingResponses =
      await this.responseRepository.findByContractorAndTask(userId, taskId);
    if (existingResponses.length > 0) {
      throw new ConflictException(RESPONSE_ALREADY_EXISTS);
    }

    const responseEntity = new ResponseEntity({
      contractor: userId,
      taskId,
    });

    return this.responseRepository.create(responseEntity);
  }

  public async findAllByTask(taskId: number): Promise<Response[]> {
    return this.responseRepository.findByTask(taskId);
  }

  public async findAllByTaskAndContractor(
    taskId: number,
    contractor: string
  ): Promise<Response[]> {
    return this.responseRepository.findByTaskAndContractor(taskId, contractor);
  }
}
