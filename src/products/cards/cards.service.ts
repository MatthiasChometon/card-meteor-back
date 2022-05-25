import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_REPOSITORY')
    private cardRepository: Repository<Card>,
  ) {}

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
    return await this.save(cardUpdated);
  }

  async get(searchName?: string): Promise<Card[]> {
    let query = this.cardRepository.createQueryBuilder().select();

    if (searchName) {
      query = query.where('LOWER(name) LIKE :name', {
        name: `%${searchName.toLowerCase()}%`,
      });
    }

    return await query.getMany();
  }
}
