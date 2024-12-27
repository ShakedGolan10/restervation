"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddReservPayload = void 0;
const types_1 = require("class-validator/types");
class AddReservPayload {
    tableId;
    phone;
    slotId;
    restName;
    time;
}
exports.AddReservPayload = AddReservPayload;
__decorate([
    (0, types_1.IsNotEmpty)()
], AddReservPayload.prototype, "tableId", void 0);
__decorate([
    (0, types_1.IsString)(),
    (0, types_1.Length)(10, 10, { message: 'The string must be exactly 10 characters long.' })
], AddReservPayload.prototype, "phone", void 0);
__decorate([
    (0, types_1.IsNotEmpty)()
], AddReservPayload.prototype, "slotId", void 0);
__decorate([
    (0, types_1.IsString)()
], AddReservPayload.prototype, "restName", void 0);
__decorate([
    (0, types_1.IsNotEmpty)()
], AddReservPayload.prototype, "time", void 0);
