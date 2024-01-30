import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sport, SportSchema } from './schemas/sport.schema';
import { SportRepository } from './sports.repository';

@Module({
  imports: [
    //Mongo
    MongooseModule.forFeature([{ name: Sport.name, schema: SportSchema }]),
  ],
  controllers: [SportsController],
  providers: [SportsService, SportRepository],
})
export class SportsModule {}
