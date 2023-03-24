import { ObjectId } from "mongoose";

export interface Error {
  name: string;
  message: string;
  stack?: string;
}

export type DecodedToken = {
  _id: string;
  email: string;
  role: string;
};

export type UserSchema = {
  _id?: string;
  password?: string;
  email: string;
  role?: string;
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

export type ServiceSchema = {
  _id?: string;
  name: string;
  description?: string;
  category: string;
  picture?: string;
  price: number;
  duration: number;
};

export type ReservationSchema = {
  _id?: string;
  service: ServiceSchema;
  date: string;
  time: string;
  client: UserSchema;
  maker: string;
};
