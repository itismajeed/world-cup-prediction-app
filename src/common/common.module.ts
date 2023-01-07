import { Module } from '@nestjs/common';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ResponseTransportInterceptor } from './interceptors/response-transport.interceptor';

@Module({
  providers: [ResponseTransportInterceptor, ErrorsInterceptor],
})
export class CommonModule {}
