import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUsersHttpDto } from './dto/create-users-http.dto';
import { UpdateUsersHttpDto } from './dto/update-users-http.dto';

@Controller('users-http')
export class UsersHttpController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUsersHttpDto: CreateUsersHttpDto) {
    return this.usersService.create(createUsersHttpDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersHttpDto: UpdateUsersHttpDto,
  ) {
    return this.usersService.update(+id, updateUsersHttpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
