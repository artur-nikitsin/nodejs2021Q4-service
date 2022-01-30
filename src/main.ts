import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/exceptions-filter/http-exception.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import dotenv from 'dotenv';

dotenv.config();

const isUseFastify = process.env.USE_FASTIFY;

async function bootstrap() {
  if (isUseFastify) {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
    await app.listen(4000, '0.0.0.0');
  } else {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(4000);
  }
}
bootstrap();
