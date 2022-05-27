import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  username: string;

  @MinLength(10)
  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  phone: string;

  @IsEmail()
  @Field({ nullable: true })
  email: string;
}
