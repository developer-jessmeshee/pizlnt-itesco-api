import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteBaseRecordDto {
    @IsMongoId()
    @IsNotEmpty()
    userId!: string;

    @IsMongoId()
    @IsNotEmpty()
    recordId!: string;
}