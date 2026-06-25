import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'vuong',
      passwordHash: '$2b$10$X5p8Xy4mB9A9.wI6b3P7e.PkWQ7Rvx/9M7Aehs12bS3KjL62sBv7y', 
    },
  ];

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    
    if (isMatch) {
      const { passwordHash, ...result } = user; 
      return result; 
    }
    return null;
  }
}
