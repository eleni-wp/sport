import { UpdateSportDto } from './dto/upate-sport.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { Sport } from './schemas/sport.schema';
import { SportRepository } from './sports.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SportsService {
  // Cache
  constructor(
    private readonly sportsRepository: SportRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllSports(user: User): Promise<Sport[]> {
    return this.sportsRepository.getAllSports(user);
  }
  async getSportById(id: string, user: User): Promise<Sport> {
    return this.sportsRepository.getSportById(id, user);
  }
  async getLastestSport() {
    return await this.cacheManager.get('sport');
  }
  async createSport(
    createSportDto: CreateSportDto,
    user: User,
  ): Promise<Sport> {
    await this.cacheManager.set('sport', createSportDto.title, 0);
    return this.sportsRepository.createSport(createSportDto, user);
  }
  async deleteSport(id: string, user: User): Promise<void> {
    await this.sportsRepository.deleteSport(id, user);
  }
  async updateSportDescription(
    id: string,
    updateSportDto: UpdateSportDto,
    user: User,
  ) {
    try {
      const foundSport = await this.sportsRepository.findOneSport(id, user);

      if (foundSport) {
        await this.sportsRepository.updateSportDescription(
          id,
          updateSportDto,
          user,
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
