import mongoose from "mongoose";

export interface ICategory extends mongoose.Document{
    name: string,
}