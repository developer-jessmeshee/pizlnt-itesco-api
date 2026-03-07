import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Career, CareerDocument } from './schemas/career.schema';

@Injectable()
export class CareerRepository {
    constructor(
        @InjectModel( Career.name ) private readonly careerModel: Model<CareerDocument>
    ) {}
}