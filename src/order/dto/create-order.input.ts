import { InputType, Field } from '@nestjs/graphql';
import { ProductInput } from '../types/product-input';

@InputType()
export class CreateOrderInput {
  @Field(() => [ProductInput])
  products: ProductInput[];
}
