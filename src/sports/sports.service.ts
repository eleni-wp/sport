import { UpdateSportDto } from './dto/upate-sport.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { Sport } from './schemas/sport.schema';
import { SportRepository } from './sports.repository';

@Injectable()
export class SportsService {
  constructor(private readonly sportsRepository: SportRepository) {}
  private sports = [];

  async getAllSports(): Promise<Sport[]> {
    return this.sportsRepository.getAllSports();
  }
  async getSportById(id: string): Promise<Sport> {
    return this.sportsRepository.getSportById(id);
  }
  async createSport(createSportDto: CreateSportDto): Promise<Sport> {
    return this.sportsRepository.createSport(createSportDto);
  }
  async deleteSport(id: string): Promise<void> {
    await this.sportsRepository.deleteSport(id);
  }
  async updateSportDescription(id: string, updateSportDto: UpdateSportDto) {
    try {
      const foundSport = await this.sportsRepository.findOneSport(id);

      if (foundSport) {
        await this.sportsRepository.updateSportDescription(id, updateSportDto);
      } else {
        throw new NotFoundException(`Sport with ID "${id}" not found`);
      }
      return foundSport;
    } catch (error) {
      throw error;
    }
  }
}
