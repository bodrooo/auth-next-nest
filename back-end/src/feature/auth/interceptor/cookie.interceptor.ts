import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HelperService } from 'src/common/service/helper.service';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private helper: HelperService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      tap((data) => {
        response.cookie('token', data.token, {
          httpOnly: true,
          secure: this.helper.isProd(),
          sameSite: 'lax',
        });

        delete data.token;

        return { user: data.user };
      }),
    );
  }
}
