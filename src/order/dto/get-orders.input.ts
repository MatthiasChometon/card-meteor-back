import { InputType, Field } from '@nestjs/graphql';
import { PaginationInput } from '../../database/dto/Pagination.input';

@InputType()
export class GetOrdersInput {
  @Field()
  state: number;

  @Field()
  pagination: PaginationInput;
}
