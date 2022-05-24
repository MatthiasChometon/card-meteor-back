import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  first_name: string;

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
