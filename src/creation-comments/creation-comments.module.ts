import { Module } from '@nestjs/common';
import { CreationCommentsService } from './creation-comments.service';
import { CreationCommentsResolver } from './creation-comments.resolver';
import { DatabaseModule } from '../database/database.module';
import { creationCommentProviders } from './creation-comments.providers';
import { userProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { cardProviders } from '../products/cards/cards.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreationCommentsResolver,
    CreationCommentsService,
    UsersService,
    ...cardProviders,
    ...creationCommentProviders,
    ...userProviders,
  ],
  exports: [...creationCommentProviders],
})
export class CreationCommentsModule {}
