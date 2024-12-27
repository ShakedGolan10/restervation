"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRestaurantDto = void 0;
const types_1 = require("class-validator/types");
class AddRestaurantDto {
    name;
    phone;
    openingHours;
}
exports.AddRestaurantDto = AddRestaurantDto;
__decorate([
    (0, types_1.IsNotEmpty)(),
    (0, types_1.IsString)()
], AddRestaurantDto.prototype, "name", void 0);
__decorate([
    (0, types_1.IsNotEmpty)(),
    (0, types_1.IsString)()
], AddRestaurantDto.prototype, "phone", void 0);
__decorate([
    (0, types_1.IsNotEmpty)(),
    (0, types_1.IsArray)()
], AddRestaurantDto.prototype, "openingHours", void 0);
