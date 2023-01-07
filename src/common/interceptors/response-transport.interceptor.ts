import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseResult } from '../interfaces/response.interface';

@Injectable()
export class ResponseTransportInterceptor<T>
  implements NestInterceptor<T, IResponseResult<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseResult<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          result: data,
        };
      }),
    );
  }
}
