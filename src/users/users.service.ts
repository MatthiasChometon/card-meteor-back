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

  async save(createUserInput: CreateUserInput): Promise<User> {
    const userCreated = await this.userRepository.save(createUserInput);
    return userCreated;
  }

  async findOne(userInformations: Partial<User>): Promise<User> {
    return await this.userRepository.findOne({
      where: { ...userInformations },
    });
  }

  async updateOne(userToUpdate: Partial<User>, userUpdated: Partial<User>) {
    const [user] = await Promise.all([
      this.userRepository.findOne(userToUpdate),
      this.userRepository.update(userToUpdate, userUpdated),
    ]);
    return user;
  }

  async create(createUserInput: CreateUserInput) {
    const { email, username } = createUserInput;
    const [user, password] = await Promise.all([
      this.findOne({ email, username }),
      bcrypt.hash(createUserInput.password, 10),
    ]);

    if (user) throw new UnauthorizedException('User already exist');

    return await this.save({ ...createUserInput, password });
  }
}
