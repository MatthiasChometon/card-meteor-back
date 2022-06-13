import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from '../../order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  firstName: string;

  @Column({ unique: false, nullable: false })
  @Field({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: false, nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  phone: string;

  @Column({
    default: '',
  })
  refreshToken: string;

  @Field({ nullable: false })
  @Column({
    default: 'user',
  })
  role: string;

  @Field(() => [Order], { nullable: false })
  @OneToMany(() => Order, (order) => order.buyer, { cascade: true })
  orders: Order[];
}
