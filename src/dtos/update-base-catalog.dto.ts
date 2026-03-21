import { IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBaseCatalogDto {
    @IsString()
    @MinLength( 4 )
    @MaxLength( 100 )
    @IsNotEmpty()
    newName!: string;

    @IsMongoId()
    @IsNotEmpty()
    userId!: string;

    @IsMongoId()
    @IsNotEmpty()
    recordId!: string;
}