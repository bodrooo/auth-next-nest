import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [LoggerModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
