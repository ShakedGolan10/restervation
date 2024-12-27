"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const index_typegoose_1 = require("../../db/models/index.typegoose");
const body_parse_date_pipe_1 = require("../../nest/pipes/body-parse-date.pipe");
let ReservationController = class ReservationController {
    reservService;
    dbService;
    constructor(reservService, dbService) {
        this.reservService = reservService;
        this.dbService = dbService;
    }
    async getReservationsByPhone(phone, res) {
        try {
            const reservations = await this.dbService.queryAllDocs({ reservedBy: phone }, index_typegoose_1.ReservationsModel);
            res.status(200).json(reservations);
        }
        catch (err) {
            console.log('Error caught at controller:', err);
            res.status(500).send({ err: `Failed at reservation route ${err}` });
        }
    }
    async deleteReservation(id, res) {
        try {
            await this.reservService.removeReservation(id);
            res.status(200).json('success');
        }
        catch (err) {
            console.log('Error caught at controller:', err);
            res.status(500).send({ err: `Failed at reservation route ${err}` });
        }
    }
    async addReservation(addReservPayload, res) {
        try {
            const { tableId, phone, slotId, restName, time } = addReservPayload;
            const newReservation = await this.dbService.createDocIfNotExists({ time, tableId, phone, slotId, restName }, { tableId, time: new Date(addReservPayload.time) }, index_typegoose_1.ReservationsModel);
            res.status(200).json(newReservation);
        }
        catch (err) {
            console.log('Error caught at controller:', err);
            res.status(500).send({ err: `Failed at reservation route ${err}` });
        }
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Get)(':phone'),
    __param(0, (0, common_1.Param)('phone')),
    __param(1, (0, common_1.Res)())
], ReservationController.prototype, "getReservationsByPhone", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)())
], ReservationController.prototype, "deleteReservation", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(body_parse_date_pipe_1.StringToDatePipe)),
    __param(1, (0, common_1.Res)())
], ReservationController.prototype, "addReservation", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)('reservation')
], ReservationController);
