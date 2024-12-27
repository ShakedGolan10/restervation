"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsService = void 0;
const common_1 = require("@nestjs/common");
const index_typegoose_1 = require("../../db/models/index.typegoose");
let SlotsService = class SlotsService {
    dbService;
    utilService;
    constructor(dbService, utilService) {
        this.dbService = dbService;
        this.utilService = utilService;
    }
    async getSlotsPerRest(restId, time) {
        const selectedTime = this.utilService.getOriginTime(time, +3);
        const rest = await this.dbService.queryById(restId, index_typegoose_1.RestaurantModel);
        const allSlotsForDate = await this._getSlots(rest, selectedTime);
        return allSlotsForDate;
    }
    async _getSlots(rest, date) {
        try {
            const { openTime, closingTime } = this.utilService.getOpeningTime(new Date(date), rest.openingHours);
            const allSlotsForDate = await this.dbService.queryAllDocs({
                restId: rest.id,
                time: {
                    $gte: openTime,
                    $lt: closingTime,
                },
            }, index_typegoose_1.SlotsModel);
            return allSlotsForDate;
        }
        catch (error) {
            throw new Error(`error catched while trying to fetch slots ${error}`);
        }
    }
};
exports.SlotsService = SlotsService;
exports.SlotsService = SlotsService = __decorate([
    (0, common_1.Injectable)()
], SlotsService);
