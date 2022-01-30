import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InnerDataValidationPipe } from './utils/pipes/innerDataValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new InnerDataValidationPipe());
  await app.listen(4000);
}
bootstrap();
