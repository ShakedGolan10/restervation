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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const index_typegoose_1 = require("../../db/models/index.typegoose");
let RestaurantsController = class RestaurantsController {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async addRestaurant(addRestaurantDto, res) {
        try {
            const newRestaurant = await this.dbService.createDocIfNotExists(addRestaurantDto, { phone: addRestaurantDto.phone, name: addRestaurantDto.name }, index_typegoose_1.RestaurantModel);
            res.status(201).json(newRestaurant);
        }
        catch (error) {
            console.error('Error caught in controller:', error);
            throw new common_1.HttpException('Failed to add restaurant', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRestaurants(res) {
        try {
            const restaurants = await this.dbService.queryAllDocs({}, index_typegoose_1.RestaurantModel, '-phone');
            res.status(200).json(restaurants);
        }
        catch (error) {
            console.error('Error caught in controller:', error);
            throw new common_1.HttpException('Failed to get restaurants', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRestaurant(restId, res) {
        try {
            const restaurant = await this.dbService.queryById(restId, index_typegoose_1.RestaurantModel, 'phone');
            res.status(200).json(restaurant);
        }
        catch (error) {
            console.error('Error caught in controller:', error);
            throw new common_1.HttpException('Failed to get restaurant', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RestaurantsController = RestaurantsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)())
], RestaurantsController.prototype, "addRestaurant", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)())
], RestaurantsController.prototype, "getRestaurants", null);
__decorate([
    (0, common_1.Get)(':restId'),
    __param(0, (0, common_1.Param)('restId')),
    __param(1, (0, common_1.Res)())
], RestaurantsController.prototype, "getRestaurant", null);
exports.RestaurantsController = RestaurantsController = __decorate([
    (0, common_1.Controller)('restaurant')
], RestaurantsController);
