import { Field, InputType, Int } from '@nestjs/graphql';
import { PaginationInput } from '../../../database/dto/Pagination.input';

@InputType()
export class GetCardFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  pagination?: PaginationInput;

  @Field(() => Int, { nullable: true })
  step?: number;

  @Field({ nullable: true })
  editor?: string;
}
