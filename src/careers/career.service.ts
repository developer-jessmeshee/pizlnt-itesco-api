import { Injectable, Logger } from '@nestjs/common';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';

@Injectable()
export class CareerService {
    private readonly logger = new Logger( CareerService.name );

    public async create( payload: CreateBaseCatalog ) {
        return payload;
    }
}