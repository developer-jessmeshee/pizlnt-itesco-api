import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post()
  public create(@Body() payload: CreateUserDto) {
    return this.service.create(payload);
  }
}
