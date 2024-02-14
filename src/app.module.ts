import { Module } from '@nestjs/common';
import { SportsModule } from './sports/sports.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';

@Module({
  //Mongoose connection
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sports'),
    SportsModule,
    CacheModule.register({ isGlobal: true }),
    AuthModule,
  ],
})
export class AppModule {}
