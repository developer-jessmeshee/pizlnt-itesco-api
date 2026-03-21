import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Career, CareerSchema } from './schemas/career.schema';
import { CareerService } from './career.service';
import { UtilsModule } from 'src/utils/utils.module';
import { CareerRepository } from './career.repository';
import { CareerController } from './career.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Career.name, schema: CareerSchema }]),
        UtilsModule,
    ],
    providers: [
        CareerService,
        CareerRepository,
    ],
    exports: [
        CareerService,
    ],
    controllers: [
        CareerController
    ]
})

export class CareerModule {}