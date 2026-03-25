import { Body, Controller, Post } from '@nestjs/common';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  public create(@Body() payload: CreateBaseCatalog) {
    return this.service.create(payload);
  }
}
