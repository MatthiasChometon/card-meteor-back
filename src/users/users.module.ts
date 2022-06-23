import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersResolver, UsersService, ...userProviders],
  exports: [UsersService, ...userProviders],
})
export class UsersModule {}
