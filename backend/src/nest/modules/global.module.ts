import { Global, Module } from '@nestjs/common';
import { DbService } from '../services/db.service';
import { UtilService } from '../services/util.service';

@Global()
@Module({
  providers: [DbService, UtilService],
  exports: [DbService, UtilService],
})
export class GlobalModule {};
