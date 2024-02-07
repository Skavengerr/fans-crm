import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(user: Partial<User>) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.userModel.create(user);
  }

  findOne(id: string) {
    return this.userModel.findOne({ where: { id } });
  }
}
