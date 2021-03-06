import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
