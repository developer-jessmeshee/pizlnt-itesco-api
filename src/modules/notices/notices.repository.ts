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

    // 1. Construimos las condiciones base
    const baseQuery: Record<string, any> = {
      active: true,
    };

    // 2. Condición de Expiración
    const expirationQuery = {
      $or: [
        { fechaExpiracion: { $exists: false } },
        { fechaExpiracion: null },
        { fechaExpiracion: { $gt: now } },
      ],
    };

    // Agrupamos en un $and para poder añadir más filtros sin chocar
    const finalQuery: Record<string, any> = {
      $and: [baseQuery, expirationQuery],
    };

    // 3. Filtro de Carrera EN EL AVISO (No en el populate del usuario)
    if (careerId) {
      finalQuery.$and.push({
        $or: [
          { career: careerId }, // Avisos dirigidos a esta carrera
          { career: { $exists: false } }, // Avisos para todas las carreras (sin campo)
          { career: null }, // Avisos globales explícitos
        ],
      });
    }

    // 4. Filtro de Fechas
    if (startDate || endDate) {
      const dateQuery: Record<string, any> = {};
      if (startDate) dateQuery.$gte = new Date(startDate);
      if (endDate) dateQuery.$lte = new Date(endDate);

      // Añadimos el filtro de fecha de creación al and global
      finalQuery.$and.push({ createdAt: dateQuery });
    }

    // 5. Contamos el total de documentos reales que coinciden con el filtro
    const total = await this.noticeModel.countDocuments(finalQuery);

    // 6. Ejecutamos la consulta con Paginación nativa de Mongo
    const results = await this.noticeModel
      .find(finalQuery)
      .populate({
        path: 'user', // Poblamos el usuario sin condiciones raras, siempre queremos saber quién lo hizo
        select: 'name email career',
      })
      .sort({ createdAt: -1 })
      .skip(offset) // Se salta los registros previos (mucho más rápido que el slice)
      .limit(limit) // Solo trae los que necesitas
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
