import { Injectable } from '@nestjs/common';
import {
    AnyParamConstructor,
    BeAnObject,
    IObjectWithTypegooseFunction,
    ModelType,
    ReturnModelType,
  } from '@typegoose/typegoose/lib/types';
  import { Document, FilterQuery, IfAny, ObjectId, Require_id } from 'mongoose';
  
  
  type QueryReturnType<T extends AnyParamConstructor<any>> = IfAny<
    InstanceType<T>,
    any,
    Document<unknown, BeAnObject, InstanceType<T>> &
      Omit<Require_id<InstanceType<T>>, 'typegooseName'> &
      IObjectWithTypegooseFunction
  >;

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
        projection: string,
      ): Promise<QueryReturnType<T>> {
        try {
          const queryResult = await model
            .findById(id, projection)
            .exec();
          return queryResult as QueryReturnType<T>
        } catch (error) {
          throw new Error(`Unable to query doc at mongo: ${error}`);
        }
      }


      async createDocIfNotExists<T extends AnyParamConstructor<any>>(
        newDocData: Partial<T>, 
        checkConditions: FilterQuery<T>,
        model: ReturnModelType<T>, 
      ): Promise<QueryReturnType<T>> {
        try {
          const existingDoc = await model.findOne(checkConditions).exec();
          if (existingDoc) {
            console.log("Document already exists with the given conditions:", checkConditions);
            return null; // Return null to indicate no document is already exist
          }
          const newDoc = await model.create(newDocData)
          return newDoc;
        } catch (error) {
          throw new Error(`Unable to create document: ${error.message}`);
        }
      }
    }



  /* Examples usage: 
  
  await queryAllDocs(
  { isActive: true },
  UserModel,
  'name email' // Include only `name` and `email`
);

await queryById(
  { isActive: true },
  UserModel,
  '-password' // Exclude `password`
); */

  