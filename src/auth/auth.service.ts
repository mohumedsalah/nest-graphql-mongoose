import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { authConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      return this.generateToke(username, user._id);
    }
    throw Error('repeated username');
  }

  async registerUser(username: string, pass: string) {
    const user = await this.usersService.getOne(username);
    if (!user) {
      //hash password
      const hash = await bcrypt.hash(pass, authConstants.saltOrRounds);
      const result = await this.usersService.addUser({
        username,
        password: hash,
      });
      return this.generateToke(result.username, result._id);
    }
    throw Error('repeated username');
  }

  async generateToke(username: string, _id: string) {
    return this.jwtService.sign({ username, _id });
  }
}
