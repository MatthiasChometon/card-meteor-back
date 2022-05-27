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
    return await this.save(cardUpdated);
  }

  search(key: string, value: string) {
    this.query = this.query.where(`${key} LIKE :${key}`, {
      [key]: `%${value}%`,
    });
  }

  filter(key: string, value: string | number) {
    const valueToSearch =
      typeof value === 'string' ? value.toLowerCase() : value.toString();
    this.query = this.query.where(`${key} = :${key}`, {
      [key]: `${valueToSearch}`,
    });
  }

  searchByName(name: string) {
    this.search('name', name);
  }

  filterByStep(step: number) {
    this.filter('step', step);
  }

  filterByEditor(editor: string) {
    this.filter('editor', editor);
  }

  paginate(pagination: PaginationInput) {
    this.query = this.query.limit(pagination.end).offset(pagination.start);
  }

  orderBy(orderBy?: GetCardOrderByInput) {
    const defaultQueryOrderBy: GetCardOrderByInput = {
      name: CardOrderBy.updateDate,
      direction: 'ASC',
    };

    const name = orderBy?.name ?? defaultQueryOrderBy.name;
    const direction = orderBy?.direction || defaultQueryOrderBy.direction;

    this.query = this.query.orderBy(name, direction);
  }

  async get(getCardInput: GetCardInput): Promise<Card[]> {
    const { orderBy, filterBy } = getCardInput;
    this.query = this.cardRepository.createQueryBuilder().select();

    if (filterBy?.name) this.searchByName(filterBy.name);
    if (filterBy?.pagination) this.paginate(filterBy.pagination);
    if (filterBy?.step) this.filterByStep(filterBy.step);
    if (filterBy?.editor) this.filterByEditor(filterBy.editor);

    this.orderBy(orderBy);

    return await this.query.getMany();
  }
}
