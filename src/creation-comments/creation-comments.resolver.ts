import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { CreationCommentsService } from './creation-comments.service';
import { CreateCreationCommentInput } from './dto/create-creation-comment.input';
import { CreationComment } from './entities/creation-comment.entity';

@Resolver(() => CreationComment)
export class CreationCommentsResolver {
  constructor(
    private readonly creationCommentsService: CreationCommentsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => CreationComment)
  @UseGuards(JwtAuthGuard)
  createCreationComment(
    @Args('creationComment') creationCommentInput: CreateCreationCommentInput,
    @Context() context,
  ): Promise<CreationComment> {
    this.usersService.checkIfValidator(context.req.user.role);
    return this.creationCommentsService.create(creationCommentInput);
  }
}
