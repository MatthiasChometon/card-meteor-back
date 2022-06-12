import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field()
  number: number;

  @Field()
  id: number;

  @Field()
  price: number;
}
