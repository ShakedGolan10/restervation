"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurants = exports.Table = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Table {
    capacity;
    id;
}
exports.Table = Table;
__decorate([
    (0, typegoose_1.prop)({ required: true })
], Table.prototype, "capacity", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], Table.prototype, "id", void 0);
let Restaurants = class Restaurants {
    name;
    phone;
    openingHours;
    tables;
};
exports.Restaurants = Restaurants;
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Restaurants.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Restaurants.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Restaurants.prototype, "openingHours", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: (Array), default: [] })
], Restaurants.prototype, "tables", void 0);
exports.Restaurants = Restaurants = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'restaurants' } })
], Restaurants);