import { Injectable } from '@nestjs/common';
import { DEFAULT_PLACE, DEFAULT_RATING } from '../app.const';
import { TaskContractorRepository } from './repository/task-contractor.repository';

@Injectable()
export class TaskContractorService {
  constructor(
    private readonly taskContractorRepository: TaskContractorRepository
  ) {}

  public async getRating(contractor: string) {
    const taskContractors =
      await this.taskContractorRepository.findAllWithRatingSorted();
    const index = taskContractors.findIndex(
      (item) => item.contractor === contractor
    );

    if (index === -1) {
      // contractor has no tasks
      return {
        rating: DEFAULT_RATING,
        place: DEFAULT_PLACE,
        failedTasksCount: 0,
        doneTasksCount: 0,
      };
    }

    const { rating, failedTasksCount, doneTasksCount } = taskContractors[index];
    const place = index + 1;

    return { rating, place, failedTasksCount, doneTasksCount };
  }
}
