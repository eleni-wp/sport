import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Sport } from 'src/sports/schemas/sport.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
  @Prop({ type: [Types.ObjectId], ref: Sport.name })
  sports: Sport[];
  _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
