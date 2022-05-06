import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
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

  findAll() {
    return this.users;
  }

  findOne(field: string, value: string) {
    return this.users.find((user) => user[field] === value);
  }

  }
}
