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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    return user;
  }

  async login(user: User): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.signTokens(user);
    await this.usersService.updateOne(user, { refreshToken });

    return {
      refreshToken,
      accessToken,
      user,
    };
  }

  async signUp(createUserInput: CreateUserInput): Promise<LoginResponse> {
    const user = await this.usersService.create(createUserInput);
    return await this.login(user);
  }

  async refreshTokens(refreshToken: string): Promise<LoginResponse> {
    const user = await this.resolveRefreshToken(refreshToken);
    const tokens = await this.signTokens(user);
    return { ...tokens, user };
  }

  private async signTokens(user: User): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    const accessToken = await this.signToken(user);
    const refreshToken = await this.signRefreshToken(user);
    return { accessToken, refreshToken };
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
      email: user.email,
      sub: user.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    return token;
  }

  private async verifyRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Refresh token not valid');
    }
  }

  private async resolveRefreshToken(refreshToken: string): Promise<User> {
    const [user] = await Promise.all([
      this.usersService.findOne({ refreshToken }),
      this.verifyRefreshToken(refreshToken),
    ]);

    if (!user) throw new UnauthorizedException('Refresh token not found');
    return user;
  }
}
