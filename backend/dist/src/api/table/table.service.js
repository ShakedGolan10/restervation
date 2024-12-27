"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesService = void 0;
const common_1 = require("@nestjs/common");
const index_typegoose_1 = require("../../db/models/index.typegoose");
let TablesService = class TablesService {
    dbService;
    utilService;
    constructor(dbService, utilService) {
        this.dbService = dbService;
        this.utilService = utilService;
    }
    async addTables(restId, tables) {
        const sessionObj = await index_typegoose_1.MongoSession.createInstance();
        try {
            const restTables = tables.map((capacity) => ({
                id: this.utilService.makeId(),
                capacity,
            }));
            const result = await this.dbService.updateDoc(restId, { tables: restTables }, index_typegoose_1.RestaurantModel, sessionObj);
            if (result.modifiedCount === 0) {
                throw new Error('Doc was not found or no data added');
            }
            const rest = await this.dbService.queryById(restId, index_typegoose_1.RestaurantModel);
            const slotsTables = rest.tables.map((table) => {
                return { ...table, isAvailable: true };
            });
            const slotsTime = this.utilService.buildEmptySlotsForDuration(rest, 8, slotsTables);
            await index_typegoose_1.SlotsModel.insertMany(slotsTime, { session: sessionObj.session });
            await sessionObj.commitTransaction();
        }
        catch (error) {
            await sessionObj.abortTransaction();
            throw error;
        }
    }
};
exports.TablesService = TablesService;
exports.TablesService = TablesService = __decorate([
    (0, common_1.Injectable)()
], TablesService);
