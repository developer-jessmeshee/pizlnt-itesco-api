import { Injectable } from '@nestjs/common';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { CareerRepository } from './career.repository';

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
}