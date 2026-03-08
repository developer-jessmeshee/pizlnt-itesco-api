import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBaseCatalog {
    @IsString()
    @MinLength( 4 )
    @MaxLength( 100 )
    @IsNotEmpty()
    name!: string;

    @IsMongoId()
    @IsNotEmpty()
    userId!: string;
}