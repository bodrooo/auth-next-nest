import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
