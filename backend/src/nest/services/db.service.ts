import { Injectable } from '@nestjs/common';
import {
  AnyParamConstructor,
  ReturnModelType,
} from '@typegoose/typegoose/lib/types';
import {
  FilterQuery,
  ObjectId,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import { MongoSession } from '../../db/models/index.typegoose';
import { QueryReturnType } from '../../../types';

@Injectable()
export class DbService {
  async queryAllDocs<T extends AnyParamConstructor<any>>(
    filterBy: FilterQuery<T>,
    model: ReturnModelType<T>,
    projection?: string,
  ): Promise<QueryReturnType<T>[]> {
    try {
      const queryResult = await model
        .find(filterBy, projection ? projection : undefined)
        .exec();
      return queryResult;
    } catch (error) {
      throw new Error(`Unable to query doc at mongo: ${error}`);
    }
  }

  async queryById<T extends AnyParamConstructor<any>>(
    id: string | ObjectId,
    model: ReturnModelType<T>,
    projection?: string,
  ): Promise<QueryReturnType<T>> {
    try {
      const queryResult = await model.findById(id, projection).exec();
      return queryResult as QueryReturnType<T>;
    } catch (error) {
      throw new Error(`Unable to query doc at mongo: ${error}`);
    }
  }

  async createDocIfNotExists<T extends AnyParamConstructor<any>>(
    newDocData: any,
    checkConditions: FilterQuery<T>,
    model: ReturnModelType<T>,
    clientSession?: MongoSession,
  ): Promise<QueryReturnType<T>> {
    let session = !clientSession
      ? clientSession
      : await MongoSession.createInstance();
    try {
      const existingDoc = await model.findOne(checkConditions).exec();
      if (existingDoc) {
        console.log(
          'Document alread+y exists with the given conditions:',
          checkConditions,
        );
        throw new Error(
          `Document already exists with the given conditions: ${checkConditions}`,
        );
      }
      const newDoc = await (
        await model.create({ newDocData })
      ).save({ session: session.session });
      if (!clientSession) await session.commitTransaction();
      return newDoc;
    } catch (error) {
      if (!clientSession) await session.abortTransaction();
      throw new Error(`Unable to create document: ${error.message}`);
    }
  }

  async removeDoc<T extends AnyParamConstructor<any>>(
    id: string,
    model: ReturnModelType<T>,
    clientSession?: MongoSession,
  ) {
    let sessionObj = !clientSession
      ? clientSession
      : await MongoSession.createInstance();
    try {
      const deletedDoc = await model
        .findByIdAndDelete(new Types.ObjectId(id))
        .session(sessionObj.session);
      if (!clientSession) await sessionObj.commitTransaction();
      return deletedDoc;
    } catch (error) {
      if (!clientSession) await sessionObj.abortTransaction();
      throw new Error(
        `Error catched at mongoDB while trying to delete : ${error}`,
      );
    }
  }

  async updateDoc<T extends AnyParamConstructor<any>>(
    docId: string,
    data: UpdateQuery<InstanceType<T>>,
    model: ReturnModelType<T>,
    clientSession?: MongoSession,
  ): Promise<UpdateWriteOpResult> {
    let sessionObj = !clientSession
      ? clientSession
      : await MongoSession.createInstance();
    try {
      const result = await model.updateOne(
        { _id: docId },
        { $set: data },
        { session: sessionObj.session },
      );
      if (result.modifiedCount === 0)
        throw new Error('Doc was not found or no data added');
      if (!clientSession) await sessionObj.commitTransaction();
      return result;
    } catch (error) {
      if (!clientSession) await sessionObj.abortTransaction();
      console.error('Failed to insert data:', error);
    }
  }

  // Add a callback function that will run after each crud function, so
}
