import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cards' })
@ObjectType()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
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

  @Column({ default: 0.1 })
  @Field()
  price: number;

  @Column()
  @Field()
  step: number;

  @UpdateDateColumn()
  @Field(() => Date)
  updateDate: Date;

  @Column()
  @Field()
  archetype: string;
}
