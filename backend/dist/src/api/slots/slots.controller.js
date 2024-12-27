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
exports.SlotsController = void 0;
const common_1 = require("@nestjs/common");
const parse_date_pipe_1 = require("../../nest/pipes/parse-date.pipe");
let SlotsController = class SlotsController {
    slotsService;
    constructor(slotsService) {
        this.slotsService = slotsService;
    }
    async getSlots(restId, time, res) {
        try {
            const allSlotsForDate = await this.slotsService.getSlotsPerRest(restId, time);
            res.status(200).json(allSlotsForDate);
        }
        catch (err) {
            console.log('Error caught at controller:', err);
            res.status(500).send({ err: `Failed at slot route ${err}` });
        }
    }
};
exports.SlotsController = SlotsController;
__decorate([
    (0, common_1.Get)(':restId'),
    __param(0, (0, common_1.Param)('restId')),
    __param(1, (0, common_1.Query)('time', parse_date_pipe_1.ParseDatePipe)),
    __param(2, (0, common_1.Res)())
], SlotsController.prototype, "getSlots", null);
exports.SlotsController = SlotsController = __decorate([
    (0, common_1.Controller)('slots')
], SlotsController);
