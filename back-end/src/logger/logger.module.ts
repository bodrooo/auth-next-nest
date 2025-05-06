import { Module } from '@nestjs/common';
import { WINSTON_TRANSPORT, WinstonTransport } from './winston/transport';
import { WINSTON_LOGGER, WinstonLogger } from './winston/logger';

@Module({
  providers: [
    {
      provide: WINSTON_TRANSPORT,
      useFactory: () => {
        const transportProvider = new WinstonTransport();
        return transportProvider.TRANSPORT;
      },
    },
    {
      provide: WINSTON_LOGGER,
      useClass: WinstonLogger,
    },
  ],
})
export class LoggerModule {}
