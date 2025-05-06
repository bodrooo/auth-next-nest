import { Global, Module } from '@nestjs/common';
import { HelperService } from './service/helper.service';
import { PrismaService } from './service/prisma.service';

@Global()
@Module({
  providers: [HelperService, PrismaService],
  exports: [HelperService, PrismaService],
})
export class CommonModule {}
