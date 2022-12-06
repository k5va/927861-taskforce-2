import { Response } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { ResponseEntity } from '../response.entity';
import { AbstractMemoryRepository } from '@taskforce/core';

@Injectable()
export class ResponseMemoryRepository extends AbstractMemoryRepository<
  ResponseEntity,
  Response
> {
  public async findByContractorAndTask(
    contractor: string,
    taskId: number
  ): Promise<Response[]> {
    return Object.values(this.repository).filter(
      (response) =>
        response.taskId === taskId && response.contractor === contractor
    );
  }

  public async findByTask(taskId: number): Promise<Response[]> {
    return Object.values(this.repository).filter(
      (response) => response.taskId === taskId
    );
  }
}
