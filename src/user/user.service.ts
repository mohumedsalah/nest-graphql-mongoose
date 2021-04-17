import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from 'src/auth/requests/user.loginRequest';
import { User, UserDocument } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addUser(doc: UserInput): Promise<User> {
    const createdCat = new this.userModel(doc);
    return await createdCat.save();
  }

  async getOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async getOneByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }
}
