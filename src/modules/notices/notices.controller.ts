import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNoticeDto } from './dtos/create-notice.dto';
import { NoticesService } from './notices.service';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('mediaAsset'))
  public createNotice(
    @Body() createNoticeDto: CreateNoticeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.noticesService.createNotice(createNoticeDto, file);
  }
}
