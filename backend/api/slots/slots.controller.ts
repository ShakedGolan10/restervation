import { Response } from 'express';
import { SlotsRequest } from '../../types/request_types';
import { RestaurantModel } from '../../db/models/index.typegoose';
import { Restaurants } from '../../db/models/restaurants';
import { getSlots } from './slots.service';
import { queryById } from '../../db/models/query_model.service';
import { getOriginTime } from '../../service/util.service';

export async function getAllSlots(req: SlotsRequest, res: Response) {
  try {
    const selectedTime = getOriginTime(new Date(req.query.time), +3);
    const { restId } = req.params;
    const rest = await queryById<typeof Restaurants>(restId, RestaurantModel);
    const allSlotsForDate = await getSlots(rest, selectedTime);
    res.status(200).json(allSlotsForDate);
  } catch (err) {
    console.log('Error caught at controller:', err);
    res.status(500).send({ err: `Failed to get slot ${err}` });
  }
}
