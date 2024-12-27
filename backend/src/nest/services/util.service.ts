import { Ref } from '@typegoose/typegoose';
import { Restaurants } from '../../db/models/restaurants';
import { Slots, SlotTable } from '../../db/models/slots';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  makeId(length = 10) {
    let txt = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
  }

  calculateShiftDuration(openHours: string): number {
    const [startHour, endHour] = openHours.split('-').map(Number);
    // If the end hour is less than or equal to the start hour, it means the shift spans over midnight.
    if (endHour <= startHour) {
      return 24 - startHour + endHour;
    }
    // Otherwise, it's a regular shift within the same day.
    return endHour - startHour;
  }

  createEmptySlots(
    shiftDuration: number,
    numOfDays: number,
    tables: SlotTable[],
    restId: Ref<Restaurants>,
    startHour: number,
    endHour: number,
  ) {
    let emptySlotsArray = [];
    let dateNow = this.getOriginTime(new Date(), +3);
    dateNow.setUTCHours(startHour, 0, 0, 0);
    for (let i = 0; i < numOfDays; i++) {
      if (endHour > startHour && i > 0) {
        dateNow = new Date(dateNow.setUTCDate(dateNow.getUTCDate() + 1));
        dateNow = new Date(dateNow.setUTCHours(startHour, 0, 0, 0));
      } else dateNow = new Date(dateNow.setUTCHours(startHour, 0, 0, 0));
      for (var j = 0; j < shiftDuration; j++) {
        const slot: Slots = { restId, time: dateNow, tables };
        emptySlotsArray.push(slot);
        dateNow = new Date(
          dateNow.setUTCHours(dateNow.getUTCHours() + (j === 0 ? 0 : 1)),
        );
      }
    }
    return emptySlotsArray;
  }

  buildEmptySlotsForDuration(
    rest: any,
    duration: number,
    slotsTables: SlotTable[],
  ): Slots[] {
    const { openingHours, _id } = rest;
    const [startHour, endHour] = openingHours.split('-').map(Number);
    const shiftDuration = this.calculateShiftDuration(openingHours);

    const date = new Date();
    let openDate = new Date(date);
    openDate.setUTCHours(startHour, 0, 0, 0);
    const emptySlots = this.createEmptySlots(
      shiftDuration,
      duration,
      slotsTables,
      _id,
      startHour,
      endHour,
    );

    return emptySlots;
  }

  returnNextExacHour(date: Date) {
    date = new Date(date);
    date.setUTCMinutes(0, 0, 0);
    date.setUTCHours(date.getUTCHours() + 1);
    return new Date(date);
  }

  isToday(requestedDate: Date): boolean {
    const nowInIsrael = this.getOriginTime(new Date(), 3);
    return requestedDate.getUTCDate() === nowInIsrael.getUTCDate();
  }

  getOriginTime(date: Date, GMT: number): Date {
    return new Date(date.setUTCHours(date.getUTCHours() + GMT));
  }

  getOpeningTime(date: Date, restHours: string) {
    const [startHour, endHour] = restHours.split('-').map(Number);
    let openTime: Date;
    let closingTime: Date;
    if (endHour < startHour) {
      openTime = new Date(date.setUTCHours(startHour));
      closingTime = new Date(
        new Date(date.setUTCDate(date.getUTCDate() + 1)).setUTCHours(
          endHour,
          0,
          0,
          0,
        ),
      );
    } else {
      openTime = new Date(date.setUTCHours(startHour, 0, 0, 0));
      closingTime = new Date(date.setUTCHours(endHour, 0, 0, 0));
    }

    return { openTime, closingTime };
  }
}
