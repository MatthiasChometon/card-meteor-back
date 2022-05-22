import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne('username', username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: User) {
    const { access_token, refresh_token } = await this.signTokens(user);
    await this.usersService.updateOne(user.id, 'refresh_token', refresh_token);

    return {
      refresh_token,
      access_token,
      user,
    };
  }

  async signUp(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(
      'username',
      loginUserInput.username,
    );

    if (user) throw new Error('User already exist');

    const password = await bcrypt.hash(loginUserInput.password, 10);

    return this.usersService.create({
      ...loginUserInput,
      password,
    });
  }

  async refreshTokens(refresh_token: string) {
    const user = await this.resolveRefreshToken(refresh_token);
    const tokens = await this.signTokens(user);
    return tokens;
  }

  private async signTokens(user: User) {
    const access_token = await this.signToken(user);
    const refresh_token = await this.signRefreshToken(user, 60 * 60 * 24 * 30);
    return { access_token, refresh_token };
  }

  private async signToken(user: User, expiresIn?: number) {
    const payload = { username: user.username, sub: user.id, expiresIn };
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async signRefreshToken(user: User, expiresIn: number) {
    const payload = { username: user.username, sub: user.id, expiresIn };
    const token = this.jwtService.sign(payload, {
      secret: 'test',
    });
    return token;
  }

  private async resolveRefreshToken(refresh_token: string): Promise<User> {
    const [payload, user] = await Promise.all([
      this.jwtService.verify(refresh_token, {
        secret: 'test',
      }),
      this.usersService.findOne('refresh_token', refresh_token),
    ]);

    if (!payload) throw new Error('Refresh token not valid');
    if (!user) throw new Error('Refresh token not found');

    return user;
  }
}
