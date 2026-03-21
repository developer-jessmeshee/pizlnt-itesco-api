import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from 'src/utils/utils.module';
import { Position, PositionSchema } from './schemas/position.schema';
import { PositionService } from './position.service';
import { PositionRepository } from './position.repository';
import { PositionController } from './position.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Position.name, schema: PositionSchema }]),
        UtilsModule,
    ],
    providers: [
        PositionService,
        PositionRepository,
    ],
    exports: [
        PositionService,
    ],
    controllers: [
        PositionController,
    ]
})

export class PositionModule {}