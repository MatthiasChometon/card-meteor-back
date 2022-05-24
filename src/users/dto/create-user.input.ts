import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  last_name: string;

  @Field({ nullable: false })
  first_name: string;

  @Field({ nullable: false })
  username: string;

  @MinLength(10)
  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  phone: string;

  @IsEmail()
  @Field({ nullable: false })
  email: string;
}
