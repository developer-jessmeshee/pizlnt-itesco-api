import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async create(userDto: CreateUserDto) {
    return await this.repository.create(userDto);
  }

  public async findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }
}
