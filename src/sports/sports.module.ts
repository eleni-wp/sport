import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sport, SportSchema } from './schemas/sport.schema';
import { SportRepository } from './sports.repository';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/user.entity';

@Module({
  imports: [
    //Mongo
    MongooseModule.forFeature([
      { name: Sport.name, schema: SportSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [SportsController],
  providers: [SportsService, SportRepository],
})
//Middleware
export class SportsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
