import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: config,
    }),
    LoggerModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
