import mongoose, { Document } from "mongoose";
import { ICategory } from "./category";

export interface IContent extends mongoose.Document {
    postedBy: mongoose.Types.ObjectId | IUser;
    category: mongoose.Types.ObjectId | ICategory
    title: string;
    body: string;
}