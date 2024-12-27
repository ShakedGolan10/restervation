import { httpService } from "./http.service.ts";

export async function getSlots(restId: string, selectedDate: Date) {
    const allSlots = await httpService.get<Slot[]>('slots', restId, {time: selectedDate})
    return allSlots
}

export interface Slot {
    _id: string;
    restId: string;
    time: Date;
    tables: SlotTable[];
  }

  export interface SlotTable {
    isAvailable: boolean;
    capacity: Number;
    id: string; 
}