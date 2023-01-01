import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  authenticate() {
    throw new Error('Not Implemented yet.');
  }

  @Post('register')
  register() {
    throw new Error('Not Implemented yet.');
  }

  @Post('refresh')
  refresh() {
    throw new Error('Not Implemented yet.');
  }
}
