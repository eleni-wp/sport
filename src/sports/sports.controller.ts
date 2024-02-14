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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@ApiTags('sports')
@Controller('sports')
@UseGuards(AuthGuard())
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Get()
  getSports(@GetUser() user: User): Promise<Sport[]> {
    return this.sportsService.getAllSports(user);
  }
  @Get('/lastest-sport')
  getLastestSport() {
    return this.sportsService.getLastestSport();
  }
  @Get('/:id')
  getSportById(@Param('id') id: string, @GetUser() user: User): Promise<Sport> {
    return this.sportsService.getSportById(id, user);
  }

  @Post()
  createSport(
    @Body() createSportDto: CreateSportDto,
    @GetUser() user: User,
  ): Promise<Sport> {
    return this.sportsService.createSport(createSportDto, user);
  }
  @Delete('/:id')
  deleteSport(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.sportsService.deleteSport(id, user);
  }
  @Put('/:id/description')
  updateSportDescription(
    @Param('id') id: string,
    @Body() updateSportDto: UpdateSportDto,
    @GetUser() user: User,
  ): Promise<Sport> {
    return this.sportsService.updateSportDescription(id, updateSportDto, user);
  }
}
