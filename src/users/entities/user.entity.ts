import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
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
}
