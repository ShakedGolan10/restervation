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

export type ProjectedReturnType<
  T extends AnyParamConstructor<any>,
  P extends string | undefined
> = P extends undefined
  ? QueryReturnType<T>
  : P extends keyof QueryReturnType<T>
  ? Pick<QueryReturnType<T>, P>
  : never; // Ensure the projection is a valid key or return `never` if invalid
