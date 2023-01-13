import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment } from '@taskforce/shared-types';
import { CommentError } from './comment.const';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from '@taskforce/core';
import { CommentQuery } from './query';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async create(
    authorId: string,
    taskId: number,
    dto: CreateCommentDto
  ): Promise<Comment> {
    const commentEntity = new CommentEntity({
      ...dto,
      author: authorId,
      taskId,
    });
    return this.commentRepository.create(commentEntity);
  }

  public async deleteComment(userId: string, commentId: number): Promise<void> {
    const existingComment = await this.commentRepository.findById(commentId);
    if (!existingComment) {
      throw new NotFoundException(CommentError.NotFound);
    }

    if (existingComment.author !== userId) {
      throw new UnauthorizedException();
    }

    return this.commentRepository.destroy(commentId);
  }

  public async findByTask(taskId: number, query: CommentQuery) {
    return this.commentRepository.findByTask(taskId, query);
  }
}
