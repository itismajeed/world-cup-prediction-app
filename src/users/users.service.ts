import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPasswordEncryptionService,
  PASSWORD_ENCRYPTION_SERVICE_TOKEN,
} from 'src/lib/interfaces/password-encryption-service.interface';
import { EntityNotFoundError, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUsersService } from './interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(PASSWORD_ENCRYPTION_SERVICE_TOKEN)
    private readonly passwordEncryptionService: IPasswordEncryptionService,
  ) {}
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      // todo: make error handling more sane
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException({
          message: 'Could not find resource with specified ID.',
          email,
        });
      }
      throw error;
    }
  }
  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      // todo: make error handling more sane
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException({
          message: 'Could not find resource with specified ID.',
          id,
        });
      }
      throw error;
    }
  }
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
