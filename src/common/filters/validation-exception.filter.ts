import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = {
      code: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.toString(),
    };

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'ValidationExceptionFilter',
    );

    response.status(400).json(errorResponse);
  }
}
