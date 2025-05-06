import { Module } from '@nestjs/common';
import { WINSTON_TRANSPORT, WinstonTransport } from './winston/transport';

@Module({
  providers: [
    {
      useClass: WinstonTransport,
      provide: WINSTON_TRANSPORT,
      useFactory: (transportProvider: WinstonTransport) =>
        transportProvider.TRANSPORT,
    },
  ],
})
export class LoggerModule {}
