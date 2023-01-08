import { CRUDRepository } from '@taskforce/core';
import { TaskContractor } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskContractorEntity } from '../task-contractor.entity';

@Injectable()
export class TaskContractorRepository
  implements CRUDRepository<TaskContractorEntity, number, TaskContractor>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskContractorEntity): Promise<TaskContractor> {
    const newItem = await this.prisma.taskContractor.create({
      data: {
        ...item.toObject(),
      },
    });

    return newItem;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.taskContractor.delete({
      where: {
        id,
      },
    });
  }

  public findById(id: number): Promise<TaskContractor | null> {
    return this.prisma.taskContractor.findFirst({
      where: {
        id,
      },
    });
  }

  public findAllWithRatingSorted(): Promise<TaskContractor[]> {
    return this.prisma.taskContractor.findMany({
      where: {
        rating: {
          gt: 0,
        },
      },
      orderBy: {
        rating: 'desc',
      },
    });
  }

  public update(
    id: number,
    item: TaskContractorEntity
  ): Promise<TaskContractor> {
    return this.prisma.taskContractor.update({
      where: {
        id,
      },
      data: { ...item.toObject(), id },
    });
  }
}
