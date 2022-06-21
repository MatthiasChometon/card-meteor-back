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
  attack: string;

  @Field()
  defense: string;

  @Field()
  race: string;

  @Field()
  hasEffect: boolean;

  @Field()
  description: string;

  @Field()
  edition: string;

  @Field()
  editor: string;

  @Field()
  limitation: number;

  @Field()
  serialNumber: number;

  @Field()
  archetype: string;

  @Field()
  type: string;
}
