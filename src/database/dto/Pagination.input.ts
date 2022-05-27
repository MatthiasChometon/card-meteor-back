import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field()
  start: number;

  @Field()
  end: number;
}
