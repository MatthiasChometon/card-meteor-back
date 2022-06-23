import { Injectable, Inject } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetCardOrderByInput } from './dto/get-card-orderBy';
import { GetCardInput } from './dto/get-card.input';
import { Card } from './entities/card.entity';
import { CardOrderBy } from './enums/card-orderBy';
import { PaginationInput } from 'src/database/dto/Pagination.input';

@Injectable()
export class CardsListService {
  constructor(
    @Inject('CARDS_REPOSITORY')
    private cardRepository: Repository<Card>,
  ) {}
  query: SelectQueryBuilder<Card>;

  search(key: string, value: string | number) {
    const valueToSearch =
      typeof value === 'string' ? value.toLowerCase() : value.toString();
    this.query = this.query.where(`${key} LIKE :${key}`, {
      [key]: `%${valueToSearch}%`,
    });
  }

  filter(key: string, value: string | number) {
    this.query = this.query.andWhere(`${key} = :${key}`, {
      [key]: `${value}`,
    });
  }

  searchByName(name: string) {
    this.search('name', name);
  }

  filterByStep(step: number) {
    this.filter('step', step);
  }

  filterByEditor(id: string) {
    this.filter('editor', id);
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
