import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Career } from 'src/modules/careers/schemas/career.schema';
import { User } from 'src/modules/user/schemas/user.schema';

export type NoticeDocument = Notice & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Notice {
  @Prop({ required: true })
  title!: string;

  @Prop({ default: '#000000' })
  titleColor?: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ default: '#000000' })
  descriptionColor?: string;

  @Prop({ type: Date })
  fechaExpiracion?: Date;

  @Prop()
  mediaUrl?: string;

  @Prop({ default: true })
  active!: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: User | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Career.name })
  career?: Career | Types.ObjectId;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);

NoticeSchema.virtual('id').get(function (this: { _id: Types.ObjectId }) {
  return this._id?.toHexString();
});
