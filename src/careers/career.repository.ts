import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Career, CareerDocument } from './schemas/career.schema';

@Injectable()
export class CareerRepository {
    constructor(
        @InjectModel( Career.name ) private readonly careerModel: Model<CareerDocument>
    ) {}

    public async create( careerDto: { name: string } ): Promise<Career> {
        try {
            const career = new this.careerModel( careerDto );

            return await career.save();
        } catch ( error: any ) {
            if ( error?.code === 11000 )
                throw new ConflictException( 'Ya existe una carrera con el mismo nombre' );

            throw error;
        }
    }

    public async findAll() {
        return await this.careerModel.find();
    }
}