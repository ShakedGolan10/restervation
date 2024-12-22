import { prop, Ref, modelOptions } from "@typegoose/typegoose";
import { Slots } from "./slots";

@modelOptions({ schemaOptions: { collection: "reservations" } })
export class Reservations {

  @prop({ type: Date, required: true })
  public time!: Date;

  @prop({ type: String, required: true })
  public tableId!: string;
  
  @prop({ type: String, required: true })
  public restName!: string;
  
  @prop({ type: String, required: true })
  public slotId!: string;

  @prop({ type: String, required: true })
  public reservedBy!: string;

}