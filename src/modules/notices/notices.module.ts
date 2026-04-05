import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { NoticesRepository } from './notices.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './schemas/notice.schemas';
import { CloudinaryService } from './services/cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [NoticesController],
  providers: [
    NoticesService,
    NoticesRepository,
    CloudinaryService,
    CloudinaryProvider,
  ],
  exports: [NoticesService],
})
export class NoticesModule {}
