import { ApiProperty } from '@nestjs/swagger';

export class EmailPasswordDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
