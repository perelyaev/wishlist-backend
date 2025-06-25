import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { User } from './user.type';

@Injectable()
export class AuthService {
  signin(user: User) {
    return bcrypt.hashSync(Math.floor(100000 + Math.random() * 900000).toString(), 10);
  }
}
