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

    const baseQuery: Record<string, any> = {
      active: true,
    };

    const expirationQuery = {
      $or: [
        { fechaExpiracion: { $exists: false } },
        { fechaExpiracion: null },
        { fechaExpiracion: { $gt: now } },
      ],
    };

    const finalQuery: Record<string, any> = {
      $and: [baseQuery, expirationQuery],
    };

    if (careerId) {
      finalQuery.$and.push({ career: careerId });
    }

    if (startDate || endDate) {
      const dateQuery: Record<string, any> = {};
      if (startDate) dateQuery.$gte = new Date(startDate);
      if (endDate) dateQuery.$lte = new Date(endDate);

      finalQuery.$and.push({ createdAt: dateQuery });
    }

    const total = await this.noticeModel.countDocuments(finalQuery);

    const results = await this.noticeModel
      .find(finalQuery)
      .populate([
        {
          path: 'user',
          select: 'name email career',
        },
        {
          path: 'career',
          select: 'name',
        },
      ])
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    return {
      data: results,
      meta: {
        total,
        offset,
        limit,
        count: results.length,
        hasNext: total > offset + limit,
      },
    };
  }

  public async create(noticeData: CreateNoticeData): Promise<NoticeDocument> {
    const newNotice = new this.noticeModel(noticeData);
    return newNotice.save();
  }
}
