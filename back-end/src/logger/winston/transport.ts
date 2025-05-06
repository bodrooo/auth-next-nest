import { Injectable } from '@nestjs/common';
import { HelperService } from 'src/common/service/helper.service';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const WINSTON_TRANSPORT = Symbol();

@Injectable()
export class WinstonTransport {
  CONSOLE: winston.transport;
  FILE: winston.transport;
  TRANSPORT: winston.transport[] = [];

  constructor(private helper: HelperService) {
    this.buildConsole();
    this.TRANSPORT.push(this.CONSOLE);

    if (helper.isProd()) {
      this.buildDailyRotateFile();
      this.TRANSPORT.push(this.FILE);
    }
  }

  private buildConsole() {
    const formatLog = (log: any): string => {
      const {
        label,
        correlationId,
        sourceClass,
        error,
        durationMs,
        stack,
        props,
      } = log.data || {};
      const prefix = label ? `[${label}]` : '';
      const correlation = correlationId ? `(${correlationId})` : '';
      const source = sourceClass ? `[${sourceClass}]` : '';
      const errorMsg = error ? ` - ${error}` : '';
      const duration = durationMs !== undefined ? ` +${durationMs}ms` : '';
      const stackTrace = stack ? `  - ${stack}` : '';
      const propsStr = props
        ? `\n  - Props: ${JSON.stringify(props, null, 4)}`
        : '';

      return `${prefix} - ${log.timestamp} |${correlation} ${log.level.toUpperCase()} ${source} ${log.message}${errorMsg}${duration}${stackTrace}${propsStr}`;
    };

    this.CONSOLE = new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(formatLog),
      ),
    });
  }

  private buildDailyRotateFile() {
    this.FILE = new DailyRotateFile({
      dirname: 'logs',
      filename: 'log-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });
  }
}
