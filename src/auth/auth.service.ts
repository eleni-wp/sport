import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    // Attempt to find a user with the provided username
    const user = await this.userRepository.findOne({ username });

    // Check if a user was found and if the provided password matches the stored hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      // If the credentials are valid, create a JWT payload
      const payload: JwtPayload = { username: username };
      // Sign the JWT payload to generate an access token
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async getProfile(user: User): Promise<User> {
    return await this.userRepository.findOne({ username: user.username });
  }
}
