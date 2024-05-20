import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  generateJwt(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });
  }

  async signIn(user: CreateUserDto) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    let dbUser = await this.userService.findByEmail(user.email);
    if (!dbUser) {
      dbUser = await this.registerUser(user);
    }

    const jwtPayload = this.generateJwt({
      sub: dbUser.id,
      email: dbUser.email,
      givenName: dbUser.givenName,
      familyName: dbUser.familyName,
      picture: dbUser.picture,
    });

    return jwtPayload;
  }

  async registerUser(user: CreateUserDto) {
    const newUser = this.userService.create(user);
    return newUser;
  }
  
}
