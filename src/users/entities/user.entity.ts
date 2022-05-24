import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  first_name: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @IsEmail()
  @Field()
  email: string;

  @Column()
  @Field()
  phone: string;

  @Column({
    default: '',
  })
  @Field()
  refresh_token: string;
}
