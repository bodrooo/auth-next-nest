import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentEnum } from 'src/config/app.config';

@Injectable()
export class HelperService {
  constructor(private readonly config: ConfigService) {}

  public isProd() {
    return this.config.get('app.env') == EnvironmentEnum.production;
  }
}
