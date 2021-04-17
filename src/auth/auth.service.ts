import { BadRequestException, Injectable } from '@nestjs/common';
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
    const user = await this.usersService.getOneByUsername(username);

    if (user && bcrypt.compareSync(pass, user.password)) {
      return this.generateToke(username, user._id);
    }
    throw new BadRequestException('not valid username or password');
  }

  async registerUser(username: string, pass: string) {
    const user = await this.usersService.getOneByUsername(username);
    if (user) throw new BadRequestException('username already token');
    //hash password
    const hash = await bcrypt.hash(pass, authConstants.saltOrRounds);
    const result = await this.usersService.addUser({
      username,
      password: hash,
    });
    return this.generateToke(result.username, result._id);
  }

  private async generateToke(username: string, _id: string) {
    return { access_token: this.jwtService.sign({ username, _id }) };
  }
}
