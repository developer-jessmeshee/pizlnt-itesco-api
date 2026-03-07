import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Career, CareerSchema } from './schemas/career.schema';
import { CareerService } from './career.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Career.name, schema: CareerSchema }]),
    ],
    providers: [
        CareerService,
    ],
    exports: [
        CareerService,
    ]
})

export class CareerModule {}