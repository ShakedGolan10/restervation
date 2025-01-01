import { Injectable } from '@nestjs/common';
import { DbService } from '../../nest/services/db.service';
import { UtilService } from '../../nest/services/util.service';
import { MongoSession, RestaurantModel, SlotsModel } from '../../db/models/index.typegoose';
import { Restaurants } from '../../db/models/restaurants';


@Injectable()
export class TablesService {
  constructor(
    private readonly dbService: DbService,
    readonly utilService: UtilService,
  ) {}

  async addTables(restId: string, tables: number[], sessionObj: MongoSession): Promise<void> {
    try {
      const restTables = tables.map((capacity) => ({
        id: this.utilService.makeId(),
        capacity,
      }));
      const result = await this.dbService.updateDoc(
        restId,
        { tables: restTables },
        RestaurantModel,
        sessionObj,
      );
      if (result.modifiedCount === 0) {
        throw new Error('Doc was not found or no data added');
      }
      const rest = await this.dbService.queryById<typeof Restaurants>(
        restId,
        RestaurantModel,
      );
      const slotsTables = restTables.map((table) => {
        return { ...table, isAvailable: true };
      });
      const slotsTime = this.utilService.buildEmptySlotsForDuration(
        rest,
        8,
        slotsTables,
      );
      await SlotsModel.insertMany(slotsTime, { session: sessionObj.session });
    } catch (error) {
      throw error;
    }
  }
}
