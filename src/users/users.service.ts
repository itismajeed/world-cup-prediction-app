import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPasswordEncryptionService,
  PASSWOORD_ENCRYPTION_SERVICE_TOKEN,
} from 'src/lib/interfaces/password-encryption-service.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUsersService } from './interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(PASSWOORD_ENCRYPTION_SERVICE_TOKEN)
    private readonly passwordEncryptionService: IPasswordEncryptionService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) {
      throw new BadRequestException({
        message: 'This email is registered before.',
        code: 1003,
      });
    }
    createUserDto.password = await this.passwordEncryptionService.hash(
      createUserDto.password,
    );
    const newUser = this.usersRepository.create(createUserDto);
    const insertedResult = await this.usersRepository.insert(newUser);
    const [insertedIdResult] = insertedResult.identifiers;
    return insertedIdResult as { id: string };
  }
}
