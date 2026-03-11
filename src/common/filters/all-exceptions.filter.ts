import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFoundDomainError } from '../errors/not-found-domain-error';
import { ConflictDomainError } from '../errors/conflict-domain-error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger( AllExceptionsFilter.name );
  private readonly isProd = process.env.NODE_ENV === 'production';

  public catch( exception: unknown, host: ArgumentsHost ): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const requestId = this.getRequestId(req);
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: Record<string, any> = {
      statusCode: status,
      message: this.isProd ? 'Internal server error' : 'Internal server error',
      timestamp: new Date().toISOString(),
      path: req.url,
      requestId,
    };

    if ( exception instanceof HttpException ) {
      status = exception.getStatus();

      const resp = exception.getResponse();

      if ( typeof resp === 'string' ) {
        body = {
          statusCode: status,
          message: resp,
          timestamp: new Date().toISOString(),
          path: req.url,
          requestId,
        };
      } else if ( typeof resp === 'object' && resp !== null ) {
        const { message, ...rest } = resp as any;

        body = {
          statusCode: status,
          message: message ?? HttpStatus[status],
          timestamp: new Date().toISOString(),
          path: req.url,
          requestId,
          ...rest,
        };
      }
    } else if ( exception instanceof NotFoundDomainError ) {
      status = HttpStatus.NOT_FOUND;

      body = this.makeBody( status, exception.message, req.url, requestId );
    } else if ( exception instanceof ConflictDomainError ) {
      status = HttpStatus.CONFLICT;

      body = this.makeBody( status, exception.message, req.url, requestId );
    } else if ( this.isMongooseCastError( exception ) ) {
      status = HttpStatus.BAD_REQUEST;

      body = this.makeBody( status, 'Invalid id format', req.url, requestId );
    } else if ( this.isMongooseValidationError( exception ) ) {
      status = HttpStatus.BAD_REQUEST;

      const validationDetails = ( exception as any ).errors
        ? Object.values( ( exception as any ).errors ).map( ( e: any ) => e.message )
        : ( exception as any ).message;

      body = {
        statusCode: status,
        message: Array.isArray( validationDetails ) ? 'Validation failed' : validationDetails,
        errors: Array.isArray( validationDetails ) ? validationDetails : [ validationDetails ],
        timestamp: new Date().toISOString(),
        path: req.url,
        requestId,
      };
    } else if ( this.isMongoDuplicateKeyError( exception ) ) {
      status = HttpStatus.CONFLICT;

      const key = this.getDuplicateKey( exception );

      body = this.makeBody(
        status,
        key ? `Duplicate value for '${ key }'` : 'Duplicate key error',
        req.url,
        requestId,
      );
    } else if ( exception instanceof Error ) {
      const message = this.isProd ? 'Internal server error' : exception.message;

      body = this.makeBody( status, message, req.url, requestId );
    }

    const logMessage = ( exception as any )?.message ?? 'unknown error';
    const logStack = ( exception as any )?.stack;

    this.logger.error( logMessage, logStack, AllExceptionsFilter.name );

    res.status( status ).json( body );
  }

  private makeBody( status: number, message: string, path: string, requestId: string ) {
    return {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path,
      requestId,
    };
  }

  private getDuplicateKey( ex: unknown ): ( string | null ) {
    try {
      const keyValue = ( ex as any )?.keyValue;

      if ( keyValue && typeof keyValue === 'object' )
        return Object.keys( keyValue )[ 0 ] ?? null;

      return null;
    } catch {
      return null;
    }
  }

  private isMongoDuplicateKeyError( ex: unknown ): boolean {
    return !!(
        ex &&
      ( ( ex as any ).code === 11000 || ( ex as any ).name === 'MongoServerError' || ( ex as any ).code === 11001 )
    );
  }

  private isMongooseValidationError( ex: unknown ): boolean {
    return !!( ex && ( ex as any ).name === 'ValidationError' );
  }

  private isMongooseCastError( ex: unknown ): boolean {
    return !!( ex && ( ex as any ).name === 'CastError' );
  }

  private getRequestId( req: Request ): string {
    const header = ( req.headers[ 'x-request-id' ] as string ) ?? ( req.headers[ 'x-correlation-id' ] as string );

    if ( header ) return header;

    return ( globalThis as any )?.crypto?.randomUUID?.() ?? `${ Date.now() }`;
  }
}