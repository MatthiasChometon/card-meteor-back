import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.local', '.env'],
      isGlobal: true,
    }),
    JwtModule.register({
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME },
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
