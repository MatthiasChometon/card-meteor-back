import { Field, ObjectType } from '@nestjs/graphql';
import { Card } from '../../products/cards/entities/card.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'orderProduct' })
@ObjectType()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  number: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Card, (user) => user.orderProducts)
  @JoinColumn()
  product: Card;
}
