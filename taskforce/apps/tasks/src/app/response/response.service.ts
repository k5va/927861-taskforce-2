import { Injectable } from '@nestjs/common';
import { Response } from '@taskforce/shared-types';
import { RESPONSE_ALREADY_EXISTS } from './response.const';
import { ResponseEntity } from './response.entity';
import { ResponseMemoryRepository } from './repository/response-memory.repository';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class ResponseService {
  constructor(private readonly responseRepository: ResponseMemoryRepository) {}

  public async create(contractor: string, task: string, dto: CreateResponseDto): Promise<Response> {
    const existingResponse = await this.responseRepository.findByContractorAndTask(contractor, task);
    if (existingResponse) {
      throw new Error(RESPONSE_ALREADY_EXISTS);
    }

    const responseEntity = new ResponseEntity({
      ...dto,
      _id: '',
      task
    });

    return this.responseRepository.create(responseEntity);
  }

  public async findAllByTask(task: string): Promise<Response[]> {
    return this.responseRepository.findByTask(task);
  }
}
