import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from './order-product.entity';

@Entity({ name: 'order' })
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ default: 1 })
  @Field()
  state: number;

  @Column('decimal', { precision: 5, scale: 2 })
  @Field()
  productsPrice: number;

  @Column('decimal', { precision: 5, scale: 2 })
  @Field()
  totalPrice: number;

  @Column('decimal', { precision: 5, scale: 2 })
  @Field()
  shippingCostPrice: number;

  @Column()
  @Field()
  deliveryDate: Date;

  @Column()
  @Field()
  @CreateDateColumn()
  creationDate: Date;

  @Column()
  @Field()
  trackingNumber: string;

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.orders)
  buyer: User;
}
