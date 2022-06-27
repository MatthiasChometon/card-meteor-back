import { ObjectType, Field } from '@nestjs/graphql';
import { Card } from '../../products/cards/entities/card.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'creationComment' })
@ObjectType()
export class CreationComment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  creationDate: Date;

  @Column({ nullable: true })
  @Field()
  comment: string;

  @ManyToOne(() => Card, (card) => card.comments)
  @JoinColumn()
  card: Card;
}
