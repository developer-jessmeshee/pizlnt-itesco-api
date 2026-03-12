import { Injectable } from '@nestjs/common';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { CareerRepository } from './career.repository';
import { UpdateCareerDto } from './dtos/UpdateCareer.dto';
import { DeleteBaseRecordDto } from 'src/dtos/delete-base-record.dto';

@Injectable()
export class CareerService {
    constructor(
        private readonly repository: CareerRepository,
    ) {}

    public async create( payload: CreateBaseCatalog ) {
        const { name, userId } = payload;

        return await this.repository.create({ name });
    }

    public async findAll() {
        const careers = await this.repository.findAll();

        return careers.map( career => ({ id: career._id, name: career.name }) );
    }

    public async updateById( payload: UpdateCareerDto ) {
        const { careerId, newNameCareer, userId } = payload;

        return await this.repository.updateNameById( careerId, newNameCareer );
    }

    public async deleteById( payload: DeleteBaseRecordDto ) {
        const { recordId, userId } = payload;

        return await this.repository.deleteById( recordId );
    }
}