import { CRUDRepository } from '@taskforce/core';
import { Review } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReviewEntity } from '../review.entity';
import { calculateRating } from '../../app.utils';

@Injectable()
export class ReviewRepository
  implements CRUDRepository<ReviewEntity, number, Review>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ReviewEntity): Promise<Review> {
    return this.prisma.$transaction(async (tx) => {
      // create new Review
      const newReview = await tx.review.create({
        data: {
          ...item.toObject(),
        },
      });

      // update task contractor ratingSum and reviewsCount
      const taskContractor = await tx.taskContractor.update({
        where: {
          contractor: item.contractor,
        },
        data: {
          reviewsCount: {
            increment: 1,
          },
          ratingSum: {
            increment: item.rating,
          },
        },
      });

      // update rating
      await tx.taskContractor.update({
        where: {
          contractor: item.contractor,
        },
        data: {
          rating: calculateRating(taskContractor),
        },
      });

      return newReview;
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }

  public findById(id: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: {
        id,
      },
    });
  }

  public find(ids: number[] = []): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }

  public update(id: number, item: ReviewEntity): Promise<Review> {
    return this.prisma.review.update({
      where: {
        id,
      },
      data: { ...item.toObject(), id },
    });
  }

  public findByContractor(contractor: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { contractor },
    });
  }

  public findByCustomerAndTask(
    customer: string,
    taskId: number
  ): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { customer, taskId },
    });
  }
}
