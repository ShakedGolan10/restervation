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
exports.TablesController = void 0;
const common_1 = require("@nestjs/common");
let TablesController = class TablesController {
    tableService;
    constructor(tableService) {
        this.tableService = tableService;
    }
    async addTables(restId, addTablesDto, res) {
        try {
            await this.tableService.addTables(restId, addTablesDto.tables);
            res.status(201).json('Success');
        }
        catch (error) {
            res.status(500).send({ err: `Failed to at table route ${error}` });
        }
    }
};
exports.TablesController = TablesController;
__decorate([
    (0, common_1.Post)(':restId'),
    __param(0, (0, common_1.Param)('restId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)())
], TablesController.prototype, "addTables", null);
exports.TablesController = TablesController = __decorate([
    (0, common_1.Controller)('table')
], TablesController);
