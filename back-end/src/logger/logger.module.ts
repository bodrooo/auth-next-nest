import { Module } from '@nestjs/common';
import { WINSTON_TRANSPORT, WinstonTransport } from './winston/transport';
import { WINSTON_LOGGER, WinstonLogger } from './winston/logger';
import { HelperService } from 'src/common/service/helper.service';
import { LoggerService } from './service/logger.service';
import { NestLoggerService } from './service/nest-logger.service';
import Logger from './type/logger';

@Module({
  providers: [
    {
      provide: WinstonTransport,
      useClass: WinstonTransport,
    },
    {
      inject: [WinstonTransport, HelperService],
      provide: WINSTON_TRANSPORT,
      useFactory: (transportProvider: WinstonTransport) =>
        transportProvider.TRANSPORT,
    },
    {
      provide: WINSTON_LOGGER,
      useClass: WinstonLogger,
    },
    {
      provide: NestLoggerService,
      useFactory: (logger: Logger) => new NestLoggerService(logger),
      inject: [LoggerService],
    },
    LoggerService,
  ],
  exports: [LoggerService, NestLoggerService],
})
export class LoggerModule {}
