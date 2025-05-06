import { Inject, Injectable, Scope } from '@nestjs/common';
import Logger, { LogData, LogLevel } from '../type/logger';
import { WINSTON_LOGGER } from '../winston/logger';
import { INQUIRER } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements Logger {
  private appName: string;
  private sourceClass: string;

  public constructor(
    @Inject(WINSTON_LOGGER) private logger: Logger,
    private readonly configService: ConfigService,
    @Inject(INQUIRER) parentClass: object,
  ) {
    this.sourceClass = parentClass?.constructor?.name;

    this.appName = configService.get<string>('app.appName')!;
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ) {
    return this.logger.log(level, message, this.getLogData(data), profile);
  }

  public debug(message: string, data?: LogData, profile?: string) {
    return this.logger.debug(message, this.getLogData(data), profile);
  }

  public info(message: string, data?: LogData, profile?: string) {
    return this.logger.info(message, this.getLogData(data), profile);
  }

  public warn(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.warn(message, this.getLogData(data), profile);
  }

  public error(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.error(message, this.getLogData(data), profile);
  }

  public fatal(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.fatal(message, this.getLogData(data), profile);
  }

  public emergency(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.emergency(message, this.getLogData(data), profile);
  }

  private getLogData(data?: LogData): LogData {
    return {
      ...data,
      appName: data?.appName || this.appName,
      sourceClass: data?.sourceClass || this.sourceClass,
      correlationId: '',
    };
  }

  public startProfile(id: string) {
    this.logger.startProfile(id);
  }
}
