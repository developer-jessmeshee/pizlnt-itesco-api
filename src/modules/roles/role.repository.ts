import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  public async create(roleDto: { name: string }): Promise<Role> {
    try {
      const role = new this.roleModel(roleDto);

      return await role.save();
    } catch (error: any) {
      if (error?.code === 11000)
        throw new ConflictException('Ya existe un rol con el mismo nombre.');

      throw error;
    }
  }
}
