import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/user.entity';

export type SportDocument = HydratedDocument<Sport>;

@Schema({ timestamps: true })
export class Sport {
  _id: any;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
