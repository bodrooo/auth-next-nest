import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { HttpLoggerMiddleware } from './logger/middleware/http-request.middleware';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: config,
    }),
    LoggerModule,
    CommonModule,
    FeatureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
