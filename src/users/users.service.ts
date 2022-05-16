import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  private readonly users = [
    {
      id: 1,
      username: 'constantin',
      password: 'password',
    },
    {
      id: 2,
      username: 'Jijy',
      password: 'password',
    },
  ];

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.users.length,
    };
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    await this.userRepository.insert({ username: 'test' });
    return this.users;
  }

  findOne(field: string, value: string) {
    return this.users.find((user) => user[field] === value);
  }

  updateOne(userId: number, field: string, value: string) {
    const index = this.users.findIndex((user) => user.id === userId);
    this.users[index] = { ...this.users[index], [field]: value };
  }
}
