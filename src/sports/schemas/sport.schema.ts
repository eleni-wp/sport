import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SportDocument = HydratedDocument<Sport>;

@Schema()
export class Sport {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
