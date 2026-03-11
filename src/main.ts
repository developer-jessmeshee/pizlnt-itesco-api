import * as dns from 'node:dns';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dns.setServers([ '1.1.1.1', '8.8.8.8' ]);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    validationError: { target: false }
  }));

  app.useGlobalFilters( new AllExceptionsFilter() );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
