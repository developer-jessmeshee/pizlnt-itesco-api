import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Role {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: true })
  active!: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.index({ name: 1 }, { unique: true });

RoleSchema.virtual('id').get(function (this: { _id: Types.ObjectId }) {
  return this._id?.toHexString();
});
