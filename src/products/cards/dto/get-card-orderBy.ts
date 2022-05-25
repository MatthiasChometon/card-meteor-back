import { Field, InputType } from '@nestjs/graphql';
import { CardOrderBy } from '../enums/card-orderBy';

@InputType()
export class GetCardOrderByInput {
  @Field({ nullable: true })
  name?: CardOrderBy;

  @Field({ nullable: true })
  direction?: 'ASC' | 'DESC';
}
