import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [StatsController],
  providers: [StatsService, PrismaService],
})
export class StatsModule {}