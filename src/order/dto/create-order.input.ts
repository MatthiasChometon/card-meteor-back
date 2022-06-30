import { InputType, Field } from '@nestjs/graphql';
import { ProductInput } from './product-input';

@InputType()
export class CreateOrderInput {
  @Field(() => [ProductInput])
  products: ProductInput[];
}
