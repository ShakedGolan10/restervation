"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const index_typegoose_1 = require("../../db/models/index.typegoose");
let DbService = class DbService {
    async queryAllDocs(filterBy, model, projection) {
        try {
            const queryResult = await model
                .find(filterBy, projection ? projection : undefined)
                .exec();
            return queryResult;
        }
        catch (error) {
            throw new Error(`Unable to query doc at mongo: ${error}`);
        }
    }
    async queryById(id, model, projection) {
        try {
            const queryResult = await model.findById(id, projection).exec();
            return queryResult;
        }
        catch (error) {
            throw new Error(`Unable to query doc at mongo: ${error}`);
        }
    }
    async createDocIfNotExists(newDocData, checkConditions, model, clientSession) {
        let session = !clientSession
            ? clientSession
            : await index_typegoose_1.MongoSession.createInstance();
        try {
            const existingDoc = await model.findOne(checkConditions).exec();
            if (existingDoc) {
                console.log('Document alread+y exists with the given conditions:', checkConditions);
                throw new Error(`Document already exists with the given conditions: ${checkConditions}`);
            }
            const newDoc = await (await model.create({ newDocData })).save({ session: session.session });
            if (!clientSession)
                await session.commitTransaction();
            return newDoc;
        }
        catch (error) {
            if (!clientSession)
                await session.abortTransaction();
            throw new Error(`Unable to create document: ${error.message}`);
        }
    }
    async removeDoc(id, model, clientSession) {
        let sessionObj = !clientSession
            ? clientSession
            : await index_typegoose_1.MongoSession.createInstance();
        try {
            const deletedDoc = await model
                .findByIdAndDelete(new mongoose_1.Types.ObjectId(id))
                .session(sessionObj.session);
            if (!clientSession)
                await sessionObj.commitTransaction();
            return deletedDoc;
        }
        catch (error) {
            if (!clientSession)
                await sessionObj.abortTransaction();
            throw new Error(`Error catched at mongoDB while trying to delete : ${error}`);
        }
    }
    async updateDoc(docId, data, model, clientSession) {
        let sessionObj = !clientSession
            ? clientSession
            : await index_typegoose_1.MongoSession.createInstance();
        try {
            const result = await model.updateOne({ _id: docId }, { $set: data }, { session: sessionObj.session });
            if (result.modifiedCount === 0)
                throw new Error('Doc was not found or no data added');
            if (!clientSession)
                await sessionObj.commitTransaction();
            return result;
        }
        catch (error) {
            if (!clientSession)
                await sessionObj.abortTransaction();
            console.error('Failed to insert data:', error);
        }
    }
};
exports.DbService = DbService;
exports.DbService = DbService = __decorate([
    (0, common_1.Injectable)()
], DbService);
