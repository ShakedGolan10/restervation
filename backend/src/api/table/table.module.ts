import { Module } from '@nestjs/common';
import { TablesController } from './table.controller';
import { TablesService } from './table.service';

@Module({
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
