import { CRUDRepository } from '@taskforce/core';
import { Task, TaskStatus } from '@taskforce/shared-types';
import { TaskEntity } from '../task.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskQuery } from '../query/task.query';
import { TASK_SORT } from '../task.const';
import { PersonalTaskQuery } from '../query';
import { calculateRating } from '../../app.utils';

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

  public findNew({
    limit,
    page,
    categories,
    tags,
    cities, // TODO: add city field to task!
    sort,
  }: TaskQuery): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        categoryId: {
          in: categories,
        },
        tags: tags
          ? {
              hasEvery: tags,
            }
          : undefined,
        status: {
          equals: TaskStatus.New,
        },
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
      orderBy: [TASK_SORT[sort]],
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public findByCustomer(
    id: string,
    { statuses }: PersonalTaskQuery
  ): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        customer: {
          equals: id,
        },
        status: {
          in: statuses,
        },
      },
      orderBy: {
        registerDate: 'desc',
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public findByContractor(
    id: string,
    { statuses }: PersonalTaskQuery
  ): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        contractor: {
          equals: id,
        },
        status: {
          in: statuses,
        },
      },
      orderBy: {
        status: 'asc',
      },
      include: {
        category: true,
        comments: true,
        responses: true,
      },
    });
  }

  public async update(
    itemId: number,
    data: Omit<Partial<TaskEntity>, 'id' | 'comments' | 'responses'>
  ): Promise<Task> {
    return this.prisma.$transaction(async (tx) => {
      // update task data
      const updatedTask = await tx.task.update({
        where: {
          id: itemId,
        },
        data,
        include: {
          category: true,
          comments: true,
          responses: true,
        },
      });

      if (data.status === TaskStatus.InProgress && data.contractor) {
        // create task contractor if not exists
        await tx.taskContractor.upsert({
          where: {
            contractor: data.contractor,
          },
          update: {},
          create: {
            contractor: data.contractor,
          },
        });
      }

      if (data.status === TaskStatus.Failed) {
        // update task contractor failed tasks count
        const taskContractor = await tx.taskContractor.update({
          where: {
            contractor: updatedTask.contractor,
          },
          data: {
            failedTasksCount: {
              increment: 1,
            },
          },
        });

        // update rating
        await tx.taskContractor.update({
          where: {
            contractor: updatedTask.contractor,
          },
          data: {
            rating: calculateRating(taskContractor),
          },
        });
      }

      return updatedTask;
    });
  }
}
