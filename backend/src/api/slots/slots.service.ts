import { Injectable } from '@nestjs/common';
import { DbService } from '../../nest/services/db.service';
import { UtilService } from '../../nest/services/util.service';
import { RestaurantModel, SlotsModel } from '../../db/models/index.typegoose';
import { Slots } from '../../db/models/slots';
import { QueryReturnType } from '../../../types';
import { Restaurants } from '../../db/models/restaurants';

@Injectable()
export class SlotsService {
  constructor(
    private readonly dbService: DbService,
    readonly utilService: UtilService,
  ) {}

  async getSlotsPerRest(
    restId: string,
    time: Date,
  ): Promise<QueryReturnType<typeof Slots>[]> {
    const selectedTime = this.utilService.getOriginTime(time, +3);
    const rest = await this.dbService.queryById<typeof Restaurants>(
      restId,
      RestaurantModel,
    );
    const allSlotsForDate = await this._getSlots(rest, selectedTime);
    return allSlotsForDate;
  }

  private async _getSlots(
    rest: QueryReturnType<typeof Restaurants>,
    date: Date,
  ) {
    try {
      const { openTime, closingTime } = this.utilService.getOpeningTime(
        new Date(date),
        rest.openingHours,
      );
      const allSlotsForDate = await this.dbService.queryAllDocs<typeof Slots>(
        {
          restId: rest.id,
          time: {
            $gte: openTime,
            $lt: closingTime,
          },
        },
        SlotsModel,
      );
      return allSlotsForDate;
    } catch (error) {
      throw new Error(`error catched while trying to fetch slots ${error}`);
    }
  }
}
