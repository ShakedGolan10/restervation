"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slots = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const restaurants_1 = require("./restaurants");
let Slots = class Slots {
    restId;
    time;
    tables;
};
exports.Slots = Slots;
__decorate([
    (0, typegoose_1.prop)({ ref: () => restaurants_1.Restaurants, required: true })
], Slots.prototype, "restId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Date, required: true })
], Slots.prototype, "time", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: (Array), required: true })
], Slots.prototype, "tables", void 0);
exports.Slots = Slots = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'slots' } })
], Slots);
