import {
  AnyParamConstructor,
  BeAnObject,
  IObjectWithTypegooseFunction,
} from '@typegoose/typegoose/lib/types';
import { Document, IfAny, Require_id } from 'mongoose';

export type QueryReturnType<T extends AnyParamConstructor<any>> = IfAny<
  InstanceType<T>,
  any,
  Document<unknown, BeAnObject, InstanceType<T>> &
    Omit<Require_id<InstanceType<T>>, 'typegooseName'> &
    IObjectWithTypegooseFunction
>;
