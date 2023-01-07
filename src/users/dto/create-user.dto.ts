import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ default: 'Some random name' })
  fullName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
