import { Injectable } from '@nestjs/common';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  public async create(payload: CreateBaseCatalog) {
    const { name, userId } = payload;

    return await this.repository.create({ name });
  }
}
