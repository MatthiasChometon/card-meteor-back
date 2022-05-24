import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../users/dto/create-user.input';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth-guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponse)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signUp(createUserInput);
  }

  @Query(() => LoginResponse)
  refreshTokens(@Args('refresh_token') refresh_token: string) {
    return this.authService.refreshTokens(refresh_token);
  }
}
