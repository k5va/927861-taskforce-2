import { Injectable } from '@nestjs/common';
import { Comment } from '@taskforce/shared-types';
import { COMMENT_NOT_FOUND_ERROR } from './comment.const';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
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

  public async deleteComment(id: number): Promise<void> {
    const existingComment = this.commentRepository.findById(id);
    if (!existingComment) {
      throw new Error(COMMENT_NOT_FOUND_ERROR);
    }

    return this.commentRepository.destroy(id);
  }

  public async deleteAll(taskId: number) {
    return this.commentRepository.destroyByTaskId(taskId);
  }
}
