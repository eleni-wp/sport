import { Module } from '@nestjs/common';
import { SportsModule } from './sports/sports.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  //Mongoose connection
  imports: [SportsModule, MongooseModule.forRoot('mongodb://localhost/sports')],
})
export class AppModule {}
