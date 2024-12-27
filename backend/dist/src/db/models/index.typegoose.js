"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsModel = exports.RestaurantModel = exports.ReservationsModel = exports.MongoSession = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
const reservations_1 = require("./reservations");
const restaurants_1 = require("./restaurants");
const slots_1 = require("./slots");
console.log('hi: ', process.env.MONGODB_CONNECTION_STRING);
if (process.env.MONGODB_CONNECTION_STRING) {
    mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
}
else
    throw new Error('MongoDB connection string isnt exist');
const ReservationsModel = (0, typegoose_1.getModelForClass)(reservations_1.Reservations);
exports.ReservationsModel = ReservationsModel;
const RestaurantModel = (0, typegoose_1.getModelForClass)(restaurants_1.Restaurants);
exports.RestaurantModel = RestaurantModel;
const SlotsModel = (0, typegoose_1.getModelForClass)(slots_1.Slots);
exports.SlotsModel = SlotsModel;
class MongoSession {
    session;
    constructor(sessionSetted) {
        this.session = sessionSetted;
    }
    static async createInstance() {
        const session = await MongoSession.setInstance();
        return new MongoSession(session);
    }
    static async setInstance() {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        return session;
    }
    abortTransaction = async () => {
        await this.session.abortTransaction();
        this.session.endSession();
    };
    commitTransaction = async () => {
        try {
            await this.session.commitTransaction();
            this.session.endSession();
        }
        catch (error) {
            throw new Error(`Unabled to commit session ${error}`);
        }
    };
}
exports.MongoSession = MongoSession;
