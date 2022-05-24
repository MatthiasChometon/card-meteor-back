import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  first_name: string;

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
  refresh_token: string;
}
