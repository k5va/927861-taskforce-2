import { CRUDRepository } from '@taskforce/core';
import { Comment } from '@taskforce/shared-types';
import { CommentEntity } from '../comment.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentRepository
  implements CRUDRepository<CommentEntity, number, Comment>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        ...item.toObject(),
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  public async destroyByTaskId(taskId: number): Promise<void> {
    await this.prisma.comment.deleteMany({
      where: {
        taskId,
      },
    });
  }

  public findById(id: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        id,
      },
    });
  }

  public find(ids: number[] = []): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }

  public update(id: number, item: CommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        id,
      },
      data: { ...item.toObject(), id },
    });
  }
}
