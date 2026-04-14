import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice, NoticeDocument } from './schemas/notice.schemas';
import { CreateNoticeData } from './interfaces/create-notice-data.interface';
import { GetNoticesFilterDto } from './dtos/get-notices-filter.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class NoticesRepository {
  constructor(
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
  ) {}

  public async findWithFilters(filters: GetNoticesFilterDto) {
    const { limit = 10, offset = 0, careerId, startDate, endDate } = filters;
    const now = new Date();

    const query: Record<string, any> = {
      active: true,
      $or: [
        { fechaExpiracion: { $exists: false } },
        { fechaExpiracion: null },
        { fechaExpiracion: { $gt: now } },
      ],
    };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    let mongooseQuery = this.noticeModel.find(query);

    mongooseQuery.populate({
      path: 'user',
      select: 'name email career',
      match: careerId ? { career: new Types.ObjectId(careerId) } : {},
    });

    let results = await mongooseQuery.sort({ createdAt: -1 }).exec();

    if (careerId) {
      results = results.filter((notice) => notice.user !== null);
    }

    const total = results.length;

    const paginatedData = results.slice(offset, offset + limit);

    return {
      data: paginatedData,
      meta: {
        total,
        offset,
        limit,
        count: paginatedData.length,
        hasNext: total > offset + limit,
      },
    };
  }

  public async create(noticeData: CreateNoticeData): Promise<NoticeDocument> {
    const newNotice = new this.noticeModel(noticeData);
    return newNotice.save();
  }
}
