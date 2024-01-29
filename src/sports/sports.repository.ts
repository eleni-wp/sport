import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sport } from './schemas/sport.schema';

@Injectable()
export class SportRepository {
  constructor(@InjectModel(Sport.name) private sportModel: Model<Sport>) {}

  async getAllSports(): Promise<Sport[]> {
    return this.sportModel.find().exec();
  }

  async getSportById(id: string): Promise<Sport> {
    return this.sportModel.findById(id);
  }
}
