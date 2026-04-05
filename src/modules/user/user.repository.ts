import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ email })
      .populate(['career', 'position', 'role'])
      .exec();
  }

  public async create(userDto: CreateUserDto): Promise<User> {
    try {
      const securePassword = await this.hashedPassword(userDto.password);

      const user = new this.userModel({
        name: userDto.name,
        firstSurnames: userDto.firstSurname,
        secondSurnames: userDto.secondSurname,
        email: userDto.email,
        password: securePassword,
        career: userDto.careerId,
        position: userDto.positionId,
        role: userDto.roleId,
      });

      return await user.save();
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new ConflictException(
          'Ya existe un usuario registrado con este correo electrónico.',
        );
      }

      throw error;
    }
  }

  private async hashedPassword(password: string): Promise<string> {
    const saltRounds: number = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
