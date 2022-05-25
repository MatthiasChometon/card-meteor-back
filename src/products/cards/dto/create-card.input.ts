import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateCardInput {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  level: number;

  @Column()
  @Field()
  attribute: string;

  @Column()
  @Field()
  attack: number;

  @Column()
  @Field()
  defense: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  edition: string;

  @Column()
  @Field()
  editor: string;

  @Column()
  @Field()
  limitation: number;

  @Column()
  @Field()
  coverPicture: string;

  @Column()
  @Field()
  backgroundPicture: string;

  @Column()
  @Field()
  state: number;
}
