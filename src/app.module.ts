import { Module } from '@nestjs/common';
import { SportsModule } from './sports/sports.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  //Mongoose connection
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    SportsModule,
    CacheModule.register({ isGlobal: true }),
    AuthModule,
  ],
})
export class AppModule {}
