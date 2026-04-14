import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dtos/create-notice.dto';
import { CloudinaryService } from './services/cloudinary.service';
import { NoticesRepository } from './notices.repository';
import { CreateNoticeData } from './interfaces/create-notice-data.interface';
import { GetNoticesFilterDto } from './dtos/get-notices-filter.dto';

@Injectable()
export class NoticesService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly repository: NoticesRepository,
  ) {}

  public async findWithFilters(filters: GetNoticesFilterDto) {
    return await this.repository.findWithFilters(filters);
  }

  public async createNotice(
    createNoticeDto: CreateNoticeDto,
    file?: Express.Multer.File,
  ) {
    let mediaUrl = null;

    if (file) {
      const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
      mediaUrl = cloudinaryResponse.secure_url;
    }

    const { userId, ...resData } = createNoticeDto;

    const data: CreateNoticeData = {
      ...resData,
      user: userId,
      mediaUrl,
    };

    return {
      message: 'Aviso creado con éxito',
      data: await this.repository.create(data),
    };
  }
}
