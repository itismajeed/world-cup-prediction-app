import { PartialType } from '@nestjs/swagger';
import { CreateUsersHttpDto } from './create-users-http.dto';

export class UpdateUsersHttpDto extends PartialType(CreateUsersHttpDto) {}
