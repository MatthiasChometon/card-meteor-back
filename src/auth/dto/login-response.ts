import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  refresh_token: string;

  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
