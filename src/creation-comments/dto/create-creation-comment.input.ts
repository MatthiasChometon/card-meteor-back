import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCreationCommentInput {
  @Field()
  comment: string;

  @Field(() => Int)
  cardId: number;
}
