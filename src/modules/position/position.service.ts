import { Injectable } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { DeleteBaseRecordDto } from 'src/dtos/delete-base-record.dto';
import { UpdateBaseCatalogDto } from 'src/dtos/update-base-catalog.dto';

@Injectable()
export class PositionService {
    constructor(
        private readonly repository: PositionRepository,
    ) {}

    public async create( payload: CreateBaseCatalog ) {
            const { name, userId } = payload;
    
            return await this.repository.create({ name });
        }
    
        public async findAll() {
            const careers = await this.repository.findAll();
    
            return careers.map( career => ({ id: career._id, name: career.name }) );
        }
    
        public async updateById( payload: UpdateBaseCatalogDto ) {
            const { recordId, newName, userId } = payload;
    
            return await this.repository.updateNameById( recordId, newName );
        }
    
        public async deleteById( payload: DeleteBaseRecordDto ) {
            const { recordId, userId } = payload;
    
            return await this.repository.deleteById( recordId );
        }
}