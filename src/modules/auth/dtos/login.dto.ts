import { Type } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(1)
  @Type(() => String)
  email!: string;

  @IsString()
  @MinLength(1)
  @Type(() => String)
  password!: string;
}
