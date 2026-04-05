import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notice, NoticeDocument } from './schemas/notice.schemas';
import { CreateNoticeData } from './interfaces/create-notice-data.interface';

@Injectable()
export class NoticesRepository {
  constructor(
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
  ) {}

  public async create(noticeData: CreateNoticeData): Promise<NoticeDocument> {
    const newNotice = new this.noticeModel(noticeData);

    return newNotice.save();
  }
}
