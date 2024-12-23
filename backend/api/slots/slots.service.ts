import { Restaurants } from '../../db/models/restaurants';
import {
  queryAllDocs,
  queryById,
  QueryReturnType,
} from '../../db/models/query_model.service';
import {
  MongoSession,
  RestaurantModel,
  SlotsModel,
} from '../../db/models/index.typegoose';
import {
  buildEmptySlotsForDuration,
  getOpeningTime,
} from '../../service/util.service';
import { Slots } from '../../db/models/slots';

export async function createNewSlots(restId: string) {
  const { abortTransaction, commitTransaction, session } =
    await MongoSession.createInstance();
  try {
    const exist = await queryAllDocs<typeof Slots>({ restId }, SlotsModel); // For later usage of creating new Slots if needed
    const rest = await queryById<typeof Restaurants>(restId, RestaurantModel);
    const slotsTables = rest.tables.map((table) => {
      return { ...table, isAvailable: true };
    });
    const slotsTime = buildEmptySlotsForDuration(rest, 8, slotsTables);
    await SlotsModel.insertMany(slotsTime, { session });
    await commitTransaction();
  } catch (error) {
    abortTransaction();
    throw new Error(`Unables to create slots for rest with error: ${error}`);
  }
}

export async function getSlots(
  rest: QueryReturnType<typeof Restaurants>,
  date: string | Date,
) {
  try {
    const { openTime, closingTime } = getOpeningTime(
      new Date(date),
      rest.openingHours,
    );
    const allSlotsForDate = await queryAllDocs<typeof Slots>(
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

export async function changeTableAvailability(tableId: string, slotId: string) {
  try {
    const slotTables = (await queryById<typeof Slots>(slotId, SlotsModel))
      .tables;
    const updatedTables = slotTables.map((table) => {
      if (table.id === tableId) table.isAvailable = !table.isAvailable;
      return table;
    });
    await SlotsModel.findByIdAndUpdate(slotId, {
      $set: { tables: updatedTables },
    });
  } catch (error) {
    throw new Error(
      `Error while trying to change tables availability ${error}`,
    );
  }
}
