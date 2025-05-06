import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestLoggerService } from './logger/service/nest-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(NestLoggerService));
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
