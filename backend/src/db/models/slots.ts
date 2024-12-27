import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { Restaurants } from './restaurants';

export interface SlotTable {
  isAvailable: boolean;
  capacity: Number;
  id: string;
}
@modelOptions({ schemaOptions: { collection: 'slots' } })
export class Slots {
  @prop({ ref: () => Restaurants, required: true })
  public restId!: Ref<Restaurants>;

  @prop({ type: Date, required: true })
  public time!: Date;

  @prop({ type: Array<SlotTable>, required: true })
  public tables!: SlotTable[];
}
