import { Inject, Injectable } from '@nestjs/common';
import { Card } from '../products/cards/entities/card.entity';
import { Repository } from 'typeorm';
import { CreateCreationCommentInput } from './dto/create-creation-comment.input';
import { CreationComment } from './entities/creation-comment.entity';

@Injectable()
export class CreationCommentsService {
  constructor(
    @Inject('CREATION_COMMENT_REPOSITORY')
    private creationCommentRepository: Repository<CreationComment>,
    @Inject('CARDS_REPOSITORY')
    private cardRepository: Repository<Card>,
  ) {}

  async create(createCreationCommentInput: CreateCreationCommentInput) {
    const { cardId, ...newCreationComment } = createCreationCommentInput;
    const card = await this.cardRepository.findOneOrFail(cardId);
    return await this.creationCommentRepository.save({
      ...newCreationComment,
      card,
    });
  }
}
