import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  firstSurname!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  secondSurname!: string;

  @IsEmail({}, { message: 'El correo debe ser un email válido' })
  @IsNotEmpty()
  @MaxLength(1000)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(1000)
  password!: string;

  @IsMongoId()
  @IsNotEmpty()
  careerId!: string;

  @IsMongoId()
  @IsNotEmpty()
  positionId!: string;

  @IsMongoId()
  @IsNotEmpty()
  roleId!: string;
}
