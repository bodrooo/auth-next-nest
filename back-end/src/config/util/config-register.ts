import { registerAs } from '@nestjs/config';
import { ClassConstructor } from 'class-transformer';
import validateConfig from './config-validator';

export const registerConfig = <TConfig extends object>(
  name: string,
  configClass: ClassConstructor<TConfig>,
  factory: ({ env }: { env: any }) => Partial<any>,
) =>
  registerAs(name, () => {
    const env = process.env;
    validateConfig(env, configClass);

    return {
      ...(factory?.({ env }) || {}),
    } as TConfig;
  });
