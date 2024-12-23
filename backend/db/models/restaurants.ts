import { prop, modelOptions } from '@typegoose/typegoose';

export class Table {
  @prop({ required: true })
  public capacity!: Number;

  @prop({ required: true })
  public id!: string;
}

@modelOptions({ schemaOptions: { collection: 'restaurants' } })
export class Restaurants {
  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public phone!: string;

  @prop({ type: String, required: true })
  public openingHours!: string;

  @prop({ type: Array<Table>, default: [] })
  public tables!: Table[];
}
