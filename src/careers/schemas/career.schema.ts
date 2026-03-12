import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CareerDocument = Career & Document;

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

export class Career {
    @Prop({ required: true })
    name!: string;

    @Prop({ default: true })
    active!: boolean;
}

export const CareerSchema = SchemaFactory.createForClass( Career );

CareerSchema.index({ name: 1 }, { unique: true });

CareerSchema.virtual( 'id' ).get( function( this: { _id: Types.ObjectId } ) {
    return this._id?.toHexString();
});