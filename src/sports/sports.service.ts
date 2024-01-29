import { UpdateSportDto } from './dto/upate-sport.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sport } from './schemas/sport.schema';
import { Model } from 'mongoose';

@Injectable()
export class SportsService {
  //Inject sport model mongo
  constructor(@InjectModel(Sport.name) private sportModel: Model<Sport>) {}
  private sports = [];

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
  async updateSportDescription(id: string, updateSportDto: UpdateSportDto) {
    try {
      // const sport = await this.sportModel.findOneAndUpdate(
      //   { _id: id },
      //   { description: updateSportDto.description },
      // );

      const foundSport = await this.sportModel.findOne({ _id: id }).exec();

      if (foundSport) {
        await this.sportModel.updateOne(
          { _id: id },
          { description: updateSportDto.description },
        );
      } else {
        throw new NotFoundException(`Sport with ID "${id}" not found`);
      }
      return foundSport;
    } catch (error) {
      throw error;
    }
  }
}
