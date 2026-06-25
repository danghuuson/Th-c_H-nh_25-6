import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, { id: user.id });
  }

  async deserializeUser(payload: any, done: (err: Error, payload: any) => void): Promise<any> {
    done(null, payload); 
  }
}