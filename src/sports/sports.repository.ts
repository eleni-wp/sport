import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sport } from './schemas/sport.schema';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/upate-sport.dto';

@Injectable()
export class SportRepository {
  //Inject sport model mongo
  constructor(@InjectModel(Sport.name) private sportModel: Model<Sport>) {}

  async getAllSports(): Promise<Sport[]> {
    return this.sportModel.find().exec();
  }

  async getSportById(id: string): Promise<Sport> {
    return this.sportModel.findById(id);
  }

  async createSport(createSportDto: CreateSportDto): Promise<Sport> {
    const createdSport = new this.sportModel(createSportDto);

    return createdSport.save();
  }

  async deleteSport(id: string): Promise<void> {
    await this.sportModel.findByIdAndDelete(id);
  }
  async findOneSport(id: string) {
    return await this.sportModel.findOne({ _id: id }).exec();
  }
  async updateSportDescription(id: string, updateSportDto: UpdateSportDto) {
    await this.sportModel.updateOne(
      { _id: id },
      { description: updateSportDto.description },
    );
  }
}
