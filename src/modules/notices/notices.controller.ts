import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNoticeDto } from './dtos/create-notice.dto';
import { NoticesService } from './notices.service';
import { GetNoticesFilterDto } from './dtos/get-notices-filter.dto';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  public async getAll(@Query() filters: GetNoticesFilterDto) {
    return this.noticesService.findWithFilters(filters);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('mediaAsset'))
  public createNotice(
    @Body() createNoticeDto: CreateNoticeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.noticesService.createNotice(createNoticeDto, file);
  }
}
