import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { CardsModule } from './products/cards/cards.module';
import { OrderModule } from './order/order.module';
import { UploadModule } from './upload/upload.module';
import { CreationCommentsModule } from './creation-comments/creation-comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.local', '.env'],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      playground: true,
      cache: 'bounded',
      persistedQueries: {
        ttl: 900,
      },
    }),
    UsersModule,
    AuthModule,
    CardsModule,
    OrderModule,
    UploadModule,
    CreationCommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
