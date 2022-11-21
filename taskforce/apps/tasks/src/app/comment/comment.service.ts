import { Injectable } from '@nestjs/common';
import { Comment } from '@taskforce/shared-types';
import { COMMENT_NOT_FOUND_ERROR } from './comment.const';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentMemoryRepository } from './repository/comment-memory.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentMemoryRepository) {}

  public async create(authorId: string, dto: CreateCommentDto): Promise<Comment> {
    const commentEntity = new CommentEntity({
      ...dto,
      _id: '',
      author: authorId,
    });
    return this.commentRepository.create(commentEntity);
  }

  public async delete(id: string): Promise<void> {
    const existingComment = this.commentRepository.findById(id);
    if (!existingComment) {
      throw new Error(COMMENT_NOT_FOUND_ERROR);
    }

    return this.commentRepository.destroy(id);
  }

  public async deleteAll(taskId: string) {
    return this.commentRepository.destroyByTaskId(taskId);
  }
}
