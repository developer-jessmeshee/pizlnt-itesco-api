import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsHexColor,
  IsDateString,
  IsMongoId,
} from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title!: string;

  @IsOptional()
  @IsHexColor({ message: 'El color del título debe ser un hexadecimal válido' })
  titleColor?: string;

  @IsString()
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description!: string;

  @IsOptional()
  @IsHexColor({
    message: 'El color de la descripción debe ser un hexadecimal válido',
  })
  descriptionColor?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de expiración no tiene un formato válido' },
  )
  fechaExpiracion?: string;

  @IsMongoId()
  @IsNotEmpty()
  userId!: string;

  @IsMongoId()
  @IsNotEmpty()
  careerId!: string;
}
