import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { UpdateCareerDto } from './dtos/UpdateCareer.dto';
import { DeleteBaseRecordDto } from 'src/dtos/delete-base-record.dto';

@Controller( 'career' )
export class CareerController {
    constructor(
        private readonly service: CareerService,
    ) {}

    @Post()
    public create( @Body() payload: CreateBaseCatalog ) {
        return this.service.create( payload );
    }

    @Get()
    public findAll() {
        return this.service.findAll();
    }

    @Put()
    public updateById( @Body() payload: UpdateCareerDto ) {
        return this.service.updateById( payload );
    }

    @Delete()
    public deleteById( @Query() payload: DeleteBaseRecordDto ) {
        return this.service.deleteById( payload );
    }
}