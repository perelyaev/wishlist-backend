import { Injectable } from '@nestjs/common';
import { User } from './user.type'

@Injectable()
export class AuthService {
  signin(user: User) {
    return user
  }
}
