import { Injectable } from '@nestjs/common';
import { User } from './models/user';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  public updateUser(user: User): User {
    const userIndex = this.users.findIndex((u) => u.userId === user.userId);
    this.users[userIndex] = user;
    return user;
  }

  public getUser(userId: string | number): User {
    return this.users.find((u) => u.userId === userId);
  }

  public getUsers(): User[] {
    return this.users;
  }

  public deleteUser(userId: string | number): User {
    const userIndex = this.users.findIndex((u) => u.userId === userId);
    const user = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return user;
  }
}
