import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne('username', username);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    return user;
  }

  async login(user: User): Promise<LoginResponse> {
    const { access_token, refresh_token } = await this.signTokens(user);
    await this.usersService.updateOne(user, { refresh_token });

    return {
      refresh_token,
      access_token,
      user,
    };
  }

  async signUp(createUserInput: CreateUserInput): Promise<LoginResponse> {
    const user = await this.usersService.create(createUserInput);
    return await this.login(user);
  }

  async refreshTokens(refresh_token: string): Promise<LoginResponse> {
    const user = await this.resolveRefreshToken(refresh_token);
    const tokens = await this.signTokens(user);
    return { ...tokens, user };
  }

  private async signTokens(user: User): Promise<{
    refresh_token: string;
    access_token: string;
  }> {
    const access_token = await this.signToken(user);
    const refresh_token = await this.signRefreshToken(user);
    return { access_token, refresh_token };
  }

  private async signToken(user: User): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async signRefreshToken(user: User): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    return token;
  }

  private async verifyRefreshToken(refresh_token: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Refresh token not valid');
    }
  }

  private async resolveRefreshToken(refresh_token: string): Promise<User> {
    const [user] = await Promise.all([
      this.usersService.findOne({ refresh_token }),
      this.verifyRefreshToken(refresh_token),
    ]);

    if (!user) throw new UnauthorizedException('Refresh token not found');
    return user;
  }
}
