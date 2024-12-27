"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const common_1 = require("@nestjs/common");
let UtilService = class UtilService {
    makeId(length = 10) {
        let txt = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return txt;
    }
    calculateShiftDuration(openHours) {
        const [startHour, endHour] = openHours.split('-').map(Number);
        // If the end hour is less than or equal to the start hour, it means the shift spans over midnight.
        if (endHour <= startHour) {
            return 24 - startHour + endHour;
        }
        // Otherwise, it's a regular shift within the same day.
        return endHour - startHour;
    }
    createEmptySlots(shiftDuration, numOfDays, tables, restId, startHour, endHour) {
        let emptySlotsArray = [];
        let dateNow = this.getOriginTime(new Date(), +3);
        dateNow.setUTCHours(startHour, 0, 0, 0);
        for (let i = 0; i < numOfDays; i++) {
            if (endHour > startHour && i > 0) {
                dateNow = new Date(dateNow.setUTCDate(dateNow.getUTCDate() + 1));
                dateNow = new Date(dateNow.setUTCHours(startHour, 0, 0, 0));
            }
            else
                dateNow = new Date(dateNow.setUTCHours(startHour, 0, 0, 0));
            for (var j = 0; j < shiftDuration; j++) {
                const slot = { restId, time: dateNow, tables };
                emptySlotsArray.push(slot);
                dateNow = new Date(dateNow.setUTCHours(dateNow.getUTCHours() + (j === 0 ? 0 : 1)));
            }
        }
        return emptySlotsArray;
    }
    buildEmptySlotsForDuration(rest, duration, slotsTables) {
        const { openingHours, _id } = rest;
        const [startHour, endHour] = openingHours.split('-').map(Number);
        const shiftDuration = this.calculateShiftDuration(openingHours);
        const date = new Date();
        let openDate = new Date(date);
        openDate.setUTCHours(startHour, 0, 0, 0);
        const emptySlots = this.createEmptySlots(shiftDuration, duration, slotsTables, _id, startHour, endHour);
        return emptySlots;
    }
    returnNextExacHour(date) {
        date = new Date(date);
        date.setUTCMinutes(0, 0, 0);
        date.setUTCHours(date.getUTCHours() + 1);
        return new Date(date);
    }
    isToday(requestedDate) {
        const nowInIsrael = this.getOriginTime(new Date(), 3);
        return requestedDate.getUTCDate() === nowInIsrael.getUTCDate();
    }
    getOriginTime(date, GMT) {
        return new Date(date.setUTCHours(date.getUTCHours() + GMT));
    }
    getOpeningTime(date, restHours) {
        const [startHour, endHour] = restHours.split('-').map(Number);
        let openTime;
        let closingTime;
        if (endHour < startHour) {
            openTime = new Date(date.setUTCHours(startHour));
            closingTime = new Date(new Date(date.setUTCDate(date.getUTCDate() + 1)).setUTCHours(endHour, 0, 0, 0));
        }
        else {
            openTime = new Date(date.setUTCHours(startHour, 0, 0, 0));
            closingTime = new Date(date.setUTCHours(endHour, 0, 0, 0));
        }
        return { openTime, closingTime };
    }
};
exports.UtilService = UtilService;
exports.UtilService = UtilService = __decorate([
    (0, common_1.Injectable)()
], UtilService);
