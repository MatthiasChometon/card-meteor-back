import { InputType, Field } from '@nestjs/graphql';
import { GetCardFilterInput } from './get-card-filter.input';
import { GetCardOrderByInput } from './get-card-orderBy';

@InputType()
export class GetCardInput {
  @Field({ nullable: true })
  orderBy?: GetCardOrderByInput;

  @Field({ nullable: true })
  filterBy?: GetCardFilterInput;
}
