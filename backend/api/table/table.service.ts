import { makeId } from '../../service/util.service';
import { MongoSession, RestaurantModel } from '../../db/models/index.typegoose';

export async function addTablesToRest(
  restId: string,
  capacities: number[],
): Promise<void> {
  const { abortTransaction, commitTransaction, session } =
    await MongoSession.createInstance();
  const restTables = capacities.map((capacity) => ({
    id: makeId(),
    capacity,
  }));
  try {
    const result = await RestaurantModel.updateOne(
      { _id: restId },
      { $set: { tables: restTables } },
      { session },
    );

    if (result.modifiedCount === 0) {
      await abortTransaction();
      throw new Error('Restaurant not found or no tables added');
    }

    await commitTransaction();
  } catch (error) {
    await abortTransaction();
    console.error('Failed to insert tables:', error);
  }
}
