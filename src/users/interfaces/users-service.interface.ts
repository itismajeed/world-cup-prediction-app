import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<{ id: string }>;
  // findAll(): Promise<User[]>;
  findOneById(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  // update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  // remove(id: string): Promise<User>;
}

export const USERS_SERVICE_TOKEN = 'IUsersService';
