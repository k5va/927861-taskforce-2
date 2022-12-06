import { CRUDRepository } from '@taskforce/core';
import { Task, TaskStatus } from '@taskforce/shared-types';
import { TaskEntity } from '../task.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskRepository
  implements CRUDRepository<TaskEntity, number, Task>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskEntity): Promise<Task> {
    const prismaData = await this.prisma.task.create({
      data: {
        ...item.toObject(),
        comments: {
          connect: [],
        },
        responses: {
          connect: [],
        },
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });

    return prismaData;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  public findById(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public find(ids: number[] = []): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public findNew(): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        status: {
          equals: TaskStatus.New,
        },
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public findByCustomer(id: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        customer: {
          equals: id,
        },
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public findByContractor(id: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        contractor: {
          equals: id,
        },
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public async update(itemId: number, item: TaskEntity): Promise<Task> {
    const { comments, responses, ...entityData } = item.toObject();
    const prismaData = await this.prisma.task.update({
      where: {
        id: itemId,
      },
      data: { ...entityData },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });

    return prismaData;
  }
}
