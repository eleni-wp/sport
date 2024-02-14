import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Sport } from 'src/sports/schemas/sport.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private usersRepository: Model<User>) {}

  async findOne({ username }) {
    return await this.usersRepository
      .findOne({ username })
      .populate('sports', null, Sport.name)
      .exec();
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this.usersRepository({
      username,
      password: hashedPassword,
    });
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async addSportToUser(userId: string, sportId: string) {
    await this.usersRepository.updateOne(
      { _id: userId },
      {
        $push: {
          sports: sportId,
        },
      },
    );
  }
}
