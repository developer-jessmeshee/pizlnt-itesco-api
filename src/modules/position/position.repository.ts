import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position, PositionDocument } from './schemas/position.schema';

@Injectable()
export class PositionRepository {
    constructor(
        @InjectModel( Position.name ) private readonly positionModel: Model<PositionDocument>
    ) {}

    public async create( positionDto: { name: string } ): Promise<Position> {
        try {
            const position = new this.positionModel( positionDto );

            return await position.save();
        } catch ( error: any ) {
            if ( error?.code === 11000 )
                throw new ConflictException( 'Ya existe un puesto con el mismo nombre.' );

            throw error;
        }
    }

    public async findAll() {
        return await this.positionModel.find({ active: true });
    }

    public async updateNameById( id: string, name: string ): Promise<Position> {
        return await this.updateById( id, { name } );
    }
    
    public async deleteById( id: string ): Promise<Position> {
        return await this.updateById( id, { active: false } );
    }

    private async updateById( id: string, data: { name?: string, active?: boolean } ): Promise<Position> {
        const updatePosition = await this.positionModel
            .findOneAndUpdate( { _id: id, active: true }, data, { new: true } );

        if ( !updatePosition )
            throw new NotFoundException( `El registro con el ID #${ id } no se encontró.` );

        return updatePosition;
    }
}