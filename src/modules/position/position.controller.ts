import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreateBaseCatalog } from 'src/dtos/create-base-catalog.dto';
import { DeleteBaseRecordDto } from 'src/dtos/delete-base-record.dto';
import { UpdateBaseCatalogDto } from 'src/dtos/update-base-catalog.dto';

@Controller( 'position' )
export class PositionController {
    constructor (
        private readonly service: PositionService,
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
    public updateById( @Body() payload: UpdateBaseCatalogDto ) {
        return this.service.updateById( payload );
    }

    @Delete()
    public deleteById( @Query() payload: DeleteBaseRecordDto ) {
        return this.service.deleteById( payload );
    }
}