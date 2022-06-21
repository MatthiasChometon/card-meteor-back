import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetCardOrderByInput } from './dto/get-card-orderBy';
import { GetCardInput } from './dto/get-card.input';
import { Card } from './entities/card.entity';
import { CardOrderBy } from './enums/card-orderBy';
import { PaginationInput } from 'src/database/dto/Pagination.input';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_REPOSITORY')
    private cardRepository: Repository<Card>,
  ) {}
  query: SelectQueryBuilder<Card>;

  async save(createCardInput: Partial<Card>): Promise<Card> {
    const cardCreated = await this.cardRepository.save(createCardInput);
    return cardCreated;
  }

  async findOne(cardInformations: Partial<Card>): Promise<Card> {
    return await this.cardRepository.findOne({
      where: { ...cardInformations },
    });
  }

  async updateOne(id: number, payload: Partial<Card>): Promise<Card> {
    const card = await this.findOne({ id });

    if (!card) throw new UnauthorizedException('Card not exist');

    const cardUpdated = { ...card, ...payload };
    return await this.cardRepository.save(cardUpdated);
  }
}
