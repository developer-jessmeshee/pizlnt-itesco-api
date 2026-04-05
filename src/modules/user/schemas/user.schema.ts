import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Career } from 'src/modules/careers/schemas/career.schema';
import { Position } from 'src/modules/position/schemas/position.schema';
import { Role } from 'src/modules/roles/schemas/role.schema';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  firstSurnames!: string;

  @Prop({ required: true })
  secondSurnames!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: Types.ObjectId, ref: Career.name, required: true })
  career!: Career | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Position.name, required: true })
  position!: Position | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
  role!: Role | Types.ObjectId;

  @Prop({ default: true })
  active!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function (this: { _id: Types.ObjectId }) {
  return this._id?.toHexString();
});
