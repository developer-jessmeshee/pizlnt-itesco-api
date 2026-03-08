import { Body, Controller, Post } from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';

@Controller( 'career' )
export class CareerController {
    constructor(
        private readonly service: CareerService,
    ) {}

    @Post()
    public create( @Body() payload: CreateBaseCatalog ) {
        return this.service.create( payload ).then( response => response )
    }


}