import { IsString, IsEnum } from 'class-validator';
import { registerConfig } from './util/config-register';

export class JwtConfig {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

export default registerConfig('jwt', JwtConfig, ({ env }) => ({
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN,
}));
