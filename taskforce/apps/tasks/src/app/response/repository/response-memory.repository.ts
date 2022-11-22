import { Response } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { ResponseEntity } from '../response.entity';
import { AbstractMemoryRepository } from '@taskforce/core';

@Injectable()
export class ResponseMemoryRepository extends AbstractMemoryRepository<ResponseEntity, Response> {
  public async findByContractorAndTask(contractor: string, task: string): Promise<Response[]> {
    return Object.values(this.repository)
      .filter((response) => response.task === task && response.contractor === contractor);
  }

  public async findByTask(task: string): Promise<Response[]> {
    return Object.values(this.repository)
      .filter((response) => response.task === task);
  }
}
