import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  update(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context,
  ): Promise<User> {
    return this.usersService.updateOne(context.user, updateUserInput);
  }
  }
}
