import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { CareerRepository } from './career.repository';

@Injectable()
export class CareerService {
    private readonly logger = new Logger( CareerService.name );

    constructor(
        private readonly repository: CareerRepository,
    ) {}

    public async create( payload: CreateBaseCatalog ) {
        if ( payload )
            throw new BadRequestException( 'Payload invalid' )

        return payload;
    }
}