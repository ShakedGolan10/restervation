import { AnyParamConstructor, BeAnObject, IObjectWithTypegooseFunction, ModelType, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Document, FilterQuery, IfAny, ObjectId, Require_id,  } from "mongoose";

export type QueryReturnType<T extends AnyParamConstructor<any>> = IfAny<InstanceType<T>, any, Document<unknown, BeAnObject, InstanceType<T>> & Omit<Require_id<InstanceType<T>>, "typegooseName"> & IObjectWithTypegooseFunction>


export async function queryAllDocs<T extends AnyParamConstructor<any>>(filterBy: FilterQuery<T>, model: ReturnModelType<T>, projection?: string):Promise<QueryReturnType<T>[]>  {
    try {
        const queryResult = await model.find(
           filterBy, (projection) ? projection : ''
        ).exec() 
        return queryResult 
    } catch (error) {
        throw new Error(`Unable to query doc at mongo: ${error}`)
    }
}
export async function queryById<T extends AnyParamConstructor<any>>(id: string | ObjectId, model: ReturnModelType<T>, excludeProperty?: string): Promise<QueryReturnType<T>> {
    try {
        const queryResult = await model.findById(
           id
        ).select(`-${excludeProperty}`).exec() 
        return queryResult 
    } catch (error) {
        throw new Error(`Unable to query doc at mongo: ${error}`)
    }
}