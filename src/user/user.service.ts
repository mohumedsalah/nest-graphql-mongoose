import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';
import { RegisterInput } from '../auth/models/registerInput';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addUser(doc: RegisterInput): Promise<User> {
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
