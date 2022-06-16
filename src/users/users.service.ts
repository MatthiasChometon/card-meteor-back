import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async save(createUserInput: Partial<User>): Promise<User> {
    const userCreated = await this.userRepository.save(createUserInput);
    return userCreated;
  }

  async findOne(userInformations: Partial<User>): Promise<User> {
    return await this.userRepository.findOne({
      where: { ...userInformations },
    });
  }

  async updateOne(userId: number, payload: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new UnauthorizedException('User not exist');

    const userUpdated = { ...user, ...payload };

    if (payload.password)
      userUpdated.password = await this.hashPassword(payload);
    return await this.save(userUpdated);
  }

  async create(createUserInput: CreateUserInput) {
    const { email, username } = createUserInput;
    const [user, password] = await Promise.all([
      this.findOne({ email, username }),
      this.hashPassword(createUserInput),
    ]);

    if (user) throw new UnauthorizedException('User already exist');

    return await this.save({ ...createUserInput, password });
  }

  async hashPassword(createUserInput: Partial<User>) {
    return bcrypt.hash(createUserInput.password, 10);
  }
}
