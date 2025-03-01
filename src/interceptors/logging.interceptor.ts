import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, path: url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<Response>();

        const { statusCode } = response;

        this.logger.log(
          `\n🚀 [${method}] ${url} | Status: ${statusCode} \n📌 Controller: ${context.getClass().name} \n🔧 Handler: ${context.getHandler().name} \n⏱️  Execution Time: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
