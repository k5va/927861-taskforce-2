import { Injectable } from '@nestjs/common';
import { Response } from '@taskforce/shared-types';
import { ResponseRepository } from './repository/response.repository';
import { RESPONSE_ALREADY_EXISTS } from './response.const';
import { ResponseEntity } from './response.entity';

@Injectable()
export class ResponseService {
  constructor(private readonly responseRepository: ResponseRepository) {}

  public async create(contractor: string, taskId: number): Promise<Response> {
    const existingResponses =
      await this.responseRepository.findByContractorAndTask(contractor, taskId);
    if (existingResponses.length > 0) {
      throw new Error(RESPONSE_ALREADY_EXISTS);
    }

    const responseEntity = new ResponseEntity({
      contractor,
      taskId,
    });

    return this.responseRepository.create(responseEntity);
  }

  public async findAllByTask(taskId: number): Promise<Response[]> {
    return this.responseRepository.findByTask(taskId);
  }
}
