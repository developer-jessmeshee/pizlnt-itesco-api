import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PositionDocument = Position & Document 

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

export class Position {
    @Prop({ required: true })
    name!: string;
    
    @Prop({ default: true })
    active!: boolean;
}

export const PositionSchema = SchemaFactory.createForClass( Position );

PositionSchema.index({ name: 1 }, { unique: true });

PositionSchema.virtual( 'id' ).get( function( this: { _id: Types.ObjectId } ) {
    return this._id?.toHexString();
});