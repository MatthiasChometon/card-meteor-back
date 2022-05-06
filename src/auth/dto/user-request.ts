import { Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

export class UserRequest {
  @Field()
  user: User;
}
