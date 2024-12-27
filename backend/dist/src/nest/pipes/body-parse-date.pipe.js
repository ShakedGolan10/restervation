"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToDatePipe = void 0;
const common_1 = require("@nestjs/common");
let StringToDatePipe = class StringToDatePipe {
    keys;
    constructor(keys) {
        this.keys = keys;
    }
    transform(value, metadata) {
        if (metadata.type !== 'body') {
            return value; // Only process body arguments
        }
        for (const key of this.keys) {
            if (value[key]) {
                const date = new Date(value[key]);
                if (isNaN(date.getTime())) {
                    throw new common_1.BadRequestException(`Invalid date format for key: ${key}`);
                }
                value[key] = date;
            }
        }
        return value;
    }
};
exports.StringToDatePipe = StringToDatePipe;
exports.StringToDatePipe = StringToDatePipe = __decorate([
    (0, common_1.Injectable)()
], StringToDatePipe);
