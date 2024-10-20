import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from './models/user';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      email: 'test@test.com',
      password: 'password',
      userId: '1',
      age: 20,
    },
  ];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };
    this.users.push(user);
    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find((u) => u.userId === updateUserData.userId);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserData);
    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((u) => u.userId === getUserArgs.userId);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((userId) => this.getUser({ userId }));
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (u) => u.userId === deleteUserData.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return user;
  }
}
