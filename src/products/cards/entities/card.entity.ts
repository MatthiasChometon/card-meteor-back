import { ObjectType, Field } from '@nestjs/graphql';
import { OrderProduct } from '../../../order/entities/order-product.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreationComment } from '../../../creation-comments/entities/creation-comment.entity';

@Entity({ name: 'cards' })
@ObjectType()
export class Card {
  @PrimaryGeneratedColumn()
  @Field()
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
  attack: string;

  @Column()
  @Field()
  defense: string;

  @Column()
  @Field()
  race: string;

  @Column()
  @Field()
  hasEffect: boolean;

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

  @Column({ default: 0.1, type: 'float' })
  @Field()
  price: number;

  @Column({ default: 1 })
  @Field()
  step: number;

  @Column()
  @Field()
  serialNumber: number;

  @UpdateDateColumn()
  @Field(() => Date)
  updateDate: Date;

  @Column()
  @Field()
  archetype: string;

  @Column()
  @Field()
  type: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts: OrderProduct[];

  @Field(() => [CreationComment])
  @OneToMany(() => CreationComment, (creationComment) => creationComment.card, {
    cascade: true,
  })
  comments: CreationComment[];
}
