import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
        return await this.careerModel.find({ active: true });
    }

    public async updateNameById( id: string, name: string ): Promise<Career> {
        return await this.updateById( id, { name } );
    }

    public async deleteById( id: string ): Promise<Career> {
        return await this.updateById( id, { active: false } );
    }

    private async updateById( id: string, data: { name?: string, active?: boolean } ): Promise<Career> {
        const updateCareer = await this.careerModel
            .findOneAndUpdate( { _id: id, active: true }, data, { new: true } );

        if ( !updateCareer )
            throw new NotFoundException( `El registro con el ID #${ id } no se encontró.` );

        return updateCareer;
    }
}