"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const index_typegoose_1 = require("../../db/models/index.typegoose");
let ReservationsService = class ReservationsService {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async addNewReservation(time, tableId, phone, slotId, restName) {
        return await this.dbService.createDocIfNotExists({ time, tableId, reservedBy: phone, slotId, restName }, { tableId, time }, index_typegoose_1.ReservationsModel);
    }
    async removeReservation(id) {
        const sessionObj = await index_typegoose_1.MongoSession.createInstance();
        try {
            const deletedDoc = await this.dbService.removeDoc(id, index_typegoose_1.ReservationsModel, sessionObj);
            if (!deletedDoc.$isDeleted()) {
                throw new Error('Id wasnt found to delete');
            }
            await this.changeTableAvailability(deletedDoc.tableId, deletedDoc.slotId, sessionObj.session).catch((err) => {
                throw new Error(`Failed to edit Slot ${err}`);
            });
            await sessionObj.commitTransaction();
        }
        catch (error) {
            await sessionObj.abortTransaction();
            throw error;
        }
    }
    async addReservation(time, tableId, phone, slotId, restName) {
        const sessionObj = await index_typegoose_1.MongoSession.createInstance();
        try {
            const newReservation = await this.dbService.createDocIfNotExists({ time, tableId, phone, slotId, restName }, { tableId, time }, index_typegoose_1.ReservationsModel, sessionObj);
            await this.changeTableAvailability(tableId, slotId, sessionObj.session).catch((err) => {
                throw new Error(`Failed to edit Slot ${err}`);
            });
            await sessionObj.commitTransaction();
            return newReservation;
        }
        catch (err) {
            await sessionObj.abortTransaction();
            throw err;
        }
    }
    async changeTableAvailability(tableId, slotId, session) {
        try {
            const slotTables = (await this.dbService.queryById(slotId, index_typegoose_1.SlotsModel)).tables;
            const updatedTables = slotTables.map((table) => {
                if (table.id === tableId)
                    table.isAvailable = !table.isAvailable;
                return table;
            });
            await index_typegoose_1.SlotsModel.findByIdAndUpdate(slotId, {
                $set: { tables: updatedTables },
            }).session(session);
        }
        catch (error) {
            throw new Error(`Error while trying to change tables availability ${error}`);
        }
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)()
], ReservationsService);
