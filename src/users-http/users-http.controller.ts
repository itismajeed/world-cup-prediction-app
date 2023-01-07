import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  IUsersService,
  USERS_SERVICE_TOKEN,
} from 'src/users/interfaces/users-service.interface';
@ApiTags('Users')
@Controller('users')
export class UsersHttpController {
  constructor(
    @Inject(USERS_SERVICE_TOKEN) private readonly usersService: IUsersService,
  ) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  something() {
    return {
      numb: 1232,
      salam: 23,
    };
  }
  @Get('abbas')
  somethingElse() {
    throw new BadRequestException();
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUsersHttpDto: UpdateUsersHttpDto,
  // ) {
  //   return this.usersService.update(+id, updateUsersHttpDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
