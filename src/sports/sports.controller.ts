import { ApiTags } from '@nestjs/swagger';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/upate-sport.dto';
import { Sport } from './schemas/sport.schema';
import { SportsService } from './sports.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

@ApiTags('sports')
@Controller('sports')
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Get()
  getSports(): Promise<Sport[]> {
    return this.sportsService.getAllSports();
  }
  @Get('/:id')
  getSportById(@Param('id') id: string): Promise<Sport> {
    return this.sportsService.getSportById(id);
  }
  @Post()
  createSport(@Body() createSportDto: CreateSportDto): Promise<Sport> {
    return this.sportsService.createSport(createSportDto);
  }
  @Delete('/:id')
  deleteSport(@Param('id') id: string): Promise<void> {
    return this.sportsService.deleteSport(id);
  }
  @Put('/:id/description')
  updateSportDescription(
    @Param('id') id: string,
    @Body() updateSportDto: UpdateSportDto,
  ): Promise<Sport> {
    return this.sportsService.updateSportDescription(id, updateSportDto);
  }
}
