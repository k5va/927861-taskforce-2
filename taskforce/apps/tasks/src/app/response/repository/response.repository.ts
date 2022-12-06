import { CRUDRepository } from '@taskforce/core';
import { Response } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ResponseEntity } from '../response.entity';

@Injectable()
export class ResponseRepository
  implements CRUDRepository<ResponseEntity, number, Response>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ResponseEntity): Promise<Response> {
    return this.prisma.response.create({
      data: {
        ...item.toObject(),
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.response.delete({
      where: {
        id,
      },
    });
  }

  public findById(id: number): Promise<Response | null> {
    return this.prisma.response.findFirst({
      where: {
        id,
      },
    });
  }

  public find(ids: number[] = []): Promise<Response[]> {
    return this.prisma.response.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }

  public findByContractorAndTask(
    contractor: string,
    taskId: number
  ): Promise<Response[]> {
    return this.prisma.response.findMany({
      where: { contractor, taskId },
    });
  }

  public findByTask(taskId: number): Promise<Response[]> {
    return this.prisma.response.findMany({
      where: { taskId },
    });
  }

  public update(id: number, item: ResponseEntity): Promise<Response> {
    return this.prisma.response.update({
      where: {
        id,
      },
      data: { ...item.toObject(), id },
    });
  }
}
