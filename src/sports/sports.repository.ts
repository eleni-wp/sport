import { User } from 'src/auth/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sport } from './schemas/sport.schema';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/upate-sport.dto';
import { ObjectId } from 'mongodb';
import { UsersRepository } from 'src/auth/users.repository';

@Injectable()
export class SportRepository {
  //Inject sport model mongo
  constructor(
    @InjectModel(Sport.name) private sportModel: Model<Sport>,
    private userRepo: UsersRepository,
  ) {}

  async getAllSports(user: User): Promise<Sport[]> {
    return this.sportModel
      .find({ user })
      .populate('user', null, User.name)
      .exec();
  }

  async getSportById(id: string, user: User): Promise<Sport> {
    return this.sportModel
      .findOne({ _id: id, user: user._id })
      .populate('user', null, User.name);
  }

  async createSport(
    createSportDto: CreateSportDto,
    user: User,
  ): Promise<Sport> {
    const createdSport = new this.sportModel({
      title: createSportDto.title,
      description: createSportDto.description,
      user: user,
    });
    await this.userRepo.addSportToUser(user._id, createdSport._id);

    return createdSport.save();
  }

  async deleteSport(id: string, user: User): Promise<void> {
    await this.sportModel.findOneAndDelete({ _id: id, user: user._id }).exec();
  }
  async findOneSport(id: string, user: User) {
    return await this.sportModel
      .findOne({ _id: new ObjectId(id), user: user._id })
      .exec();
  }
  async updateSportDescription(
    id: string,
    updateSportDto: UpdateSportDto,
    user: User,
  ) {
    await this.sportModel.updateOne(
      { _id: id, user: user._id },
      { description: updateSportDto.description },
    );
  }
}
