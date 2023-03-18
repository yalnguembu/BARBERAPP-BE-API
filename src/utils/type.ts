import { ObjectId } from "mongoose";

export interface Error {
  name: string;
  message: string;
  stack?: string;
}

export type UserSchema = {
  _id?: string;
  password?: string;
  email?: string;
  username?: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type CategorySchema = {
  _id?: string;
  title?: string;
  summary?: string;
};
