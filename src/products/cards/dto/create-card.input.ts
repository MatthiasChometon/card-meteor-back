import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  @Field()
  name: string;

  @Field()
  level: number;

  @Field()
  attribute: string;

  @Field()
  attack: number;

  @Field()
  defense: number;

  @Field()
  description: string;

  @Field()
  edition: string;

  @Field()
  editor: string;

  @Field()
  limitation: number;

  @Field()
  coverPicture: string;

  @Field()
  backgroundPicture: string;

  @Field()
  step: number;

  @Field()
  archetype: string;
}
