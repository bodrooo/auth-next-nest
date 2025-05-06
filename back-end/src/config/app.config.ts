import { IsString, IsEnum } from 'class-validator';
import { registerConfig } from './util/config-register';

export enum EnvironmentEnum {
  production,
  development,
}

export class AppConfig {
  @IsString()
  @IsEnum(EnvironmentEnum)
  NODE_ENV: string;

  @IsString()
  APP_NAME: string;
}

export default registerConfig('app', AppConfig, ({ env }) => ({
  nodeEnv: env.NODE_ENV,
  appName: env.APP_NAME,
}));
