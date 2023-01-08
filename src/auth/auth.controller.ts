import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IAuthService, IAuthServiceToken } from './auth-service.interface';
import { EmailPasswordDto } from './dto/EmailPasswordDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthServiceToken) private readonly authService: IAuthService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  loginByEmailAndPassword(
    @Request() request,
    @Body() emailPasswordDto: EmailPasswordDto,
  ) {
    return this.authService.generateTokens(request.user);
  }
}
